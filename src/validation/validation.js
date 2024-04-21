//validation/validation.js
import { ResponseError } from "../error/response-error.js";


//callback >> validate = (schema, callback){ >> schema.validate.error/value }
const validate = (schema, request) => {
  const result = schema.validate(request, {
    abortEarly: false,
    allowUnknown: false
  })
  //jika result.error = true >> kirim status 400 dan pesan error
  if (result.error) {
    throw new ResponseError(400, result.error.message);
    //jika result.error = false >> kirim result.value >> true
  } else {
    return result.value;
  }
}

export {
  validate
}