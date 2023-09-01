const multer = require("multer");
const path = require("path");
const { v4 } = require("uuid");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/profile/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = v4(); // Generate UUID
    const ext = path.extname(file.originalname);

    const filename = `profile-${uniqueSuffix}${ext}`;
    cb(null, filename);
  },
});

const uploadProfleUser = multer({ storage: storage }).single("image_profile");

module.exports = uploadProfleUser;
