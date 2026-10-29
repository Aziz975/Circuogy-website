import { Router } from 'express';
const router = Router();
import * as blog from '../controllers/blogController.js';
import { requireAdmin } from '../middleware/auth.js';
import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

// Every route below needs a valid admin session.
router.use(requireAdmin);

// Express 5 dropped inline regex params, so validate :id here.
router.param('id', (req, res, next, id) => {
  if (!/^\d+$/.test(id)) return res.status(404).json({ message: 'Blog post not found.' });
  next();
});


const upload = multer({
  storage: multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) =>
      cb(null, crypto.randomUUID() + path.extname(file.originalname).toLowerCase()),
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) =>
    cb(null, ['image/png', 'image/jpeg', 'image/webp'].includes(file.mimetype)),
});

router.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Please upload a PNG, JPG or WebP image.' });
  }
  res.json({ url: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` });
});

router.get('/', blog.listAll);
router.post('/', blog.create);
router.get('/:id', blog.getById);
router.put('/:id', blog.update);
router.delete('/:id', blog.remove);

export default router;
