import Users from "../models/user.js";
import Order from "../models/order.js";
import TeknisiPengujian from "../models/teknisiPengujian.js";
import {
  handleResponseError,
  handleResponseNotFound,
  handleResponseSuccess,
} from "../utils/handleResponse.js";
import Status from "../models/status.js";
import Project from "../models/project.js";
import Item from "../models/itemOrder.js";
import Pengujian from "../models/pengujian.js";

export const GetAllTeknisi = async (req, res) => {
  try {
    const teknisi = await Users.findAll({
      where: {
        role: "teknisi",
      },
      attributes: [
        "id",
        "full_name",
        "email",
        "no_whatsapp",
        "address",
        "company_name",
      ],
    });

    return handleResponseSuccess(res, teknisi);
  } catch (error) {
    console.log(error);
    return handleResponseError(res);
  }
};

export const CreateTeknisiPengujian = async (req, res) => {
  const { teknisi_id, order_id } = req.body;
  try {
    const findUser = await Users.findByPk(teknisi_id);

    const findOrder = await Order.findByPk(order_id);

    if (!findUser && !findOrder) {
      return handleResponseNotFound(res);
    }

    const createTeknisiPengujian = await TeknisiPengujian.create({
      UserId: teknisi_id,
      orderId: order_id,
    });

    return handleResponseSuccess(res, createTeknisiPengujian);
  } catch (error) {
    console.log(error);
    return handleResponseError(res);
  }
};

export const GetAllTeknisiPengujian = async (req, res) => {
  try {
    const getAllTeknisiPengujian = await TeknisiPengujian.findAll({
      attributes: { exclude: ["UserId", "orderId"] },
      include: [
        {
          model: Users,
          as: "teknisi",
          attributes: [
            "id",
            "full_name",
            "email",
            "no_whatsapp",
            "address",
            "company_name",
          ],
        },
        {
          model: Order,
          include: [
            {
              model: Users,
              attributes: [
                "id",
                "full_name",
                "email",
                "no_whatsapp",
                "address",
                "company_name",
              ],
            },
            {
              model: Status,
              as: "status",
              attributes: [
                "id",
                "status_persetujuan",
                "status_transaction",
                "status_payment",
              ],
            },
            {
              model: Project,
              as: "proyek",
            },
            {
              model: Item,
              attributes: ["id"],
              include: [
                {
                  model: Pengujian,
                  attributes: { exclude: ["createdAt", "updatedAt"] },
                },
              ],
              through: { attributes: ["quantity"] },
            },
          ],
        },
      ],
    });

    return handleResponseSuccess(res, getAllTeknisiPengujian);
  } catch (error) {
    console.log(error);
    return handleResponseError(res);
  }
};

export const GetTeknisiByOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const getAllTeknisiPengujian = await TeknisiPengujian.findAll({
      where: { orderId: id },
      attributes: { exclude: ["UserId"] },
      include: [
        {
          model: Users,
          as: "teknisi",
          attributes: ["id", "full_name"],
        },
      ],
    });

    return handleResponseSuccess(res, getAllTeknisiPengujian);
  } catch (error) {
    console.log(error);
    return handleResponseError(res);
  }
};
