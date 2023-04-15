import db from "../config/database.js";
import Order from "../models/order.js";
import Status from "../models/status.js";
import Users from "../models/user.js";
import { handleResponseSuccess } from "../utils/handleResponse.js";

export const CreateOrder = async (req, res) => {
  const t = await db.transaction();
  try {
    const createOrder = await Order.create(
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

    await t.commit();

    return handleResponseSuccess(res, createOrder);
  } catch (error) {
    console.log(error);
  }
};

export const getOrderById = async (req, res) => {
  try {
    const getOrderbyIdUser = await Order.findAll({
      where: {
        UserId: "33ef6651-0075-4675-88e0-0d488111a5cd",
      },
      include: [
        {
          model: Users,
        },
        { model: Status, as: "status" },
      ],
    });

    return handleResponseSuccess(res, getOrderbyIdUser);
  } catch (error) {
    console.log(error);
  }
};
