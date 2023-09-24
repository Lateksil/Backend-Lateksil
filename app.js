const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./config/database");

const TerminalRoutes = require("./routes/indexRoutes.js");

const app = express();

dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Welcome API Lateksil, Version up 1.5");
});

app.use(cors());
app.use((_req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

TerminalRoutes(app);

db.authenticate()
  .then(() => {
    console.log("Koneksi ke database berhasil.");
  })
  .catch((err) => {
    console.error("Gagal terhubung ke database:", err);
  });

app.use("/uploads", express.static("./uploads/pengujian/"));
app.use("/profile", express.static("./uploads/profile/"));
app.use(
  "/bukti-pembayaran",
  express.static("./uploads/payment/bukti-pembayaran/")
);
app.use("/bukti-kwitansi", express.static("./uploads/payment/kwitansi/"));
app.use("/bukti-peralatan", express.static("./uploads/bukti-alat/"));

app.listen(3030, () => {
  console.log("Server is listening on port 3030");
});
