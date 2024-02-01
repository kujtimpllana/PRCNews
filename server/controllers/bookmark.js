import { db } from "../db.js";

export const getBookmarks = (req, res) => {
  const userId = res.locals.user.id;
  const postId = req.params.id;

  const q = "SELECT * FROM saved_posts WHERE u_id = ? AND n_id = ?";

  db.query(q, [userId, postId], (err, data) => {
    if (err) return res.status(404).json("No such bookmark.");

    return res.status(200).json(data);
  });
};

export const getAllBookmarksByUserId = (req, res) => {
  const userId = res.locals.user.id;
  const saved_status = "true";

  const q =
    "SELECT n.id, n.title, n.desc, n.img, n.date, n.category, n.date, sp.saved_id, sp.u_id, sp.n_id, sp.saved_status FROM news n JOIN saved_posts sp ON n.id=sp.n_id WHERE sp.u_id=? AND sp.saved_status=? ORDER BY n.date DESC";

  db.query(q, [userId, saved_status], (err, data) => {
    if (err) return res.status(404).json("No such bookmark.");

    return res.status(200).json(data);
  });
};

export const saveBookmark = (req, res) => {
  const postId = req.params.id;
  const userId = res.locals.user.id;
  const savedStatus = String(req.body.isSaved);

  const q =
    "SELECT * FROM saved_posts WHERE u_id = ? AND n_id = ? AND saved_status = ?";

  db.query(q, [userId, postId, savedStatus], (err, data) => {
    if (err) return res.status(404).json(err);
    if (data.length) return res.status(403).json(err);

    const q =
      "INSERT INTO saved_posts(`u_id`, `n_id`, `saved_status`) VALUES (?)";

    const values = [userId, postId, savedStatus];

    db.query(q, [values], (err, data) => {
      if (err)
        return res.status(403).json("Creating bookmark failed! Try again.");

      return res.status(201).json("Bookmark created successfully.");
    });
  });
};

export const deleteBookmark = (req, res) => {
  const postId = req.params.id;
  const userId = res.locals.user.id;

  const q = "DELETE FROM saved_posts WHERE u_id = ? AND n_id = ?";

  db.query(q, [userId, postId], (err, data) => {
    if (err) return res.status(404).json("No such bookmark to delete!");

    return res.status(201).json("Bookmark successfully deleted.");
  });
};
