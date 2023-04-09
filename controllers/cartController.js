import Cart from "../models/cart.js";
import Pengujian from "../models/pengujian.js";
import Users from "../models/user.js";
import { handleResponseError } from "../utils/handleResponse.js";

export const createCart = async (req, res) => {
  const { user_id } = req.body;
  const { pengujian_id } = req.body;

  try {
    const user = await Users.findByPk(user_id);

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const pengujian = await Pengujian.findByPk(pengujian_id);

    if (!pengujian) {
      return res.status(404).json({ message: "Pengujian not found" });
    }

    const cart = await Cart.create({
      UserId: user_id,
      PengujianId: pengujian_id,
      quantity: "1",
    });

    return res.status(200).json({ message: "Ada coy", cart });
  } catch (error) {
    console.log(error);
    return handleResponseError(res);
  }
};

export const getCartByUserId = async (req, res) => {
  const { user_id } = req.body;
  try {
    const cart = await Cart.findAll({
      where: {
        UserId: user_id,
      },
      attributes: ["id", "quantity", "createdAt"],
      include: [
        {
          model: Pengujian,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
    });

    return res.status(200).json({ message: "Ada coy", data: cart });
  } catch (error) {
    console.log(error);
    return handleResponseError(res);
  }
};
