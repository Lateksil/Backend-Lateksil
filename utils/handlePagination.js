import { Op } from "sequelize";
import {
  handleResponseError,
  handleResponseNotFound,
} from "./handleResponse.js";

export const handlePagination = async (req, res, attribute, data) => {
  const { page = 1, limit = 10, filter = {} } = req.body;

  const offset = (page - 1) * limit;
  const where = {};

  const nameFilter = attribute;

  for (const key of nameFilter) {
    if (filter[key]) {
      if (!where[Op.or]) {
        where[Op.or] = [];
      }
      where[Op.or].push({ [key]: { [Op.iLike]: `%${filter[key]}%` } });
    }
  }

  try {
    const { count, rows } = await data.findAndCountAll({
      where,
      offset,
      limit: parseInt(limit, 10),
      attributes: attribute,
    });

    if (rows.length === 0) {
      return handleResponseNotFound(res);
    }

    return res.status(200).json({
      status: 200,
      error: false,
      message: "success",
      data: rows,
      limit,
      totalData: count,
      totalPages: Math.ceil(count / limit),
    });
  } catch (error) {
    return handleResponseError(res);
  }
};
