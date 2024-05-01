//src/controller//user-controller.js
import userService from "../service/user-service.js";


const register = async (req, res, next) => {
  console.log("REQUEST : ", req.body);
  try {
    //1. Kirim request dari router ke service
    const result = await userService.register(req.body);
    //2. Hasil service kirim sebagai response data
    res.status(200).json({
      data: result
    });
    //3. Tangkap error kirim sebagai response error
  } catch (e) {
    next(e);
  }
}

const login = async (req, res, next) => {
  try {
    const result = await userService.login(req.body);
    res.status(200).json({
      data: result
    });
  } catch (e) {
    next(e);
  }
}

const get = async (req, res, next) => {
  try {
    //setelah menjalankan aut-middleware dg token yg dikirim maka akan mendapatkan username
    console.log("req.user.username :", req.user.username);
    const username = req.user.username;
    //dengan username maka akan mendapatkan nama name
    const result = await userService.get(username);
    res.status(200).json({
      data: result
    });
  } catch (e) {
    next(e);
  }
}

const update = async (req, res, next) => {
  try {
    //setelah menjalankan aut-middleware dg token yg dikirim maka akan mendapatkan username
    const username = req.user.username;
    //mengambil data body untuk update data ke tabel database
    const request = req.body;
    request.username = username;

    const result = await userService.update(request);
    res.status(200).json({
      data: result
    });
  } catch (e) {
    next(e);
  }
}

const logout = async (req, res, next) => {
  try {
    await userService.logout(req.user.username);
    console.log("LOGOUT");
    res.status(200).json({
      data: "OK"
    });
  } catch (e) {
    next(e);
  }
}

export default {
  register,
  login,
  get,
  update,
  logout
}