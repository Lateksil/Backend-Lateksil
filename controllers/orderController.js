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
      include: [
        {
          model: Pengujian,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
    });

    for (const product of cart) {
      await Item.create(
        {
          UserId: user_id,
          PengujianId: product.PengujianId,
          quantity: product.quantity,
        },
        { transaction: t }
      );
    }

    const itemOrder = await Item.findAll({
      where: {
        UserId: user_id,
      },
      include: [
        {
          model: Pengujian,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
    });

    if (!cart) {
      return handleResponseNotFound(res);
    }

    const order = await Order.create(
      {
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
      },
      { transaction: t }
    );

    await order.setUser(user);

    for (const product of itemOrder) {
      await OrderPengujian.create({
        orderId: order.id,
        quantity: product.quantity,
        itemOrderId: product.id,
      });
      console.log("TES", order.id, product.id, product.quantity);
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
  const { user_id } = req.body;
  try {
    const order = await Order.findAll({
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
      where: {
        UserId: user_id,
      },
    });

    return handleResponseSuccess(res, order);
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
