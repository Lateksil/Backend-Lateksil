import db from "../config/database.js";
import Cart from "../models/cart.js";
import Item from "../models/itemOrder.js";
import Order from "../models/order.js";
import OrderPengujian from "../models/orderPengujian.js";
import Pengujian from "../models/pengujian.js";
import Project from "../models/project.js";
import Status from "../models/status.js";
import Users from "../models/user.js";
import {
  handleResponseError,
  handleResponseNotFound,
  handleResponseSuccess,
  handleResponseAuthorization,
} from "../utils/handleResponse.js";

export const CreateOrder = async (req, res) => {
  const { user_id } = req.body;

  const t = await db.transaction();
  try {
    const user = await Users.findByPk(user_id);

    if (!user) {
      return handleResponseNotFound(res);
    }

    const cart = await Cart.findAll({
      where: {
        UserId: user_id,
      },
      attributes: ["id", "quantity", "PengujianId"],
    });

    if (cart.length === 0) {
      return handleResponseAuthorization(res, 404, "Cart not found");
    }

    const order = await Order.create(
      {
        UserId: user_id,
        total_price: "15000000",
        proyek: {
          nama_proyek: "Nama Proyek 1",
          tujuan_proyek: "Tujuan ProyekNYA",
          no_whatsApp_proyek: "08979111476",
        },
        status: {
          status_persetujuan: "0",
        },
      },
      {
        include: [
          { model: Status, as: "status" },
          { model: Project, as: "proyek" },
        ],
      }
    );

    for (const product of cart) {
      await Item.create(
        {
          id: product.id,
          UserId: user_id,
          PengujianId: product.PengujianId,
          quantity: product.quantity,
        },
        { transaction: t }
      );

      await OrderPengujian.create(
        {
          orderId: order.id,
          quantity: product.quantity,
          itemOrderId: product.id,
        },
        { transaction: t }
      );
    }

    await Cart.destroy({ where: { UserId: user_id } });

    await t.commit();

    return handleResponseSuccess(res, "Order Berhasil!");
  } catch (error) {
    console.log(error);
    return handleResponseError(res);
  }
};

export const getOrderById = async (req, res) => {
  const { user_id, page = 1, limit = 10 } = req.body;

  const offset = (page - 1) * limit;

  try {
    const { count, rows } = await Order.findAndCountAll({
      where: {
        UserId: user_id,
      },
      offset,
      limit: parseInt(limit, 10),
      distinct: true,
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
          attributes: ["id", "status_persetujuan"],
        },
        {
          model: Project,
          as: "proyek",
        },
        {
          model: Item,
          where: {
            UserId: user_id,
          },
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
      attributes: { exclude: ["UserId", "updatedAt"] },
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

export const updateStatusById = async (req, res) => {
  try {
    const status = await Status.findByPk(
      "84896615-4cc5-4c80-9079-24b90b3a325d"
    );

    if (!status) {
      return handleResponseNotFound(res);
    }

    await Status.update(
      {
        status_persetujuan: "2",
      },
      {
        where: { id: "84896615-4cc5-4c80-9079-24b90b3a325d" },
      }
    );

    await status.reload();

    return handleResponseSuccess(res, status);
  } catch (error) {
    console.log(error);
    return handleResponseError(res);
  }
};
