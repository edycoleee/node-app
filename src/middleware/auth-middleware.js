//src/middleware/auth-middleware.js
import { query } from "../util/db.js";

export const authMiddleware = async (req, res, next) => {
  //1. mengambil token dari request body 'Authorization'
  const token = req.get('Authorization');
  console.log("token :", token);
  //2. jika tidak mengirim token maka dianggap >> response 401, Unauthorized
  if (!token) {
    res.status(401).json({
      errors: "Unauthorized"
    }).end();
  } else {
    //jika ada token >> cari token di tabel database
    const user = await query('SELECT * FROM users WHERE token = ?', [token])
    console.log("user : ", user);
    //jika tdk ditemukan maka user tidak ada >> response 401, Unauthorized
    if (user.length === 0) {
      res.status(401).json({
        errors: "Unauthorized"
      }).end();
    } else {
      //jika user ditemukan maka kirim data user ke proses berikutnya
      req.user = user[0];
      next();
    }
  }
}