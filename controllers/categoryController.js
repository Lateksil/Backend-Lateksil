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

export const getAllCategory = (req, res) => {
  try {
    const viewData = ["id", "name_category"];
    return handlePagination(req, res, viewData, Category);
  } catch (error) {
    return handleResponseError(res);
  }
};
