import multer from "multer";
import path from "path";

const uploadDir = path.join(process.cwd(), "uploads");
<<<<<<< HEAD
=======
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}
>>>>>>> 3a496d2436f45e8c4c170246b2f8e13308c3827f

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // assumes folder already exists
  },
  filename: function (req, file, cb) {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(null, uniqueName + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/png", "image/jpg", "image/jpeg", "image/webp"];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

export default upload;
