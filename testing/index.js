for (const key of nameFilter) {
    if (filter[key]) {
      if (!where[Op.or]) {
        where[Op.or] = [];
      }
      where[Op.or].push({ [key]: { [Op.iLike]: `%${filter[key]}%` } });
    }
  }

  import db from "../config/database.js";
import Order from "../models/order.js";
import Pengujian from "../models/pengujian.js";
import Status from "../models/status.js";
import Users from "../models/user.js";
import { handleResponseSuccess } from "../utils/handleResponse.js";

export const CreateOrder = async (req, res) => {
  const t = await db.transaction();
  try {
    const order = await Order.create(
      {
        total_price: "15000000",
        UserId: "33ef6651-0075-4675-88e0-0d488111a5cd",
        status: {
          status_persetujuan: "2",
        },
      },
      {
        include: [{ model: Status, as: "status" }],
      },
      { transaction: t }
    );

    const result = await Order.findByPk(order.id, {
      include: [{ model: Status, as: "status" }],
    });

    // const createOrder = await Order.create(
    //   {
    //     total_price: "15000000",
    //     UserId: "33ef6651-0075-4675-88e0-0d488111a5cd",
    //     status: {
    //       status_persetujuan: "2",
    //     },
    //     Pengujian: [
    //       "2d4e283a-5c99-4761-a4a4-e3c435f23772",
    //       "ab68f3c6-70df-4891-8d7c-29819abefee4",
    //     ],
    //   },
    //   {
    //     include: [{ model: Status, as: "status" }, { model: Pengujian }],
    //   },
    //   { transaction: t }
    // );

    await t.commit();

    return handleResponseSuccess(res, result);
  } catch (error) {
    console.log(error);
  }
};


export const getOrderById = async (req, res) => {
  try {
    const getOrderbyIdUser = await Order.findAll({
      include: [
        {
          model: Users,
          where: {
            id: "33ef6651-0075-4675-88e0-0d488111a5cd",
          },
        },
        { model: Status, as: "status" },
      ],
    });

    return handleResponseSuccess(res, getOrderbyIdUser);
  } catch (error) {
    console.log(error);
  }
};
