//src/error/response-error.js

//tidak bisa menggunakn fuction untuk mencari instane off
//wajib menggunakan class
// function ResponseError(status, message) {
//   const error = new Error(message);
//   error.status = status;
//   return error;
// }

// export { ResponseError };
// //const error = ResponseError(404, "Not Found");


class ResponseError extends Error {

  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

export {
  ResponseError
}