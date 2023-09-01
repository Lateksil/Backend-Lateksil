const { DataTypes } = require('sequelize');
const db = require('../config/database.js');
const Payment = require('./payment.js');
const PeralatanPengujian = require('./peralatanPengujian.js');
const Project = require('./project.js');
const Status = require('./status.js');
const Users = require('./user.js');

const Order = db.define('order', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  total_price: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  file_result_pengujian: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

Users.hasMany(Order);
Order.belongsTo(Users);

Order.hasOne(Status, { as: 'status', foreignKey: 'id' });
Status.belongsTo(Order, { as: 'orders', foreignKey: 'id' });

Order.hasOne(Project, { as: 'proyek', foreignKey: 'id' });
Project.belongsTo(Order, { as: 'orders', foreignKey: 'id' });

Order.hasOne(Payment, { as: 'payment', foreignKey: 'id' });
Payment.belongsTo(Order, { as: 'orders', foreignKey: 'id' });

Order.hasOne(PeralatanPengujian, { as: 'status_alat', foreignKey: 'id' });
PeralatanPengujian.belongsTo(Order, { as: 'orders', foreignKey: 'id' });

module.exports = Order;

(async () => {
  await Order.sync({ alter: true }).then(() => {
    console.log('Order Database  & tables created!');
  });
})();
