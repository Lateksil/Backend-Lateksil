import { DataTypes } from "sequelize";
import db from "../config/database.js";

const Status = db.define(
  "status",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    status_persetujuan: {
      type: DataTypes.STRING(5),
      defaultValue: "1", // 0 = Persetujuan CANCELED, 1 = Persetujuan WAITING, 2 = Persetujuan Di ACCEPTED
    },
    status_transaction: {
      type: DataTypes.STRING(5),
      defaultValue: "1", // 0 = Transaction CANCELED, 1 = Transaction WAITING, 2 = Transaction Di ACC, 3 = Transaction IN PROGRESS, 4 = Transaction DONE
    },
    status_pengujian: {
      type: DataTypes.STRING(5),
      defaultValue: "0", // 0 = Perencanaan, 1 = Persetujuan, 2 = Proses Pengujian, 3 = Tahap Pengerjaan
    },
    status_payment: {
      type: DataTypes.STRING(5),
      defaultValue: "0", // 0 = BELUM BAYAR, 1 = SUDAH BAYAR
    },
    accept_payment: {
      type: DataTypes.STRING(5),
      defaultValue: "0", // 0 = BELUM DITERIMA, 1 = SUDAH DITERIMA
    },
    is_send_manager: {
      type: DataTypes.STRING(5),
      defaultValue: "0", // 0 = BELUM DIKIRIM MANAGER, 1 = SUDAH DIKIRIM MANAGER
    },
    is_send_costumer: {
      type: DataTypes.STRING(5),
      defaultValue: "0", // 0 = BELUM DIKIRIM COSTUMER, 1 = SUDAH DIKIRIM COSTUMER
    },
  },
  {
    freezeTableName: true,
  }
);

export default Status;

(async () => {
  await Status.sync({ alter: true }).then(() => {
    console.log("Status Database  & tables created!");
  });
})();
