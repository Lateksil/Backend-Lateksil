import { Op } from "sequelize";
import Category from "../models/category.js";
import {
  createCategoryServices,
  deleteCategoryServices,
  updateCategoryServices,
} from "../services/categoryServices.js";
import { handlePagination } from "../utils/handlePagination.js";
import {
  handleResponseDeleteSuccess,
  handleResponseError,
  handleResponseNotFound,
  handleResponseSuccess,
  handleResponseUpdateSuccess,
} from "../utils/handleResponse.js";

export const createCategory = async (req, res) => {
  const { name_category } = req.body;

  try {
    const category = await createCategoryServices(name_category);
    return handleResponseSuccess(res, category);
  } catch (error) {
    console.log(error);
    return handleResponseError(res);
  }
};

export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name_category } = req.body;
  try {
    const category = await updateCategoryServices(id, name_category);
    if (category) {
      return handleResponseUpdateSuccess(res);
    } else {
      return handleResponseNotFound(res);
    }
  } catch (error) {
    return handleResponseError(res);
  }
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await deleteCategoryServices(id);
    if (deleted) {
      return handleResponseDeleteSuccess(res);
    } else {
      return handleResponseNotFound(res);
    }
  } catch (error) {
    return handleResponseError(res);
  }
};

export const getAllCategory = async (req, res) => {
  const { page = 1, limit = 10 } = req.body;

  const offset = (page - 1) * limit;

  try {
    const { count, rows } = await Category.findAndCountAll({
      offset,
      limit: parseInt(limit, 10),
      order: [["updatedAt", "ASC"]],
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
