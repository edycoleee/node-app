//src/controller//contoh-controller.js
import contohService from "../service/contoh-service.js";

const contoh = async (req, res, next) => {
  console.log("REQUEST CONTROLLER : ", req.body);
  try {
    //1. Kirim request dari router ke service
    const result = await contohService.contoh(req.body);
    //2. Hasil service kirim sebagai response data
    res.status(200).json({
      data: result
    });
    //3. Tangkap error kirim sebagai response error
  } catch (e) {
    next(e);
  }
}

export default {
  contoh
}