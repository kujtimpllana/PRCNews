import express from "express";
import {
  addPost,
  deletePost,
  getPosts,
  getPostsByFixedSize,
  getSinglePost,
  updatePost,
} from "../controllers/news.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/fixed", getPostsByFixedSize)
router.get("/:id", getSinglePost);
router.post("/", addPost);
router.delete("/:id", deletePost);
router.put("/:id", updatePost);

export default router;
