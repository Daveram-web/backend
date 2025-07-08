import multer from "multer";
import path from "path";
import fs from "fs";

const ensureDirExists = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

ensureDirExists("./uploads/movies/thumbnail");
ensureDirExists("./uploads/movies/trailer");
ensureDirExists("./uploads/movies/streamingplatforms");
ensureDirExists("./uploads/movies/actor");
ensureDirExists("./uploads/movies/crew");
ensureDirExists("./uploads/user/avatar");
ensureDirExists("./uploads/user/audio");
ensureDirExists("./uploads/user/video");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "thumbnail") {
      cb(null, "./uploads/movies/thumbnail");
    } else if (file.fieldname === "trailer") {
      cb(null, "./uploads/movies/trailer");
    } else if (file.fieldname === "streaming") {
      cb(null, "./uploads/movies/streamingplatforms");
    } else if (file.fieldname === "actor") {
      cb(null, "./uploads/movies/actor");
    } else if (file.fieldname === "crew") {
      cb(null, "./uploads/movies/crew");
    } else {
      cb(new Error("Invalid field name"), false);
    }
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const filename = Math.round(Math.random() * 1e9) + ext;
    cb(null, filename);
  },
});



const userData = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "video") {
      cb(null, "./uploads/user/video");
    } else if (file.fieldname === "audio") {
      cb(null, "./uploads/user/audio");
    } else if (file.fieldname === "avatar") {
      cb(null, "./uploads/user/avatar");
    } else {
      cb(new Error("File Name Thappa irruku"), false);
    }
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const filename = Math.round(Math.random() * 1e9) + ext;
    cb(null, filename);
  }
});


export const uploadMovieFiles = multer({
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024,
  },
}).fields([
  { name: "thumbnail", maxCount: 1 },
  { name: "trailer", maxCount: 1 },
  { name: "streaming", maxCount: 1 },
  { name: "actor", maxCount: 1 },
  { name: "crew", maxCount: 1 },
]);


export const userFilesUpload = multer({
  storage: userData,
  limits: {
    fileSize: 100 * 1024 * 1024
  }
}).fields([
  { name: "video", maxCount: 1 },
  { name: "audio", maxCount: 1 },
  { name: "avatar", maxCount: 1 }
]);

