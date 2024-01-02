import express from "express";
import {
  addNew,
  deleteNew,
  getNews,
  getSingleNew,
  updateNew,
} from "../controllers/newsController.js";

const router = express.Router();

router.get("/", getNews);
router.get("/:id", getSingleNew);
router.post("/", addNew);
router.delete("/:id", deleteNew);
router.put("/:id", updateNew);

export default router;
