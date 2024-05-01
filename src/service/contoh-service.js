//src/service/contoh-service.js
import { ResponseError } from "../error/response-error.js";
import { postContohValidation } from "../validation/contoh-validation.js";
import { validate } from "../validation/validation.js";

//contoh alur service pada public api
const contoh = async (request) => {
  //1. VALIDASI >> jika error maka kirim pesan error, atau jika sesuai lanjutkan no.2
  //yang di validasi : request body >> username
  const user = validate(postContohValidation, request.username);
  console.log("DATA VALIDATE:", user);
  //2a. LOGIKA PROGRAM jika username tdk edy maka kirim Response Body Error
  if (user != "edy") {
    throw new ResponseError(400, "Username not edy");
  }
  //2b. LOGIKA PROGRAM jika username edy maka kirim response Body Success
  return {
    username: user,
    name: "edy kholid"
  }
}

export default {
  contoh
}