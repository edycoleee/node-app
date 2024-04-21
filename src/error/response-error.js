//src/error/response-error.js
function createResponseError(status, message) {
  const error = new Error(message);
  error.status = status;
  return error;
}

export { createResponseError };
//const error = createResponseError(404, "Not Found");
