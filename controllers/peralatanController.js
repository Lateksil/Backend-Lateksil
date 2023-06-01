import Item from "../models/itemOrder.js";
import Order from "../models/order.js";
import Pengujian from "../models/pengujian.js";
import Peralatan from "../models/peralatan.js";
import {
  handleResponseAuthorization,
  handleResponseError,
  handleResponseSuccess,
} from "../utils/handleResponse.js";

export const createPeralatan = async (req, res) => {
  const { pengujian_id, nama_alat } = req.body;
  try {
    const pengujian = await Pengujian.findByPk(pengujian_id);

    if (!pengujian) {
      return handleResponseAuthorization(res, 404, "Pengujian not found");
    }

    const addPeralatan = await Peralatan.create({
      nama_alat: nama_alat,
      PengujianId: pengujian_id,
    });

    return handleResponseSuccess(res, addPeralatan);
  } catch (error) {
    console.log(error);
    return handleResponseError(res);
  }
};

export const getAllPeralatan = async (req, res) => {
  const { page = 1, limit = 10 } = req.body;

  const offset = (page - 1) * limit;

  try {
    const { count, rows } = await Pengujian.findAndCountAll({
      offset,
      limit: parseInt(limit, 10),
      distinct: true,
      attributes: ["id", "jenis_pengujian", "category", "code"],
      include: [
        {
          model: Peralatan,
          as: "peralatan",
          attributes: ["id", "nama_alat"],
        },
      ],
    });

    return res.status(200).json({
      status: 200,
      error: false,
      message: "success",
      data: rows,
      limit,
      totalData: count,
      page: page,
      totalPages: Math.ceil(count / limit),
    });
  } catch (error) {
    console.log(error);
    return handleResponseError(res);
  }
};

export const getAlatPengujianByOrderId = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findByPk(id, {
      attributes: ["id"],
      include: [
        {
          model: Item,
          attributes: ["id"],
          include: [
            {
              model: Pengujian,
              attributes: [
                "id",
                "jenis_pengujian",
                "code",
                "min_quantity",
                "sampler",
              ],
              include: [
                {
                  model: Peralatan,
                  as: "peralatan",
                  attributes: ["id", "nama_alat"],
                },
              ],
            },
          ],
          through: { attributes: [] },
        },
      ],
    });

    if (!order) {
      return handleResponseAuthorization(res, 404, "Order not found");
    }

    return handleResponseSuccess(res, order);
  } catch (error) {
    console.log(error);
    return handleResponseError(res);
  }
};
