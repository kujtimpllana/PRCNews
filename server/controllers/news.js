import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getPosts = (req, res) => {
  const q = req.query.cat
    ? "SELECT * FROM news WHERE category=? ORDER BY date DESC LIMIT 10"
    : "SELECT * FROM news ORDER BY date DESC LIMIT 10";

  db.query(q, [req.query.cat], (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data);
  });
};

let INDEX = 10;
export const getPostsByFixedSize = (req, res) => {
  if (INDEX >= 1000000) INDEX = 0;
  INDEX += 10;

  const q = req.query.cat
    ? `SELECT DISTINCT * FROM news WHERE category=? ORDER BY date DESC LIMIT ${INDEX}`
    : `SELECT DISTINCT * FROM news ORDER BY date DESC LIMIT ${INDEX}`;

  db.query(q, [req.query.cat], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
};

export const getTotalNumberOfPosts = (req, res) => {
  const q = req.query.cat
    ? "SELECT * FROM news WHERE category=?"
    : "SELECT * FROM news";

  db.query(q, [req.query.cat], (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data.length);
  });
};

export const getSinglePost = (req, res) => {
  const q =
    "SELECT n.id, `fullname`, `title`, `desc`, `img`, `profile_photo`, `category`, `date` FROM users u JOIN news n ON u.id=n.uid WHERE n.id = ?";
  //req.params.id comes from ':id' endpoint
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data[0]);
  });
};

export const addPost = (req, res) => {
  const q =
    "INSERT INTO news (`title`, `desc`, `img`, `category`, `date`, `uid`) VALUES (?)";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.img,
    req.body.category,
    req.body.date,
    res.locals.user.id,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("Post has been created.");
  });
};

export const updatePost = (req, res) => {
  const postId = req.params.id;

  if (req.body.img) {
    const q =
      "UPDATE news SET `title` = ?, `desc` = ?, `img` = ?, `category` = ? WHERE `id` = ? AND `uid` = ?";

    const values = [
      req.body?.title,
      req.body?.desc,
      req.body?.img,
      req.body?.category,
    ];

    db.query(q, [...values, postId, res.locals.user.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been updated.");
    });
  } else if (!req.body.img) {
    const q =
      "UPDATE news SET `title` = ?, `desc` = ?, `category` = ? WHERE `id` = ? AND `uid` = ?";

    const values = [req.body?.title, req.body?.desc, req.body?.category];

    db.query(q, [...values, postId, res.locals.user.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been updated.");
    });
  }
};

export const deletePost = (req, res) => {
  const postId = req.params.id;
  const q = "DELETE FROM news WHERE `id` = ? AND `uid` = ?";

  db.query(q, [postId, res.locals.user.id], (err, data) => {
    if (err) return res.status(403).json("You can only delete your own post!");

    return res.json("Post has been deleted!");
  });
};

export const getAllComments = (req, res) => {
  const postId = req.params.id;
  const q =
    "SELECT u.id, u.fullname, u.profile_photo, c.id, c.nid, c.user_id, c.description, c.date FROM users u JOIN comments c ON c.user_id=u.id WHERE c.nid=? ORDER BY c.date DESC";

  db.query(q, [postId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const addComment = (req, res) => {
  const q = "INSERT INTO comments (`nid`, `user_id`, `description`) VALUES (?)";

  const values = [req.body.postId, res.locals.user.id, req.body.description];

  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("Comment has been created");
  });
};

export const updateCommentById = (req, res) => {
  const commentId = req.params.id;

  const q =
    "UPDATE comments SET `description` = ? WHERE `id` = ? AND `user_id` = ?";

  const values = [req.body?.description];

  db.query(q, [...values, commentId, res.locals.user.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("Comment has been updated.");
  });
};

export const deleteCommentById = (req, res) => {
  const commentId = req.params.id;
  const q = "DELETE FROM comments WHERE `id` = ? AND `user_id` = ?";
  db.query(q, [commentId, res.locals.user.id], (err, data) => {
    if (err)
      return res.status(403).json("You can only delete your own comment!");

    return res.json("Comment has been updated");
  });
};
