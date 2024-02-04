import express from "express";
import cookieParser from "cookie-parser";

import news from "./routes/news.js";
import users from "./routes/users.js";
import auth from "./routes/auth.js";
import bookmark from "./routes/bookmark.js";

import cors from "cors";
import multer from "multer";
import path from "path";

import dotenv from "dotenv";

// import rateLimit from "express-rate-limit";

const app = express();
app.use(express.json());
app.use(cookieParser());

dotenv.config();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// on production environment we should set this up
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15min
//   max: 50, // each IP 50 tries max per window
// });

// app.use(limiter);

//multer funcionallity dedicated to post images

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

//better written than previous multer funcionallity dedicated to user profile pictures

const pictureStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/pictures");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const pictureUpload = multer({
  storage: pictureStorage,
  limits: { fileSize: 2000000 },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
}).single("picture");

const checkFileType = (file, cb) => {
  //regex to validate file types
  const file_types = /jpeg|jpg|png|gif/;

  //check extension
  const extension_name = file_types.test(
    path.extname(file.originalname).toLowerCase()
  );

  //check mime type of the file, if it's image or not
  const mime_type = file_types.test(file.mimetype);

  if (mime_type && extension_name) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
};

app.post("/api/picture", (req, res) => {
  pictureUpload(req, res, (err) => {
    if (err) {
      res.json({ error_msg: err });
    } else {
      if (req.file == undefined) {
        res.status(404).json({ error_msg: "Error: No File Selected!" });
      } else {
        const file = req.file;
        res.status(201).json({
          success_msg: "File Uploaded Successfully.",
          file: file.filename,
        });
      }
    }
  });
});

app.use("/api/news", news);
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/bookmark", bookmark);

app.listen(process.env.PORT, () => {
  console.log("Connected!");
});
