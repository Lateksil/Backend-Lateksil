import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/database.js";

import authRoute from "./routes/authRoutes.js";
import userRoute from "./routes/userRoutes.js";
import category from "./routes/categoryRoute.js";
import pengujian from "./routes/pengujianRoute.js";
import cart from "./routes/cartRoute.js";
import Order from "./routes/orderRoute.js";
import Project from "./routes/projectRoute.js";
import Status from "./routes/statusRoute.js";
import MethodTransaction from "./routes/methodTransactionRoute.js";

const app = express();

dotenv.config();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authRoute);
app.use(userRoute);
app.use(category);
app.use(pengujian);
app.use(cart);
app.use(Order);
app.use(Project);
app.use(Status);
app.use(MethodTransaction);

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
app.use("/payment", express.static("./uploads/payment/"));

app.listen(3030, () => {
  console.log("Server is listening on port 3030");
});
