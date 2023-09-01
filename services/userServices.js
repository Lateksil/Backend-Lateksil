const Users = require("../models/user.js");
const { handleResponseNotFound, handleResponseUpdateSuccess } = require("../utils/handleResponse.js");

exports.updateUserByIdServices = async (res, userId, full_name) => {
  const parseId = parseInt(userId);
  const user = await Users.findByPk(parseId);

  if (!user) {
    return handleResponseNotFound(res);
  }

  if (user.id === parseId) {
    await Users.update(
      {
        full_name,
      },
      { where: { id: parseId } }
    );
    return handleResponseUpdateSuccess(res);
  } else {
    return handleResponseNotFound(res);
  }
};
