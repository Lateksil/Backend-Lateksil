const { DataTypes } = require('sequelize');
const db = require('../config/database.js');

const Payment = db.define(
  'payment',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    full_name: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    company_name: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    total_price: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    image_payment: {
      type: DataTypes.STRING(115),
      allowNull: true,
    },
    image_kwitansi: {
      type: DataTypes.STRING(115),
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Payment;

(async () => {
  await Payment.sync({ alter: true }).then(() => {
    console.log('Payment Database  & tables created!');
  });
})();
