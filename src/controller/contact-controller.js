import contactService from "../service/contact-service.js";

const create = async (req, res, next) => {
  try {
    //1. ambil user = request user dari middleware
    const user = req.user;
    //2. ambil request dari request.body
    const request = req.body;
    //3. jalankan service dengan mengirim 2 variable tadi
    const result = await contactService.create(user, request);
    res.status(200).json({
      data: result
    })
  } catch (e) {
    next(e);
  }
}

const get = async (req, res, next) => {
  try {
    //1. ambil user = request user dari middleware
    const user = req.user;
    //2. ambil id dari request.params
    const contactId = req.params.contactId;
    //3. jalankan service dengan mengirim 2 variable tadi
    const result = await contactService.get(user, contactId);
    res.status(200).json({
        data: result
    })
  } catch (e) {
    next(e);
  }
}

const update = async (req, res, next) => {
  try {

  } catch (e) {
    next(e);
  }
}

const remove = async (req, res, next) => {
  try {

  } catch (e) {
    next(e);
  }
}

const search = async (req, res, next) => {
  try {

  } catch (e) {
    next(e);
  }
}

export default {
  create,
  get,
  update,
  remove,
  search
}