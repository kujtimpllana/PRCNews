import express from "express";
import {
  deleteBookmark,
  getAllBookmarksByUserId,
  getBookmarks,
  saveBookmark,
} from "../controllers/bookmark.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/save/:id", verifyToken, getBookmarks);
router.get("/saved/posts", verifyToken, getAllBookmarksByUserId);
router.post("/save/:id", verifyToken, saveBookmark);
router.delete("/save/:id", verifyToken, deleteBookmark);

export default router;
