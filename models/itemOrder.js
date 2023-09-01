const { DataTypes } = require('sequelize');
const db = require('../config/database.js');
const Pengujian = require('./pengujian.js');
const Users = require('./user.js');

const Item = db.define(
  'itemOrder',
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
  },
  {
    timestamps: false,
  }
);

Users.hasMany(Item);
Item.belongsTo(Users);

Pengujian.hasMany(Item);
Item.belongsTo(Pengujian);

module.exports = Item;

(async () => {
  await Item.sync({ alter: true }).then(() => {
    console.log('Item Order Database  & tables created!');
  });
})();
