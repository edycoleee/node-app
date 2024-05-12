//src/middleware/auth-middleware.js
import { query } from "../util/db.js";

export const authMiddleware = async (req, res, next) => {
  //1. Mengambil token dari request header 'Authorization'
  const token = req.get('Authorization');
  console.log("token :", token);
  //2. jika tidak mengirim token maka dianggap >> response 401, Unauthorized
  if (!token) {
    return res.status(401).json({ errors: "Unauthorized" }).end();
  }

  //3. jika ada token maka lakukan proses dibawah
  try {
    // Cari user berdasarkan token di database
    const user = await query('SELECT * FROM users WHERE token = ?', [token]);
    if (user.length === 0) {
      // Jika user tidak ditemukan, kirim response 401 Unauthorized
      return res.status(401).json({ errors: "Unauthorized" }).end();
    } else {
      // Jika user ditemukan, attach data user ke request object dan lanjutkan ke middleware berikutnya
      req.user = user[0];
      return next();
    }
  } catch (error) {
    // Tangani error dari database query
    console.error("Error:", error);
    return res.status(500).json({ errors: "Internal Server Error" }).end();
  }

}