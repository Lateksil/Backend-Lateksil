import Status from "../models/status.js";
import {
  handleResponseAuthorization,
  handleResponseError,
  handleResponseSuccess,
} from "../utils/handleResponse.js";

export const updateStatusToCostumer = async (req, res) => {
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

export const AddTeknisiAndPeralatanToTahapPengerjaan = async (req, res) => {
  try {
    const { order_id } = req.body;

    const TahapPengujian = await Status.findByPk(order_id);

    await Status.update(
      {
        status_transaction: "3",
        status_pengujian: "3",
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
