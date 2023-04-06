export const handleResponse = (res, statusCode, message, data) => {
  res.status(statusCode).json({
    status: statusCode,
    message,
    data: data || null,
  });
};

export const handleResponseAuthorization = (res, statusCode, message) => {
  res.status(statusCode).json({
    status: statusCode,
    message,
  });
};

export const handleResponseSuccess = (res, data) => {
  res.status(200).json({
    status: 200,
    message: "Success",
    data: data,
  });
};

export const handleResponseUpdateSuccess = (res, data) => {
  res.status(200).json({
    status: 200,
    message: "Update successfully",
    data: data,
  });
};

export const handleResponseDeleteSuccess = (res) => {
  res.status(204).json({
    status: 204,
    message: "Deleted successfully",
  });
};

export const handleResponseError = (res) => {
  res.status(500).json({
    status: 500,
    message: "Terjadi Kesalahan Pada Server",
  });
};
export const handleResponseNotFound = (res) => {
  res.status(404).json({
    status: 404,
    message: "Data Not Found!",
  });
};
