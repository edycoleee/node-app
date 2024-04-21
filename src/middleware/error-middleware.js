//src/middleware/error-middleware.js
import { ResponseError } from "../error/response-error.js";

const errorMiddleware = async (err, req, res, next) => {
  console.log("ERROR :", err);
  console.log(err instanceof ResponseError);
  console.log(err.constructor);
  console.log(err.constructor.name);
  //1. jika tidak error maka next lanjutkan
  if (!err) {
    next();
    return;
  }

  //2. jika error dari response error maka tampilkan status dan pesannya
  if (err instanceof ResponseError) {
    res.status(err.status).json({
      errors: err.message
    }).end();

    //3. jika error selain itu maka kirim status 500 dan pesan error
  } else {
    res.status(500).json({
      errors: err.message
    }).end();
  }
}

export {
  errorMiddleware
}