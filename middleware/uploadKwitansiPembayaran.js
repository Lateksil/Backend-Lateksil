import multer from "multer";
import path from "path";
import { v4 } from "uuid";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/payment/kwitansi/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = v4(); // Generate UUID
    const ext = path.extname(file.originalname);

    const filename = `kwitansi-${uniqueSuffix}${ext}`;
    cb(null, filename);
  },
});

const uploadKwitansiPembayaran = multer({ storage: storage }).single(
  "image_kwitansi"
);

export default uploadKwitansiPembayaran;
