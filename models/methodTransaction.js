const { DataTypes } = require('sequelize');
const db = require('../config/database.js');

const MethodTransaction = db.define(
  'MethodTransaction',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    type_transaction: {
      type: DataTypes.STRING(45),
      defaultValue: 'Transfer',
    },
    bank: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    name_bank: {
      type: DataTypes.STRING(115),
      allowNull: true,
    },
    no_rek: {
      type: DataTypes.STRING(35),
      allowNull: true,
    },
    is_Active: {
      type: DataTypes.STRING(5),
      defaultValue: '0',
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = MethodTransaction;

(async () => {
  await MethodTransaction.sync({ alter: true }).then(() => {
    console.log('Method Transaction Database  & tables created!');
  });
})();
