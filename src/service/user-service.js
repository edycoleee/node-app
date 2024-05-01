//src/service/user-service.js
import { ResponseError } from "../error/response-error.js";
import { query } from "../util/db.js";
import { getUserValidation, loginUserValidation, registerUserValidation, updateUserValidation } from "../validation/user-validation.js";
import { validate } from "../validation/validation.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

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
  //7. return value sebagai response body
  return rows[0]
}

const login = async (request) => {
  //1. cek validation >> jika error maka kirim pesan error, atau jika sesuai lanjutkan no.2
  const loginRequest = validate(loginUserValidation, request);

  //2. Get username di database
  let user = await query('SELECT * FROM users WHERE username = ?', [loginRequest.username])
  //3. Cek jika username tdk ada / === 0 maka kirim error 401, user dn password salah
  if (user.length === 0) {
    throw new ResponseError(401, "Username or password wrong");
  }
  console.log("user : ", user);

  //4. Cek Passord sesuai dengan yang tersimpan
  const isPasswordValid = await bcrypt.compare(loginRequest.password, user[0].password);
  if (!isPasswordValid) {
    throw new ResponseError(401, "Username or password wrong");
  }
  console.log("isPasswordValid :", isPasswordValid);
  //5. buat token dan update ke tabel user
  const token = uuid().toString()

  await query('UPDATE users SET token = ? WHERE username = ?', [token, user[0].username]);
  //6. Get username di database >> kirim token sebagai response
  user = await query('SELECT * FROM users WHERE username = ?', [user[0].username])
  const tokenUser = user[0].token
  return {
    token: tokenUser
  }
}

// username >> berasal dari middleware
const get = async (username) => {
  username = validate(getUserValidation, username);
  //2. Get username di database
  let user = await query('SELECT username,name FROM users WHERE username = ?', [username])
  //3. Cek jika username tdk ada / === 0 maka kirim error 401, user dn password salah
  if (user.length === 0) {
    throw new ResponseError(401, "Username or password wrong");
  }
  console.log("user :", user);
  return user[0];
}

const update = async (request) => {
  const user = validate(updateUserValidation, request);

  //2. Get username di database
  const DataUser = await query('SELECT username,name FROM users WHERE username = ?', [user.username])
  //3. Cek jika username tdk ada / === 0 maka kirim error 401, user dn password salah
  if (DataUser.length === 0) {
    throw new ResponseError(404, "user is not found");
  }
  console.log("DataUser :", DataUser);

  const data = {};
  if (user.name) {
    data.name = user.name;
  }
  if (user.password) {
    data.password = await bcrypt.hash(user.password, 10);
  }
  console.log("data :", data);
  // Buat string query update
  const updateQuery = 'UPDATE users SET ' + Object.keys(data).map(key => `${key} = ?`).join(', ') + ' WHERE username = ?';
  const updateValues = [...Object.values(data), user.username];

  //5. buat user baru ke database
  await query(updateQuery, updateValues);
  //6. Get username di database
  const rows = await query('SELECT username,name FROM users WHERE username = ?', [user.username])
  //tampilkan hasilnya di log
  console.log(`POST NEW DATA: ${JSON.stringify(rows)}`);
  return rows[0]

}

const logout = async (username) => {
  console.log("username : ", username);
  username = validate(getUserValidation, username);
  //2. Get username di database
  const DataUser = await query('SELECT username,name FROM users WHERE username = ?', [username])
  //3. Cek jika username tdk ada / === 0 maka kirim error 401, user dn password salah
  if (DataUser.length === 0) {
    throw new ResponseError(404, "user is not found");
  }
  console.log("DataUser :", DataUser);

  await query('UPDATE users SET token = ? WHERE username = ?', [null, username]);
  //6. Get username di database >> kirim token sebagai response
  const user = await query('SELECT * FROM users WHERE username = ?', [username])

  return {
    username: user[0].username
  }
}

export default {
  register,
  login,
  get,
  update,
  logout
}