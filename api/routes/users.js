import express from "express";
import { getUsers, changeRole, deleteUser } from "../controllers/user.js";

const router = express.Router();

router.get("/", getUsers);
router.put("/:id", changeRole);
router.delete("/:id", deleteUser);

export default router;
