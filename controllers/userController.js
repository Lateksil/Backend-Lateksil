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
