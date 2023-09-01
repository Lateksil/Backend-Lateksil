const { DataTypes } = require('sequelize');
const db = require('../config/database.js');
const Item = require('./itemOrder.js');
const Order = require('./order.js');

const OrderPengujian = db.define(
  'OrderPengujian',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    quantity: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    orderId: {
      type: DataTypes.UUID,
      references: {
        model: Order,
        key: 'id',
      },
    },
    itemOrderId: {
      type: DataTypes.UUID,
      references: {
        model: Item,
        key: 'id',
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Item.belongsToMany(Order, { through: 'OrderPengujian' });
Order.belongsToMany(Item, { through: 'OrderPengujian' });

module.exports = OrderPengujian;

(async () => {
  await OrderPengujian.sync({ alter: true }).then(() => {
    console.log('Order_Pengujian Database  & tables created!');
  });
})();
