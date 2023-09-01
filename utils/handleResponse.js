exports.handleResponse = (res, statusCode, message, newdata) => {
  res.status(statusCode).json({
    status: statusCode,
    message,
    data: newdata || null,
  });
};

exports.handleResponseAuthorization = (res, statusCode, message) => {
  res.status(statusCode).json({
    status: statusCode,
    message,
  });
};

exports.handleResponseSuccess = (res, data) => {
  res.status(200).json({
    status: 200,
    message: 'Success',
    data: data,
  });
};

exports.handleResponseUpdateSuccess = (res, data) => {
  res.status(200).json({
    status: 200,
    message: 'Update successfully',
    data: data,
  });
};

exports.handleResponseDeleteSuccess = (res) => {
  res.status(204).json({
    status: 204,
    message: 'Deleted successfully',
  });
};

exports.handleResponseError = (res) => {
  res.status(500).json({
    status: 500,
    message: 'Terjadi Kesalahan Pada Server',
  });
};

exports.handleResponseNotFound = (res) => {
  res.status(404).json({
    status: 404,
    message: 'Data Not Found!',
  });
};
