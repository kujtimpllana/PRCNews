import express from "express";
import cookieParser from "cookie-parser";

import newsRoute from "./routes/newsRoute.js";
import usersRoute from "./routes/usersRoute.js";
import authRoute from "./routes/authRoute.js";

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

app.use("/api/news", newsRoute);
app.use("/api/users", usersRoute);
app.use("/api/auth", authRoute);

app.listen(9000, () => {
  console.log("Connected!");
});
