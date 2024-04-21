//src/service/user-service.js
import { ResponseError } from "../error/response-error.js";
import { query } from "../util/db.js";
import { registerUserValidation } from "../validation/user-validation.js";
import { validate } from "../validation/validation.js";
import bcrypt from "bcrypt";


const register = async (request) => {

  //1. cek validation >> jika error maka kirim pesan error, atau jika sesuai lanjutkan no.2
  const user = validate(registerUserValidation, request);

  console.log("DATA VALIDATE:", user);
  //2. Get username di database
  const countUser = await query('SELECT * FROM users WHERE username = ?', [user.username])
  //3. Cek jika username sudah ada / === 1 maka kirim error 400, user sudah ada
  //jika countUser = 0 atau belum ada maka lanjutkan no.4
  console.log("countUser:", countUser.length);
  if (countUser.length === 1) {
    throw new ResponseError(400, "Username already exists");
  }

  //4. encrypt dg bcrypt password agar tidak terlihat langsung di database
  user.password = await bcrypt.hash(user.password, 10);

  console.log("DATA POST:", user.username, user.password, user.name);
  //5. buat user baru ke database
  await query('INSERT INTO users (username,password,name,token) VALUES (?, ?, ?,?)', [user.username, user.password, user.name, ""]);

  //6. Get username di database
  const rows = await query('SELECT * FROM users WHERE username = ?', [user.username])
  //tampilkan hasilnya di log
  console.log(`POST NEW DATA: ${JSON.stringify(rows)}`);

  return rows[0]
}

export default {
  register,
}