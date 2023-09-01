const { DataTypes } = require('sequelize');
const db = require('../config/database.js');

const Project = db.define(
  'proyek',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nama_proyek: {
      type: DataTypes.STRING(115),
      allowNull: false,
    },
    tujuan_proyek: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    no_refrensi: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    no_identifikasi: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    no_surat: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    tanggal_mulai: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tanggal_selesai: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    keterangan_to_client: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Project;

(async () => {
  await Project.sync({ alter: true }).then(() => {
    console.log('Proyek Database  & tables created!');
  });
})();
