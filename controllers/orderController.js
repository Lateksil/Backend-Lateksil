import db from "../config/database.js";
import Order from "../models/order.js";
import OrderPengujian from "../models/orderPengujian.js";
import Pengujian from "../models/pengujian.js";
import Status from "../models/status.js";
import Users from "../models/user.js";
import { handleResponseSuccess } from "../utils/handleResponse.js";

export const CreateOrder = async (req, res) => {
  const t = await db.transaction();
  try {
    const user = await Users.findByPk("33ef6651-0075-4675-88e0-0d488111a5cd");

    const order = await Order.create(
      {
        total_price: "15000000",
        status: {
          status_persetujuan: "0",
        },
      },
      {
        include: [{ model: Status, as: "status" }],
      },
      { transaction: t }
    );

    await order.setUser(user);

    const pengujianA = await Pengujian.findByPk(
      "1f2bc1e9-f9e1-4da6-8c49-15f15dda27cd"
    );

    const pengujianB = await Pengujian.findByPk(
      "8e96c1fe-8f1b-4d1b-a38b-f8a18ddd7f09"
    );

    await OrderPengujian.create({
      orderId: order.id,
      PengujianId: pengujianA.id,
    });

    await OrderPengujian.create({
      orderId: order.id,
      PengujianId: pengujianB.id,
    });

    await t.commit();

    return handleResponseSuccess(res, "Done");
  } catch (error) {
    console.log(error);
  }
};

export const getOrderById = async (req, res) => {
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
          attributes: ["id","status_persetujuan"],
        },
        {
          model: Pengujian,
          attributes: { exclude: ["createdAt", "updatedAt"] },
          through: { attributes: [] },
        },
      ],
      attributes: { exclude: ['UserId','updatedAt']},
      // Berdasarkan User Id
      where: {
        UserId: "33ef6651-0075-4675-88e0-0d488111a5cd"
      }
    });

    return handleResponseSuccess(res, order);
  } catch (error) {
    console.log(error);
  }
};
