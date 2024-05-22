//src/service/contact-service.js
import { query } from "../util/db.js";
import { createContactValidation, getContactValidation, searchContactValidation, updateContactValidation } from "../validation/contact-validation.js";
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

  const [rows] = await query(
      `SELECT ${contactSelectFields}
       FROM contacts
       WHERE username = ? AND id = ?`,
      [user.username, contactId]
  );

  if (rows.length === 0) {
      throw new ResponseError(404, 'Contact not found');
  }

  return rows[0];
}

const update = async (user, request) => {
  const contact = validate(updateContactValidation, request);

  const [result] = await query(
      `UPDATE contacts
       SET first_name = ?, last_name = ?, email = ?, phone = ?
       WHERE username = ? AND id = ?`,
      [contact.first_name, contact.last_name, contact.email, contact.phone, user.username, contact.id]
  );

  if (result.affectedRows === 0) {
      throw new ResponseError(404, 'Contact not found');
  }

  const [rows] = await query(
      `SELECT ${contactSelectFields}
       FROM contacts
       WHERE id = ?`,
      [contact.id]
  );

  return rows[0];
}

const remove = async (user, contactId) => {
  contactId = validate(getContactValidation, contactId);

  const [result] = await query(
      `DELETE FROM contacts
       WHERE username = ? AND id = ?`,
      [user.username, contactId]
  );

  if (result.affectedRows === 0) {
      throw new ResponseError(404, 'Contact not found');
  }

  return { id: contactId };
}

const search = async (user, request) => {
  request = validate(searchContactValidation, request);
  const { page, size, name, email, phone } = request;
  const offset = (page - 1) * size;

  const filters = ['username = ?'];
  const values = [user.username];

  if (name) {
      filters.push(`(first_name LIKE ? OR last_name LIKE ?)`);
      values.push(`%${name}%`, `%${name}%`);
  }
  if (email) {
      filters.push(`email LIKE ?`);
      values.push(`%${email}%`);
  }
  if (phone) {
      filters.push(`phone LIKE ?`);
      values.push(`%${phone}%`);
  }

  const whereClause = filters.length > 0 ? `WHERE ${filters.join(' AND ')}` : '';

  const [rows] = await query(
      `SELECT ${contactSelectFields}
       FROM contacts
       ${whereClause}
       LIMIT ? OFFSET ?`,
      [...values, size, offset]
  );

  const [countRows] = await query(
      `SELECT COUNT(* AS total)
       FROM contacts
       ${whereClause}`,
      values
  );

  const totalItems = countRows[0].total;

  return {
      data: rows,
      paging: {
          page: page,
          total_item: totalItems,
          total_page: Math.ceil(totalItems / size)
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