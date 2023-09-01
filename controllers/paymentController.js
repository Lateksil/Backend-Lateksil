const { Op } = require("sequelize");
const Item = require("../models/itemOrder.js");
const Order = require("../models/order.js");
const Payment = require("../models/payment.js");
const Pengujian = require("../models/pengujian.js");
const Project = require("../models/project.js");
const Status = require("../models/status.js");
const Users = require("../models/user.js");
const {
  handleResponseAuthorization,
  handleResponseError,
  handleResponseNotFound,
  handleResponseSuccess,
} = require("../utils/handleResponse.js");

exports.CreateUploadPayment = async (req, res) => {
  const { id_order, full_name, company_name, total_price } = req.body;
  const { filename } = req.file;

  try {
    const createPayment = await Payment.create({
      id: id_order,
      full_name,
      company_name,
      image_payment: filename,
      total_price,
    });

    const statusPayment = await Status.findByPk(id_order);

    if (statusPayment.id === id_order) {
      await Status.update(
        {
          status_payment: "1",
        },
        { where: { id: id_order } }
      );
    }

    return handleResponseSuccess(res, createPayment);
  } catch (error) {
    console.log(error);
    return handleResponseError(res);
  }
};

exports.uploadKwitansiToCostumer = async (req, res) => {
  const { id } = req.body;
  const { filename } = req.file;

  try {
    const payment = await Payment.findByPk(id);

    if (!payment) {
      return handleResponseNotFound(res);
    }

    if (payment.image_kwitansi !== null) {
      return handleResponseAuthorization(res, 404, "Kwitansi Sudah Terkirim");
    } else {
      await Payment.update(
        {
          image_kwitansi: filename,
        },
        {
          where: { id: id },
        }
      );

      const statusPayment = await Status.findByPk(id);

      if (!statusPayment) {
        return handleResponseNotFound(res);
      }

      if (statusPayment.id === id) {
        await Status.update(
          {
            accept_payment: "1",
            status_pengujian: "2",
          },
          { where: { id: id } }
        );
      }
      return handleResponseAuthorization(res, 200, "Upload Kwitansi Berhasil");
    }
  } catch (error) {
    console.log(error);
    return handleResponseError(res);
  }
};

exports.getAllOrderPayment = async (req, res) => {
  const {
    page = 1,
    limit = 10,
    search = "",
    accept_payment = "",
    status_payment = "1",
  } = req.body;

  let whereClauseUsers = {};

  const offset = (page - 1) * limit;

  const searchDataUsers = [
    "full_name",
    "email",
    "no_whatsapp",
    "address",
    "company_name",
  ];

  if (search !== "") {
    const searchUsers = searchDataUsers.map((user) => ({
      [user]: { [Op.iLike]: `%${search}%` },
    }));

    whereClauseUsers = {
      [Op.or]: searchUsers,
    };
  }

  try {
    const { count, rows } = await Order.findAndCountAll({
      offset,
      limit: parseInt(limit, 10),
      distinct: true,
      order: [["createdAt", "DESC"]],
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
          order: [["updatedAt", "DESC"]],
          where: {
            status_persetujuan: "2",
            accept_payment: {
              [Op.like]: `%${accept_payment}%`,
            },
            status_payment: {
              [Op.like]: `%${status_payment}%`,
            },
          },
          attributes: { exclude: ["createdAt"] },
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
      attributes: { exclude: ["UserId"] },
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

exports.getPaymentByIdOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const orderPayment = await Payment.findByPk(id);

    if (!orderPayment) {
      return handleResponseNotFound(res);
    }

    return handleResponseSuccess(res, orderPayment);
  } catch (error) {
    console.log(error);
    return handleResponseError(res);
  }
};