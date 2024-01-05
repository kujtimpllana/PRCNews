import express from "express";
import cookieParser from "cookie-parser";

import news from "./routes/news.js";
import users from "./routes/users.js";
import auth from "./routes/auth.js";

import cors from "cors";
import multer from "multer";

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  res.status(200).json(file?.filename);
});

app.use("/api/news", news);
app.use("/api/users", users);
app.use("/api/auth", auth);

app.listen(9000, () => {
  console.log("Connected!");
});
