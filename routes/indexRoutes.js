import authRoute from "./authRoutes.js";
import userRoute from "./userRoutes.js";
import category from "./categoryRoute.js";
import pengujian from "./pengujianRoute.js";
import cart from "./cartRoute.js";
import Order from "./orderRoute.js";
import Project from "./projectRoute.js";
import Status from "./statusRoute.js";
import MethodTransaction from "./methodTransactionRoute.js";
import Payment from "./paymentRoute.js";
import Peralatan from "./peralatanRoute.js";
import Teknisi from "./teknisiRoute.js";
import welcomeRouter from "./welcomeRoute.js";

const TerminalRoutes = (app) => {
  app.use(welcomeRouter);
  app.use(authRoute);
  app.use(userRoute);
  app.use(category);
  app.use(pengujian);
  app.use(cart);
  app.use(Order);
  app.use(Project);
  app.use(Status);
  app.use(MethodTransaction);
  app.use(Payment);
  app.use(Peralatan);
  app.use(Teknisi);
  app.use(Teknisi);
};

export default TerminalRoutes;
