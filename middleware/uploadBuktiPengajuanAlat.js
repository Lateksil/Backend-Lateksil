const multer = require("multer");
const path = require("path");
const { v4 } = require("uuid");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/bukti-alat/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = v4(); // Generate UUID
    const ext = path.extname(file.originalname);

    const filename = `pengajuan-alat-${uniqueSuffix}${ext}`;
    cb(null, filename);
  },
});

const uploadBuktiPengajuanAlat = multer({ storage: storage }).single(
  "image_pengajuan_alat"
);

module.exports = uploadBuktiPengajuanAlat;
