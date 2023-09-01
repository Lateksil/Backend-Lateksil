const { DataTypes } = require('sequelize');
const db = require('../config/database.js');

const Pengujian = db.define(
  'Pengujian',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    image: {
      type: DataTypes.STRING(115),
      defaultValue: null,
    },
    jenis_pengujian: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    min_quantity: {
      type: DataTypes.STRING(15),
      defaultValue: '1',
    },
    code: {
      type: DataTypes.STRING(115),
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING(115),
      allowNull: false,
    },
    tempat_pengujian: {
      type: DataTypes.STRING(15),
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    sampler: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    catatan_khusus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Pengujian;

(async () => {
  await Pengujian.sync({ alter: true }).then(() => {
    console.log('Pengujian Database  & tables created!');
  });
})();
