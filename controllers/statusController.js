import Status from "../models/status.js";
import {
  handleResponseAuthorization,
  handleResponseError,
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
