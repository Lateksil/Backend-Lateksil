const fs = require("fs");
const Users = require("../models/user.js");
const {
  handleResponseDeleteSuccess,
  handleResponseError,
  handleResponseNotFound,
  handleResponseSuccess,
  handleResponseUpdateSuccess,
  handleResponseAuthorization,
} = require("../utils/handleResponse.js");
const { Op } = require("sequelize");
const Order = require("../models/order.js");
const Status = require("../models/status.js");

// UPDATE USER PER ID
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { full_name, no_whatsapp, email, address } = req.body;

  try {
    const user = await Users.findByPk(id);

    if (!user) {
      return handleResponseNotFound(res);
    }

    if (req.file) {
      if (user.image_profile !== null) {
        fs.unlinkSync(`uploads/profile/${user.image_profile}`);
      }
    }

    await Users.update(
      {
        full_name,
        no_whatsapp,
        email,
        address,
        image_profile: req.file ? req.file.filename : user.image_profile,
      },
      { where: { id: id } }
    );
    return handleResponseUpdateSuccess(res);
  } catch (error) {
    console.log(error);
    return handleResponseError(res);
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Users.findByPk(id);

    if (!user) {
      return handleResponseNotFound(res);
    }

    if (user.id === id) {
      await user.destroy();
      return handleResponseDeleteSuccess(res);
    } else {
      return handleResponseNotFound(res);
    }
  } catch (error) {
    return handleResponseError(res);
  }
};

// GET ALL USER AND PAGINATION
exports.AllUsers = async (req, res) => {
  const { page = 1, limit = 10, search = "", role = "" } = req.body;

  const offset = (page - 1) * limit;

  const viewData = [
    "id",
    "full_name",
    "email",
    "company_name",
    "no_whatsapp",
    "address",
    "isActive_payment",
    "image_profile",
    "role",
  ];

  const searchFilterData = [
    "full_name",
    "email",
    "company_name",
    "no_whatsapp",
    "address",
    "isActive_payment",
    "role",
  ];

  const searchUser = searchFilterData.map((key) => ({
    [key]: { [Op.iLike]: `%${search}%` },
  }));

  try {
    const { count, rows } = await Users.findAndCountAll({
      where: {
        [Op.and]: [
          {
            [Op.or]: searchUser,
          },
          { isVerified: true },
          {
            role: {
              [Op.like]: `%${role}%`,
            },
          },
        ],
      },
      offset,
      limit: parseInt(limit, 10),
      order: [["company_name", "ASC"]],
      attributes: viewData,
    });

    if (rows.length === 0) {
      return handleResponseSuccess(res, null);
    }

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
    return handleResponseError(res);
  }
};

exports.AllCostumer = async (req, res) => {
  const { page = 1, limit = 10, search = "", isActive_payment = "" } = req.body;

  const offset = (page - 1) * limit;

  const viewData = [
    "id",
    "full_name",
    "email",
    "company_name",
    "no_whatsapp",
    "address",
    "isActive_payment",
    "image_profile",
  ];

  const searchFilterData = [
    "full_name",
    "email",
    "company_name",
    "no_whatsapp",
    "address",
    "isActive_payment",
  ];

  const searchUser = searchFilterData.map((key) => ({
    [key]: { [Op.iLike]: `%${search}%` },
  }));

  try {
    const { count, rows } = await Users.findAndCountAll({
      where: {
        [Op.and]: [
          {
            [Op.or]: searchUser,
          },
          { role: "user" },
          { isVerified: true },
          {
            isActive_payment: {
              [Op.like]: `%${isActive_payment}%`,
            },
          },
        ],
      },
      offset,
      limit: parseInt(limit, 10),
      order: [["company_name", "ASC"]],
      attributes: viewData,
      include: [
        {
          model: Order,
          attributes: ["id", "total_price"],
        },
      ],
    });

    if (rows.length === 0) {
      return handleResponseSuccess(res, null);
    }

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
    return handleResponseError(res);
  }
};

// GET INFO USER
exports.infoUser = async (req, res) => {
  const userEmail = req.params.email;

  try {
    const infoUser = await Users.findOne({
      where: { email: userEmail },
      attributes: { exclude: ["password"] },
    });
    if (!infoUser) {
      return handleResponseNotFound(res);
    }
    return handleResponseSuccess(res, infoUser);
  } catch (error) {
    return handleResponseError(res);
  }
};

exports.updateRoleUser = async (req, res) => {
  const { id, role } = req.body;
  try {
    const user = await Users.findByPk(id);

    if (!user) {
      return handleResponseNotFound(res);
    }

    await Users.update(
      {
        role,
      },
      {
        where: { id: id },
      }
    );

    return handleResponseAuthorization(
      res,
      200,
      "Perubahan Izin Role Akses Berhasil"
    );
  } catch (error) {
    return handleResponseError(res);
  }
};
