import { db } from "../db.js";

export const getUsers = (req, res) => {
  const q = req.query.user
    ? "SELECT * FROM users WHERE role = ?"
    : "SELECT * FROM users";

  db.query(q, [req.query.user], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
};

export const getSingleUser = (req, res) => {
  const userId = req.params.id;
  const q = "SELECT fullname, email, role FROM users WHERE id = ?";

  db.query(q, [userId], (err, data) => {
    if (err) return res.status(404).json(err);

    return res.status(200).json(data);
  });
};

export const editUser = (req, res) => {
  const userId = req.params.id;
  const q = "UPDATE users SET fullname = ?, email = ?, role = ? WHERE id = ?";

  const values = [req.body.fullname, req.body.email, req.body.role];

  db.query(q, [...values, userId], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json("User has been updated.");
  });
};

export const deleteUser = (req, res) => {
  const userId = req.params.id;
  const q = "DELETE FROM users WHERE `id` = ?";

  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json("User has been deleted.");
  });
};
