import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/database.js";

import TerminalRoutes from "./routes/indexRoutes.js";

const app = express();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use((_req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

TerminalRoutes(app);

(async () => {
  try {
    await db.authenticate().then(() => {
      console.log("Connection DB has been established successfully.");
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

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
