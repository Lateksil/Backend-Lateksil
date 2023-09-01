const multer = require("multer");
const path = require("path");
const { v4 } = require("uuid");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/payment/bukti-pembayaran/");
  },
  filename: (req, file, cb) => {
    const { full_name, company_name } = req.body;

    const FullNameReg = full_name.toLowerCase().replace(/\s/g, "");
    const CompanyNameReg = company_name.toLowerCase().replace(/\s/g, "");
    const uniqueSuffix = v4(); // Generate UUID
    const ext = path.extname(file.originalname);

    const filename = `${FullNameReg}-${CompanyNameReg}-${uniqueSuffix}${ext}`;
    cb(null, filename);
  },
});

const uploadBuktiPembayaran = multer({ storage: storage }).single(
  "image_payment"
);

module.exports = uploadBuktiPembayaran;
