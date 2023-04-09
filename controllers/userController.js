import Users from "../models/user.js";
import { updateUserByIdServices } from "../services/userServices.js";
import { handlePagination } from "../utils/handlePagination.js";
import {
  handleResponseDeleteSuccess,
  handleResponseError,
  handleResponseNotFound,
  handleResponseSuccess,
  handleResponseUpdateSuccess,
} from "../utils/handleResponse.js";

//UPDATE USER PER ID
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { full_name } = req.body;

  try {
    const user = await Users.findByPk(id);
    console.log(user);
    if (!user) {
      return handleResponseNotFound(res);
    }

    if (user.id === id) {
      await Users.update(
        {
          full_name,
        },
        { where: { id } }
      );
      return handleResponseUpdateSuccess(res);
    } else {
      return handleResponseNotFound(res);
    }
  } catch (error) {
    console.log(error);
    return handleResponseError(res);
  }
};

export const deleteUser = async (req, res) => {
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

//GET ALL USER AND PAGINATION
export const AllUsers = async (req, res) => {
  const viewData = [
    "id",
    "full_name",
    "email",
    "company_name",
    "no_whatsapp",
    "address",
  ];

  const searchFilterData = [
    "id",
    "full_name",
    "email",
    "company_name",
    "no_whatsapp",
    "address",
  ];
  return handlePagination(req, res, viewData, searchFilterData, Users);
};

//GET INFO USER
export const infoUser = async (req, res) => {
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
