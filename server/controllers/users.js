import { db } from "../db.js";
import bcrypt from "bcryptjs";

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
  //remove profile_photo if any errors
  const q =
    "SELECT fullname, email, role, profile_photo FROM users WHERE id = ?";

  db.query(q, [userId], (err, data) => {
    if (err) return res.status(404).json(err);

    return res.status(200).json(data);
  });
};

//edit user as admin
export const editUser = (req, res) => {
  const userId = req.params.id;
  const q = "UPDATE users SET fullname = ?, email = ?, role = ? WHERE id = ?";

  const values = [req.body.fullname, req.body.email, req.body.role];

  db.query(q, [...values, userId], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json("User has been updated.");
  });
};

//the user can change it's information
export const editUserProfile = (req, res) => {
  const userId = req.params.id;
  const password = req.body.password;
  if (password) {
    //password hashing
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const q =
      "UPDATE users SET fullname = ?, email = ?, password = ? WHERE id = ?";

    const values = [req.body.fullname, req.body.email, hash, req.body.role];

    db.query(q, [...values, userId], (err, data) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json("User has been updated.");
    });
  } else {
    const q = "UPDATE users SET fullname = ?, email = ? WHERE id = ?";

    const values = [req.body.fullname, req.body.email, req.body.role];

    db.query(q, [...values, userId], (err, data) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json("User has been updated.");
    });
  }
};

export const editUserProfilePicture = (req, res) => {
  const profile_photo = req.body.profile_photo;
  const userId = req.params.id;

  const q = "UPDATE users SET profile_photo = ? WHERE id = ?";

  db.query(q, [profile_photo, userId], (err, data) => {
    if (err) return res.status(401).json(err);

    return res.status(201).json(data);
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
