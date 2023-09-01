const multer = require("multer");
const path = require("path");
const { v4 } = require("uuid");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/filePdf/task-pengujian/");
  },
  filename: (req, file, cb) => {
    // const { full_name } = req.body;

    // const FullNameReg = full_name.toLowerCase().replace(/\s/g, "");
    const uniqueSuffix = v4(); // Generate UUID
    const ext = path.extname(file.originalname);

    const filename = `filePDF-${uniqueSuffix}${ext}`;
    cb(null, filename);
  },
});

const uploadTaskPengujianTeknisi = multer({ storage: storage }).single(
  "file_task_pengujian"
);

module.exports = uploadTaskPengujianTeknisi;
