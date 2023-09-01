const authRoute = require('./authRoutes.js');
const userRoute = require('./userRoutes.js');
const category = require('./categoryRoute.js');
const pengujian = require('./pengujianRoute.js');
const cart = require('./cartRoute.js');
const Order = require('./orderRoute.js');
const Project = require('./projectRoute.js');
const Status = require('./statusRoute.js');
const MethodTransaction = require('./methodTransactionRoute.js');
const Payment = require('./paymentRoute.js');
const Peralatan = require('./peralatanRoute.js');
const Teknisi = require('./teknisiRoute.js');

const TerminalRoutes = (app) => {
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
};

module.exports = TerminalRoutes;
