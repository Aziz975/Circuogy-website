import { Router } from "express";
import * as c from "../controllers/blogController.js";
 
const router = Router();
 
// PUBLIC routes only (mounted at /api/blogs).
// Admin routes live in adminBlogRoutes.js (/api/admin/blogs).
router.get("/public", c.listPublished); // keep BEFORE "/:slug"
router.get("/", c.listPublished);
router.get("/:slug", c.getPublishedBySlug);
 
export default router;
 