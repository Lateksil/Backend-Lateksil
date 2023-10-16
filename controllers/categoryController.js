const Category = require("../models/category.js");
const {
  createCategoryServices,
  deleteCategoryServices,
  updateCategoryServices,
} = require("../services/categoryServices.js");
const {
  handleResponseDeleteSuccess,
  handleResponseError,
  handleResponseNotFound,
  handleResponseSuccess,
  handleResponseUpdateSuccess,
} = require("../utils/handleResponse.js");

exports.createCategory = async (req, res) => {
  const { name_category } = req.body;

  try {
    const category = await createCategoryServices(name_category);
    return handleResponseSuccess(res, category);
  } catch (error) {
    console.log(error);
    return handleResponseError(res);
  }
};

exports.updateCategory = async (req, res) => {
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

exports.deleteCategory = async (req, res) => {
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

exports.getAllCategory = async (req, res) => {
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

exports.getAllCategoryClient = async (req, res) => {
  const { page = 1, limit = 10 } = req.body;

  const offset = (page - 1) * limit;

  try {
    const { count, rows } = await Category.findAndCountAll({
      offset,
      limit: parseInt(limit, 10),
      order: [["updatedAt", "ASC"]],
      attributes: ["name_category"],
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
