const fs = require("fs");
const { Op } = require("sequelize");
const Pengujian = require("../models/pengujian.js");
const {
  createPengujianServices,
  deletePengujianServices,
} = require("../services/pengujianServices.js");
const {
  handleResponseDeleteSuccess,
  handleResponseError,
  handleResponseNotFound,
  handleResponseSuccess,
  handleResponseUpdateSuccess,
} = require("../utils/handleResponse.js");

exports.createPengujian = async (req, res) => {
  const {
    jenis_pengujian,
    code,
    category,
    tempat_pengujian,
    description,
    min_quantity,
    sampler,
    catatan_khusus,
    price,
  } = req.body;
  const image = req.file ? req.file.filename : null;

  try {
    const pengujian = await createPengujianServices(
      image,
      jenis_pengujian,
      code,
      category,
      tempat_pengujian,
      description,
      min_quantity,
      sampler,
      catatan_khusus,
      price
    );
    return handleResponseSuccess(res, pengujian);
  } catch (error) {
    return handleResponseError(res);
  }
};

exports.updatePengujian = async (req, res) => {
  const { id } = req.params;
  const {
    jenis_pengujian,
    code,
    category,
    tempat_pengujian,
    description,
    min_quantity,
    sampler,
    catatan_khusus,
    price,
  } = req.body;

  try {
    const pengujian = await Pengujian.findByPk(id);

    if (!pengujian) {
      return handleResponseNotFound(res);
    }

    if (req.file) {
      if (pengujian.image !== null) {
        fs.unlinkSync(`uploads/pengujian/${pengujian.image}`);
      }
    }

    await Pengujian.update(
      {
        jenis_pengujian,
        code,
        category,
        tempat_pengujian,
        description,
        min_quantity,
        sampler,
        catatan_khusus,
        price,
        image: req.file ? req.file.filename : pengujian.image,
      },
      {
        where: { id: id },
      }
    );
    return handleResponseUpdateSuccess(res);
  } catch (error) {
    console.log(error);
    return handleResponseError(res);
  }
};

exports.deletePengujian = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await deletePengujianServices(id);
    if (deleted) {
      return handleResponseDeleteSuccess(res);
    } else {
      return handleResponseNotFound(res);
    }
  } catch (error) {
    return handleResponseError(res);
  }
};

exports.getAllPengujian = async (req, res) => {
  const { page = 1, limit = 10, search = "", filter = {} } = req.body;

  const offset = (page - 1) * limit;

  const viewData = [
    "id",
    "image",
    "jenis_pengujian",
    "code",
    "category",
    "description",
    "tempat_pengujian",
    "min_quantity",
    "sampler",
    "catatan_khusus",
    "price",
  ];

  const searchFilterData = [
    "jenis_pengujian",
    "code",
    "category",
    "description",
    "tempat_pengujian",
    "min_quantity",
    "sampler",
    "catatan_khusus",
    "price",
  ];

  let whereClause = {};

  if (search !== "") {
    const searchCriteria = searchFilterData.map((key) => ({
      [key]: { [Op.like]: `%${search}%` },
    }));

    whereClause = {
      [Op.or]: searchCriteria,
    };
  }

  for (let key in filter) {
    if (filter.hasOwnProperty(key) && filter[key] !== "") {
      whereClause[key] = { [Op.like]: `%${filter[key]}%` };
    }
  }

  try {
    const { count, rows } = await Pengujian.findAndCountAll({
      where: whereClause,
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

exports.getPengujianById = async (req, res) => {
  const { id } = req.params;
  try {
    const pengujian = await Pengujian.findByPk(id, {
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    if (!pengujian) {
      return handleResponseNotFound(res);
    }

    return handleResponseSuccess(res, pengujian);
  } catch (error) {
    return handleResponseError(res);
  }
};

exports.getAllPengujianClient = async (req, res) => {
  const { page = 1, limit = 10, search = "", filter = {} } = req.body;

  const offset = (page - 1) * limit;

  const viewData = [
    "id",
    "image",
    "jenis_pengujian",
    "code",
    "category",
    "tempat_pengujian",
    "min_quantity",
    "sampler",
    "price",
  ];

  const searchFilterData = [
    "jenis_pengujian",
    "code",
    "category",
    "tempat_pengujian",
    "min_quantity",
    "sampler",
    "price",
  ];

  let whereClause = {};

  if (search !== "") {
    const searchCriteria = searchFilterData.map((key) => ({
      [key]: { [Op.like]: `%${search}%` },
    }));

    whereClause = {
      [Op.or]: searchCriteria,
    };
  }

  for (let key in filter) {
    if (filter.hasOwnProperty(key) && filter[key] !== "") {
      whereClause[key] = { [Op.like]: `%${filter[key]}%` };
    }
  }

  try {
    const { count, rows } = await Pengujian.findAndCountAll({
      where: whereClause,
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

exports.getPengujianById = async (req, res) => {
  const { id } = req.params;
  try {
    const pengujian = await Pengujian.findByPk(id, {
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    if (!pengujian) {
      return handleResponseNotFound(res);
    }

    return handleResponseSuccess(res, pengujian);
  } catch (error) {
    return handleResponseError(res);
  }
};
