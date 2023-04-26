import db from "../config/database.js";
import Order from "../models/order.js";
import Pengujian from "../models/pengujian.js";
import Status from "../models/status.js";
import Users from "../models/user.js";
import { handleResponseSuccess } from "../utils/handleResponse.js";

export const CreateOrder = async (req, res) => {
  const t = await db.transaction();
  try {
    const user = await Users.findByPk("33ef6651-0075-4675-88e0-0d488111a5cd");

    const pengujianA = await Pengujian.findByPk(
      "2d4e283a-5c99-4761-a4a4-e3c435f23772"
    );

    const pengujianB = await Pengujian.findByPk(
      "455e64dd-649b-454c-b6d4-8d04853791d2"
    );

    const order = await Order.create({
      total_price: "15000000",
    });

    console.log("USER", user.id);

    await order.setUser(user);
    await order.setPengujian(pengujianA);

    const result = await Order.findOne({
      where: { id: order.id },
      include: [
        {
          model: Users,
        },
        {
          model: Pengujian,
        },
      ],
    });

    // const order = await Order.create(
    //   {
    //     UserId: "33ef6651-0075-4675-88e0-0d488111a5cd",
    //     total_price: "15000000",
    //     status: {
    //       status_persetujuan: "2",
    //     },
    //   },
    //   {
    //     include: [{ model: Status, as: "status" }],
    //   },
    //   { transaction: t }
    // );

    // const orderPengujuan = await OrderPengujian.create(
    //   {
    //     orderId: order.id,
    //     PengujianId: "2d4e283a-5c99-4761-a4a4-e3c435f23772",
    //   },
    //   { transaction: t }
    // );

    // const result = await Order.findByPk(order.id, {
    //   include: [
    //     { model: Status, as: "status" },
    //     { model: Pengujian, as: "pengujian", through: { attributes: [] } },
    //   ],
    // });

    // await t.commit();

    return handleResponseSuccess(res, result);
  } catch (error) {
    console.log(error);
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findAll({
      where: { UserId: "33ef6651-0075-4675-88e0-0d488111a5cd" },
      include: [
        {
          model: Users,
        },
        { model: Status, as: "status" },
        { model: Pengujian, as: "pengujian", through: { attributes: [] } },
      ],
    });

    const resultOerdering = order.map((o, i) => o.dataValues.id);

    console.log("TESS", resultOerdering);

    return handleResponseSuccess(res, order);
  } catch (error) {
    console.log(error);
  }
};
