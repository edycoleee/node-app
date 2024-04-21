//src/middleware/error-middleware.js
import { createResponseError } from "../error/response-error.js";


const errorMiddleware = async (err, req, res, next) => {
  //1. jika tidak error maka next lanjutkan
  if (!err) {
    next();
    return;
  }

  //2. jika error dari response error maka tampilkan status dan pesannya
  if (err instanceof createResponseError) {
    res.status(err.status).json({
      errors: err.message
    }).end();

    // Jika pesan error validation kirim error validation
    //else if (err instanceof ValidationError) {
    //  res.status(400).json({
    //    errors: err.message
    //  })
    //}

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