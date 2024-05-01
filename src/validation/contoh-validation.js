//src/validation/contoh-validation.js
import Joi from "joi";

//Validasi username pada POST /api/contoh/public
const postContohValidation = Joi.string().max(100).required();

export {
  postContohValidation,
}