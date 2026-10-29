import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import HttpError from "../utils/httpError.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const dir = path.join(__dirname, "..", "uploads", "blogs");
fs.mkdirSync(dir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, dir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e6)}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ok = ["image/png", "image/jpeg", "image/webp"].includes(file.mimetype);
    // 400 instead of a generic 500 when the file type is wrong
    cb(ok ? null : new HttpError(400, "Only PNG, JPG or WebP images are allowed."), ok);
  },
});

export default upload;

