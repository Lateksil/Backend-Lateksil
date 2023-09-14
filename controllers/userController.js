const fs = require("fs");
const Users = require("../models/user.js");
const { handlePagination } = require("../utils/handlePagination.js");
const {
  handleResponseDeleteSuccess,
  handleResponseError,
  handleResponseNotFound,
  handleResponseSuccess,
  handleResponseUpdateSuccess,
} = require("../utils/handleResponse.js");
const { Op } = require("sequelize");

// UPDATE USER PER ID
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { full_name, no_whatsapp, email, address } = req.body;

  try {
    const user = await Users.findByPk(id);

    if (!user) {
      return handleResponseNotFound(res);
    }

    console.log(user);

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
  return handlePagination(req, res, viewData, searchFilterData, Users);
};

exports.AllCostumer = async (req, res) => {
  const { page = 1, limit = 10, search = "" } = req.body;

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
    [key]: { [Op.like]: `%${search}%` },
  }));

  console.log(searchUser);

  try {
    const { count, rows } = await Users.findAndCountAll({
      where: {
        [Op.and]: [
          {
            [Op.or]: searchUser,
          },
          { role: "user" },
          { isVerified: true },
        ],
      },
      offset,
      limit: parseInt(limit, 10),
      order: [["updatedAt", "DESC"]],
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
