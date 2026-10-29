import { Router } from 'express';
import * as blog from '../controllers/blogController.js';
import { requireAdmin } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = Router();

// Every route below needs a valid admin session.
// (Runs before multer, so logged-out requests never write files to disk.)
router.use(requireAdmin);

// Express 5 dropped inline regex params, so validate :id here.
router.param('id', (req, res, next, id) => {
  if (!/^\d+$/.test(id)) return res.status(404).json({ message: 'Blog post not found.' });
  next();
});

// Stand-alone image upload for clients that upload first and then save the article as JSON.
// Returns the stored path and a full URL. Wrong file types now give a 400 error.
router.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Please upload a PNG, JPG or WebP image.' });
  }
  const path = `/uploads/blogs/${req.file.filename}`;
  res.json({ path, url: `${req.protocol}://${req.get('host')}${path}` });
});

router.get('/', blog.listAll);

// upload.single('image') lets these routes accept BOTH:
//   - multipart/form-data (the form fields + the image file in one request), and
//   - plain JSON (multer skips non-multipart requests; the image is then a URL/path field).
router.post('/', upload.single('image'), blog.create);

router.get('/:id', blog.getById);
router.put('/:id', upload.single('image'), blog.update);
router.delete('/:id', blog.remove);

export default router;

