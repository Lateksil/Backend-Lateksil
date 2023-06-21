import multer from "multer";
import path from "path";
import { v4 } from "uuid";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/bukti-alat/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = v4(); // Generate UUID
    const ext = path.extname(file.originalname);

    const filename = `pengajuan-alat-${uniqueSuffix}${ext}`;
    cb(null, filename);
  },
});

const uploadBuktiPengajuanAlat = multer({ storage: storage }).single(
  "image_pengajuan_alat"
);

export default uploadBuktiPengajuanAlat;
