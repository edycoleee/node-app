//src/service/contact-service.js
import { query } from "../util/db.js";
import { createContactValidation } from "../validation/contact-validation.js";
import { validate } from "../validation/validation.js";

const create = async (user, request) => {
  //1. cek validation >> jika error maka kirim pesan error, atau jika sesuai lanjutkan no.2
  const contact = validate(createContactValidation, request);
  //2. gabungkan username kedalam request
  contact.username = user.username;
  //3.  Construct the SQL query for inserting a new contact
  const sqlQuery = `
      INSERT INTO contacts (username, first_name, last_name, email, phone)
      VALUES (?, ?, ?, ?, ?);`;
  //4. Perintah Insert ke database dan tangkap result.
  console.log("contact : ", contact);
  const result = await query(sqlQuery, [
    contact.username,
    contact.first_name,
    contact.last_name,
    contact.email,
    contact.phone
  ]);
  console.log("result : ", result);
  //5. Get username di database
  const rows = await query('SELECT * FROM contacts WHERE id = ?', [result.insertId])
  //tampilkan hasilnya di log
  console.log(`POST NEW DATA: ${JSON.stringify(rows)}`);
  //6. return value sebagai response body
  return rows[0]
}

const get = async (user, contactId) => {
  contactId = validate(getContactValidation, contactId);

  const contact = {}

  if (!contact) {
    throw new ResponseError(404, "contact is not found");
  }

  return contact;
}

const update = async (user, request) => {
  const contact = validate(updateContactValidation, request);

  const totalContactInDatabase = {}

  if (totalContactInDatabase !== 1) {
    throw new ResponseError(404, "contact is not found");
  }

  return
}

const remove = async (user, contactId) => {
  contactId = validate(getContactValidation, contactId);

  const totalInDatabase = {}

  if (totalInDatabase !== 1) {
    throw new ResponseError(404, "contact is not found");
  }

  return;
}

const search = async (user, request) => {
  request = validate(searchContactValidation, request);
  return {
    data: [{}],
    paging: {
      page: 1,
      total_item: 1,
      total_page: 1
    }
  }
}

export default {
  create,
  get,
  update,
  remove,
  search
}