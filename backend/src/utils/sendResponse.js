export const sendResponse = (res, statusCode, success, message, data = null, pagination = null) => {
  const response = {
    success,
    message,
  };

  if (data !== null) {
    response.data = data;
  }

  if (pagination) {
    response.pagination = pagination;
  }

  res.status(statusCode).json(response);
};
