const { Op } = require('sequelize');
const {
  handleResponseError,
  handleResponseSuccess,
} = require('./handleResponse.js');

exports.handlePagination = async (
  req,
  res,
  attribute,
  allSearch,
  data,
  orderBy = 'DESC'
) => {
  const { page = 1, limit = 10, search, filter = {} } = req.body;

  const offset = (page - 1) * limit;

  let whereClause = {};

  const viewAttributeData = attribute;

  if (search !== '') {
    const searchCriteria = allSearch.map((key) => ({
      [key]: { [Op.like]: `%${search}%` },
    }));

    whereClause = {
      [Op.or]: searchCriteria,
    };
  }

  for (let key in filter) {
    if (filter.hasOwnProperty(key) && filter[key] !== '') {
      whereClause[key] = { [Op.like]: `%${filter[key]}%` };
    }
  }

  try {
    const { count, rows } = await data.findAndCountAll({
      where: whereClause,
      offset,
      limit: parseInt(limit, 10),
      order: [['updatedAt', orderBy]],
      attributes: viewAttributeData,
    });

    if (rows.length === 0) {
      return handleResponseSuccess(res, null);
    }

    return res.status(200).json({
      status: 200,
      error: false,
      message: 'success',
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
