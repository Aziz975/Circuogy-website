import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import pool from '../config/db.js';
import HttpError from '../utils/httpError.js';
import asyncHandler from '../utils/asyncHandler.js';
import { slugify } from '../utils/validators.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/*
  blogs table columns used here:
  id, title, slug, category, author, publication_date, description,
  content, image, status, created_at, updated_at
*/

// The public list leaves out the (large) content column.
const PUBLIC_LIST_COLUMNS =
  'id, title, slug, description, image, category, author, publication_date, status, created_at, updated_at';

// ---------- helpers ----------
const parsePaging = (query) => {
  const page = Math.max(parseInt(query.page, 10) || 1, 1);
  const limit = Math.min(Math.max(parseInt(query.limit, 10) || 9, 1), 50);
  return { page, limit, offset: (page - 1) * limit };
};

const pagination = (page, limit, total) => ({
  page,
  limit,
  total,
  totalPages: Math.max(Math.ceil(total / limit), 1),
});

const uniqueSlug = async (base, excludeId = null) => {
  const root = slugify(base) || 'post';
  let candidate = root;
  let n = 2;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const [rows] = await pool.execute('SELECT id FROM blogs WHERE slug = ? AND id <> ? LIMIT 1', [
      candidate,
      excludeId || 0,
    ]);
    if (!rows.length) return candidate;
    candidate = `${root}-${n++}`;
  }
};

// Deletes a stored upload, but only inside /uploads.
const removeFile = (imgPath) => {
  if (!imgPath || !imgPath.startsWith('/uploads/')) return;

  const uploadRoot = path.resolve(__dirname, '..', 'uploads');
  const filePath = path.resolve(__dirname, '..', imgPath.slice(1));
  if (!filePath.startsWith(uploadRoot + path.sep)) return;

  fs.unlink(filePath, (err) => {
    if (err && err.code !== 'ENOENT') console.error('Failed to remove blog image:', err);
  });
};

// The dashboard may upload the image first (POST /upload -> { url }) and then send that
// URL in the JSON body, or send the file together with the form. Both end up here.
// Returns a "/uploads/..." path for our own files, an http(s) URL for external images,
// or null when the value is empty.
const IMAGE_KEYS = ['image', 'cover_image', 'image_url', 'imageUrl'];

const normalizeImageRef = (value, req) => {
  const v = String(value ?? '').trim();
  if (!v) return null;
  if (v.length > 500) throw new HttpError(400, 'Image path is too long.');

  if (/^(blob|data):/i.test(v)) {
    throw new HttpError(
      400,
      'The image was not uploaded. Upload the file first, then save the article with the uploaded URL.'
    );
  }

  if (v.startsWith('/uploads/')) {
    if (v.includes('..')) throw new HttpError(400, 'Invalid image path.');
    return v;
  }

  try {
    const url = new URL(v);
    if (!['http:', 'https:'].includes(url.protocol)) throw new Error('bad protocol');
    // Our own server: store just the path so it keeps working when the host changes.
    if (req && url.host === req.get('host') && url.pathname.startsWith('/uploads/') && !url.pathname.includes('..')) {
      return url.pathname;
    }
    return v;
  } catch {
    throw new HttpError(400, 'Image must be an uploaded file or an http(s) URL.');
  }
};

// Deletes an uploaded image, unless another post still points to the same file.
const deleteImageIfUnused = async (imgPath, excludeId) => {
  if (!imgPath) return;
  const [rows] = await pool.execute('SELECT id FROM blogs WHERE image = ? AND id <> ? LIMIT 1', [
    imgPath,
    excludeId,
  ]);
  if (!rows.length) removeFile(imgPath);
};

// If a request fails after multer saved the image, delete that image so no orphan files pile up.
const discardUpload = (req) => {
  if (req.file?.filename) removeFile(`/uploads/blogs/${req.file.filename}`);
};

const withUploadCleanup = (handler) =>
  asyncHandler(async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (err) {
      discardUpload(req);
      throw err;
    }
  });

// Validates the form fields sent by the admin editor (multipart/form-data or JSON).
// With partial=true only supplied fields are checked (used by PUT).
const readInput = (body, partial = false, req = null) => {
  const errors = {};
  const data = {};
  const has = (k) => body[k] !== undefined;
  const str = (k) => (typeof body[k] === 'string' ? body[k].trim() : '');

  if (!partial || has('title')) {
    const title = str('title');
    if (title.length < 3 || title.length > 255) errors.title = 'Title must be 3 to 255 characters.';
    else data.title = title;
  }

  if (!partial || has('category')) {
    const v = str('category');
    if (!v) errors.category = 'Category is required.';
    else if (v.length > 100) errors.category = 'Category must be 100 characters or fewer.';
    else data.category = v;
  }

  if (has('author')) {
    const v = str('author');
    if (v.length > 255) errors.author = 'Author must be 255 characters or fewer.';
    else data.author = v || null;
  }

  // The editor sends "date"; the column is publication_date.
  if (has('date') || has('publication_date')) {
    const v = str(has('date') ? 'date' : 'publication_date');
    if (v.length > 30) errors.date = 'Publication date must be 30 characters or fewer.';
    else data.publication_date = v || null;
  }

  // "excerpt" is accepted as an alias for older clients.
  const descKey = has('description') ? 'description' : has('excerpt') ? 'excerpt' : null;
  if (descKey) {
    const v = str(descKey);
    if (v.length > 1000) errors.description = 'Description must be 1000 characters or fewer.';
    else data.description = v || null;
  }

  if (has('content')) {
    data.content = typeof body.content === 'string' ? body.content : '';
  }

  // Image sent as a path/URL (two-step upload). A file sent with the form is handled in create/update.
  const imageKey = IMAGE_KEYS.find(has);
  if (imageKey) data.image = normalizeImageRef(body[imageKey], req);

  if (has('slug')) {
    const v = slugify(str('slug'));
    if (str('slug') && !v) errors.slug = 'Slug contains no valid characters.';
    else if (v) data.slug = v;
  }

  if (has('status')) {
    if (!['draft', 'published'].includes(body.status)) errors.status = 'Status must be draft or published.';
    else data.status = body.status;
  }

  if (Object.keys(errors).length) {
    throw new HttpError(400, Object.values(errors).join(' '), errors);
  }
  return data;
};

// A post can be a draft without content, but it cannot be published empty.
const assertPublishable = (status, content) => {
  if (status === 'published' && !String(content ?? '').trim()) {
    throw new HttpError(400, 'Article content is required to publish. Save it as a draft instead.', {
      content: 'Content is required to publish.',
    });
  }
};

// ---------- public ----------
// GET /api/blogs  or  /api/blogs/public   (?page=&limit=&search=&category=)
const listPublished = asyncHandler(async (req, res) => {
  const { page, limit, offset } = parsePaging(req.query);
  const where = ["status = 'published'"];
  const params = [];

  if (req.query.category) {
    where.push('category = ?');
    params.push(String(req.query.category));
  }
  if (req.query.search) {
    where.push('(title LIKE ? OR description LIKE ?)');
    const term = `%${String(req.query.search).slice(0, 100)}%`;
    params.push(term, term);
  }
  const clause = `WHERE ${where.join(' AND ')}`;

  const [[{ total }]] = await pool.query(`SELECT COUNT(*) AS total FROM blogs ${clause}`, params);
  const [rows] = await pool.query(
    `SELECT ${PUBLIC_LIST_COLUMNS} FROM blogs ${clause} ORDER BY created_at DESC, id DESC LIMIT ? OFFSET ?`,
    [...params, limit, offset]
  );

  res.json({ data: rows, pagination: pagination(page, limit, total) });
});

// GET /api/blogs/:slug
const getPublishedBySlug = asyncHandler(async (req, res) => {
  const [rows] = await pool.execute(
    "SELECT * FROM blogs WHERE slug = ? AND status = 'published' LIMIT 1",
    [req.params.slug]
  );
  if (!rows.length) throw new HttpError(404, 'Blog post not found.');
  res.json({ data: rows[0] });
});

// ---------- admin ----------
// GET /api/admin/blogs?status=&search=   -> every post, with full content (the editor needs it)
// Add ?page= or ?limit= to paginate.
const listAll = asyncHandler(async (req, res) => {
  const where = [];
  const params = [];

  if (['draft', 'published'].includes(req.query.status)) {
    where.push('status = ?');
    params.push(req.query.status);
  }
  if (req.query.search) {
    where.push('(title LIKE ? OR description LIKE ? OR author LIKE ?)');
    const term = `%${String(req.query.search).slice(0, 100)}%`;
    params.push(term, term, term);
  }
  const clause = where.length ? `WHERE ${where.join(' AND ')}` : '';
  const order = 'ORDER BY created_at DESC, id DESC';

  const [[{ total }]] = await pool.query(`SELECT COUNT(*) AS total FROM blogs ${clause}`, params);

  if (req.query.page || req.query.limit) {
    const { page, limit, offset } = parsePaging(req.query);
    const [rows] = await pool.query(`SELECT * FROM blogs ${clause} ${order} LIMIT ? OFFSET ?`, [
      ...params,
      limit,
      offset,
    ]);
    return res.json({ data: rows, pagination: pagination(page, limit, total) });
  }

  const [rows] = await pool.query(`SELECT * FROM blogs ${clause} ${order}`, params);
  res.json({ data: rows, pagination: pagination(1, Math.max(total, 1), total) });
});

// GET /api/admin/blogs/:id
const getById = asyncHandler(async (req, res) => {
  const [rows] = await pool.execute('SELECT * FROM blogs WHERE id = ? LIMIT 1', [req.params.id]);
  if (!rows.length) throw new HttpError(404, 'Blog post not found.');
  res.json({ data: rows[0] });
});

// POST /api/admin/blogs   (multipart/form-data, optional "image" file)
const create = withUploadCleanup(async (req, res) => {
  const input = readInput(req.body ?? {}, false, req);
  const status = input.status || 'draft';
  const content = input.content ?? '';
  assertPublishable(status, content);

  const slug = await uniqueSlug(input.slug || input.title);
  // An uploaded file wins; otherwise use the image URL/path from the request body.
  const image = req.file ? `/uploads/blogs/${req.file.filename}` : input.image ?? null;

  const [result] = await pool.execute(
    `INSERT INTO blogs
       (title, slug, category, author, publication_date, description, content, image, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      input.title,
      slug,
      input.category,
      input.author ?? req.admin?.name ?? null,
      input.publication_date ?? null,
      input.description ?? null,
      content,
      image,
      status,
    ]
  );

  const [rows] = await pool.execute('SELECT * FROM blogs WHERE id = ?', [result.insertId]);
  res.status(201).json({ message: 'Blog post created.', data: rows[0] });
});

// PUT /api/admin/blogs/:id   (multipart/form-data, optional "image" file, optional removeImage=true)
const update = withUploadCleanup(async (req, res) => {
  const [existingRows] = await pool.execute('SELECT * FROM blogs WHERE id = ? LIMIT 1', [req.params.id]);
  const existing = existingRows[0];
  if (!existing) throw new HttpError(404, 'Blog post not found.');

  const body = req.body ?? {};
  const input = readInput(body, true, req);

  // Existing URLs stay stable unless a new slug is explicitly supplied.
  if (input.slug && input.slug !== existing.slug) input.slug = await uniqueSlug(input.slug, existing.id);
  else delete input.slug;

  // Cover image: a new upload replaces the old one; removeImage=true (or an empty image
  // value) clears it; an image URL/path in the body sets it.
  if (req.file) input.image = `/uploads/blogs/${req.file.filename}`;
  else if (body.removeImage === 'true') input.image = null;

  if (!Object.keys(input).length) throw new HttpError(400, 'Nothing to update.');

  assertPublishable(input.status ?? existing.status, input.content ?? existing.content);

  const sets = [];
  const params = [];
  for (const [key, value] of Object.entries(input)) {
    sets.push(`${key} = ?`);
    params.push(value);
  }

  await pool.execute(`UPDATE blogs SET ${sets.join(', ')} WHERE id = ?`, [...params, existing.id]);

  // Delete the old file only after the database update succeeded.
  if (Object.hasOwn(input, 'image') && input.image !== existing.image) {
    await deleteImageIfUnused(existing.image, existing.id);
  }

  const [rows] = await pool.execute('SELECT * FROM blogs WHERE id = ?', [existing.id]);
  res.json({ message: 'Blog post updated.', data: rows[0] });
});

// DELETE /api/admin/blogs/:id
const remove = asyncHandler(async (req, res) => {
  const [rows] = await pool.execute('SELECT image FROM blogs WHERE id = ? LIMIT 1', [req.params.id]);
  if (!rows.length) throw new HttpError(404, 'Blog post not found.');

  await pool.execute('DELETE FROM blogs WHERE id = ?', [req.params.id]);
  await deleteImageIfUnused(rows[0].image, Number(req.params.id));

  res.json({ message: 'Blog post deleted.' });
});

export {
  listPublished,
  listPublished as getPublished, // used by routes/blogRoutes.js
  getPublishedBySlug,
  listAll,
  listAll as getAll, // used by routes/adminBlogRoutes.js
  getById,
  create,
  update,
  remove,
};

