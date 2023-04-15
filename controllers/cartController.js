import Cart from "../models/cart.js";
import Pengujian from "../models/pengujian.js";
import {
  createCartServices,
  deleteCartServices,
} from "../services/cartServices.js";
import {
  handleResponseDeleteSuccess,
  handleResponseError,
  handleResponseSuccess,
} from "../utils/handleResponse.js";

export const createCart = async (req, res) => {
  const { user_id } = req.body;
  const { pengujian_id, quantity } = req.body;

  try {
    const cart = await createCartServices(res, user_id, pengujian_id, quantity);
    return handleResponseSuccess(res, cart);
  } catch (error) {
    console.log(error);
    return handleResponseError(res);
  }
};

export const deleteCart = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await deleteCartServices(res, id);
    if (deleted) {
      return handleResponseDeleteSuccess(res);
    }
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
      attributes: ["id", "quantity"],
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

    return handleResponseSuccess(res, cart);
  } catch (error) {
    console.log(error);
    return handleResponseError(res);
  }
};
