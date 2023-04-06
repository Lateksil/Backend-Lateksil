import Users from "../models/user.js";
import { handleResponseNotFound } from "../utils/handleResponse.js";

export const updateUserByIdServices = async (res, userId, full_name) => {
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
