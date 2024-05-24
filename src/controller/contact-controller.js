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
    //1. ambil user = request user dari middleware
    const user = req.user;
    //2. ambil id dari request params
    const contactId = req.params.contactId;
    //3. ambil data dari requset body
    const request = req.body;
    //4. gabungkan semua di dalam satu request
    request.id = contactId;
    //3. jalankan service dengan mengirim user dan request
    const result = await contactService.update(user, request);
    res.status(200).json({
      data: result
    })
  } catch (e) {
    next(e);
  }
}

const remove = async (req, res, next) => {
  try {
    //1. ambil user = request user dari middleware
    const user = req.user;
    //2. ambil id dari request params
    const contactId = req.params.contactId;
    //3. jalankan service dengan mengirim user dan kontak id
    await contactService.remove(user, contactId);
    res.status(200).json({
      data: "OK"
    })
  } catch (e) {
    next(e);
  }
}

const search = async (req, res, next) => {
  try {
    //1. ambil user = request user dari middleware
    const user = req.user;
    //2. ambil data dari request query di gabungkan dalam object request
    const request = {
      name: req.query.name,
      email: req.query.email,
      phone: req.query.phone,
      page: req.query.page,
      size: req.query.size
    };
    //3. jalankan service dengan mengirim user dan request
    const result = await contactService.search(user, request);
    res.status(200).json({
      data: result.data,
      paging: result.paging
    });
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