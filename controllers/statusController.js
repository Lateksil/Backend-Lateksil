const Status = require("../models/status.js");
const {
  handleResponseAuthorization,
  handleResponseError,
  handleResponseNotFound,
  handleResponseSuccess,
} = require("../utils/handleResponse.js");

exports.updateStatusToCostumer = async (req, res) => {
  const { id, status_transaction } = req.body;
  try {
    const status = await Status.findByPk(id);

    if (!status) {
      return handleResponseNotFound(res);
    }

    await Status.update(
      {
        is_send_costumer: "1",
        status_transaction,
      },
      {
        where: { id },
      }
    );

    await status.reload();

    return handleResponseAuthorization(res, 200, "Berhasil Kirim Ke Costumer");
  } catch (error) {
    console.log(error);
    return handleResponseError(res);
  }
};

exports.updateDonePengujianPemesanan = async (req, res) => {
  try {
    const { order_id } = req.body;

    const TahapPengujian = await Status.findByPk(order_id);

    if (!TahapPengujian) {
      return handleResponseNotFound(res);
    }

    await Status.update(
      {
        status_transaction: "4",
      },
      {
        where: { id: order_id },
      }
    );

    await TahapPengujian.reload();

    return handleResponseSuccess(res, TahapPengujian);
  } catch (error) {
    console.log(error);
    return handleResponseError(res);
  }
};
