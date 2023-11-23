import express from "express";
import { getUsers, editUser, getSingleUser, deleteUser } from "../controllers/usersController.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getSingleUser);
router.put("/:id", editUser);
router.delete("/:id", deleteUser);

export default router;
