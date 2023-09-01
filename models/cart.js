const { DataTypes } = require('sequelize');
const db = require('../config/database.js');
const Pengujian = require('./pengujian.js');
const Users = require('./user.js');

const Cart = db.define('cart', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  quantity: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },
});

Users.hasMany(Cart);
Cart.belongsTo(Users);

Pengujian.hasMany(Cart);
Cart.belongsTo(Pengujian);

module.exports = Cart;

(async () => {
  await Cart.sync({ alter: true }).then(() => {
    console.log('Cart Database  & tables created!');
  });
})();
