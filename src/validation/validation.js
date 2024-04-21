//validation/validation.js
import { createResponseError } from "../error/response-error.js";


//callback >> validate = (schema, callback){ >> schema.validate.error/value }
const validate = (schema, request) => {
  const result = schema.validate(request, {
    abortEarly: false,
    allowUnknown: false
  })
  //jika result.error = true >> kirim status 400 dan pesan error
  if (result.error) {
    throw new createResponseError(400, result.error.message);
    //jika result.error = false >> kirim result.value >> true
  } else {
    return result.value;
  }
}

export {
  validate
}