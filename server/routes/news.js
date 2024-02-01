import express from "express";
import {
  addPost,
  deletePost,
  getPosts,
  getPostsByFixedSize,
  getSinglePost,
  getTotalNumberOfPosts,
  updatePost,
  addComment,
  getAllComments,
  deleteCommentById,
  updateCommentById,
} from "../controllers/news.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/fixed", getPostsByFixedSize);
router.get("/total", getTotalNumberOfPosts);
router.get("/:id", getSinglePost);
router.post("/", verifyToken, addPost);
router.get("/comment/total/:id", getAllComments);
router.post("/comment", verifyToken, addComment);
router.delete("/comment/delete/:id", verifyToken, deleteCommentById);
router.put("/comment/update/:id", verifyToken, updateCommentById);
router.delete("/:id", verifyToken, deletePost);
router.put("/:id", verifyToken, updatePost);

export default router;
