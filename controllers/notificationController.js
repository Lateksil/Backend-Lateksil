const Order = require("../models/order");
const Status = require("../models/status");
const { handleResponseError } = require("../utils/handleResponse");

exports.riwayatTransactionNotif = async (req, res) => {
  const { id } = req.params;
  try {
    const tahapPermintaan = await Order.findAndCountAll({
      where: { UserId: id },
      include: [
        {
          model: Status,
          as: "status",
          attributes: ["id", "status_transaction"],
          where: {
            status_transaction: "1",
          },
        },
      ],
    });

    const tahapPembayaran = await Order.findAndCountAll({
      where: { UserId: id },
      include: [
        {
          model: Status,
          as: "status",
          attributes: ["id", "status_transaction"],
          where: {
            status_transaction: "2",
          },
        },
      ],
    });

    const tahapPengerjaan = await Order.findAndCountAll({
      where: { UserId: id },
      include: [
        {
          model: Status,
          as: "status",
          attributes: ["id", "status_transaction"],
          where: {
            status_transaction: "3",
          },
        },
      ],
    });

    const selesai = await Order.findAndCountAll({
      where: { UserId: id },
      include: [
        {
          model: Status,
          as: "status",
          attributes: ["id", "status_transaction"],
          where: {
            status_transaction: "4",
          },
        },
      ],
    });

    const dibatalkan = await Order.findAndCountAll({
      where: { UserId: id },
      include: [
        {
          model: Status,
          as: "status",
          attributes: ["id", "status_transaction"],
          where: {
            status_transaction: "0",
          },
        },
      ],
    });
    return res.status(200).json({
      tahap_permintaan: tahapPermintaan.count,
      tahap_pembayaran: tahapPembayaran.count,
      tahap_pengerjaan: tahapPengerjaan.count,
      tahap_selesai: selesai.count,
      dibatalkan: dibatalkan.count,
    });
  } catch (error) {
    console.log(error);
    return handleResponseError(res);
  }
};
