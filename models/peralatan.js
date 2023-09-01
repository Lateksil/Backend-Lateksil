const { DataTypes } = require('sequelize');
const db = require('../config/database.js');
const Pengujian = require('./pengujian.js');

const Peralatan = db.define(
  'peralatan',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nama_alat: {
      type: DataTypes.STRING(115),
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

Pengujian.hasMany(Peralatan, { as: 'peralatan' });
Peralatan.belongsTo(Pengujian);

module.exports = Peralatan;

(async () => {
  await Peralatan.sync({ alter: true }).then(() => {
    console.log('Peralatan Database & tables created!');
  });
})();
