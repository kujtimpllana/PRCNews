import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getUsers = (req, res) => {
  const q = req.query.user
    ? "SELECT * FROM users WHERE role = ?"
    : "SELECT * FROM users";

  db.query(q, [req.query.user], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
};

export const changeRole = (req, res) => {};

export const deleteUser = (req, res) => {
  const userId = req.params.id;
  const q = "DELETE FROM users WHERE `id` = ?";

  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json("User has been deleted.");
  });
};
