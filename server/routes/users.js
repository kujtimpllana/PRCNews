import express from "express";
import {
  getUsers,
  editUser,
  getSingleUser,
  deleteUser,
  editUserProfile,
  editUserProfilePicture,
} from "../controllers/users.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getSingleUser);
router.put("/:id", editUser);
router.put("/profile/data/:id", editUserProfile);
router.patch("/profile/picture/:id", editUserProfilePicture);
router.delete("/:id", deleteUser);

export default router;
