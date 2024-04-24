//src/controller//user-controller.js
import userService from "../service/user-service.js";


const register = async (req, res, next) => {
  console.log("REQUEST : ", req.body);
  try {
    const result = await userService.register(req.body);
    res.status(200).json({
      data: result
    });
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

export default {
  register,
  login
}