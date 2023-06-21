import express from "express";
import {
  addBlog,
  deleteBlog,
  getAllBlogs,
  updateBlog,
  getBlogByUserId,
  getBlogById,
} from "../controllers/blogController.js";

const router = express.Router();

router.get("/get-all-blogs", getAllBlogs);
router.post("/add-blog", addBlog);
router.post("/update-blog/:id", updateBlog);
router.delete("/delete-blog/:id", deleteBlog);
router.get("/getbyId/:id", getBlogByUserId);
router.get("/getbyBlogId/:id", getBlogById);

export default router;
