const Cart = require('../models/cart.js');
const Pengujian = require('../models/pengujian.js');
const {
  createCartServices,
  deleteCartServices,
} = require('../services/cartServices.js');
const {
  handleResponseDeleteSuccess,
  handleResponseError,
  handleResponseSuccess,
} = require('../utils/handleResponse.js');

exports.createCart = async (req, res) => {
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

exports.deleteCart = async (req, res) => {
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

exports.getCartByUserId = async (req, res) => {
  const { user_id } = req.body;
  try {
    const cart = await Cart.findAll({
      where: {
        UserId: user_id,
      },
      attributes: ['id', 'quantity', 'PengujianId'],
      include: [
        {
          model: Pengujian,
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
      ],
    });

    return handleResponseSuccess(res, cart);
  } catch (error) {
    console.log(error);
    return handleResponseError(res);
  }
};
