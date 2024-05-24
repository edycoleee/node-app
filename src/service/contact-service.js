//src/service/contact-service.js
import { ResponseError } from "../error/response-error.js";
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
    //VALIDASI ID
    contactId = validate(getContactValidation, contactId);
    //SELECT DATA WHERE
    const querySQL = `SELECT id, first_name, last_name, email, phone FROM contacts WHERE username = ? AND id = ?`;
    const values = [user.username, contactId];
    // Menjalankan query
    const rows = await query(querySQL, values);
    console.log("rows : ", rows);
    if (rows.length === 0) {
        throw new ResponseError(404, 'Contact not found');
    }
    //RETURN DATA
    return rows[0];
}

const update = async (user, request) => {
    //VALIDASI request
    const contact = validate(updateContactValidation, request);
    //UPDATE DATA WHERE
    let querySQL = `UPDATE contacts SET first_name = ?, last_name = ?, email = ?, phone = ? WHERE username = ? AND id = ?`;
    let values = [contact.first_name, contact.last_name, contact.email, contact.phone, user.username, contact.id];
    // Menjalankan query
    const result = await query(querySQL, values);
    console.log("rows : ", result);
    // Jika Tidak bisa update
    if (result.affectedRows === 0) {
        throw new ResponseError(404, 'Contact not found');
    }
    //SELECT DATA WHERE
    querySQL = `SELECT id, first_name, last_name, email, phone FROM contacts WHERE id = ?`;
    values = [user.contactId];
    // Menjalankan query
    const rows = await query(querySQL, values);
    console.log("rows : ", rows);
    //RETURN DATA SETELAH UPDATE
    return rows[0];
}

const remove = async (user, contactId) => {
    // VALIDASI ID PARAMS
    contactId = validate(getContactValidation, contactId);
    //REMOVE DATA WHERE
    let querySQL = `DELETE FROM contacts WHERE username = ? AND id = ?`;
    let values = [user.username, contactId];
    // Menjalankan query
    const result = await query(querySQL, values);
    console.log("rows : ", result);
    // Jika delete tidak bisa
    if (result.affectedRows === 0) {
        throw new ResponseError(404, 'Contact not found');
    }
    //RETURN KONTAK ID YANG DI DELETE
    return { id: contactId };
}

const search = async (user, request) => {
    // VALIDASI REQUEST
    request = validate(searchContactValidation, request);
    const { page, size, name, email, phone } = request;
    const offset = (page - 1) * size;
    //1. VARIABLE FILTER, VALUES
    const filters = ['username = ?'];
    const values = [user.username];
    //2. jika ada filter name
    if (name) {
        filters.push(`(first_name LIKE ? OR last_name LIKE ?)`);
        values.push(`%${name}%`, `%${name}%`);
    }
    //3. jika ada filter email
    if (email) {
        filters.push(`email LIKE ?`);
        values.push(`%${email}%`);
    }
    //4. jika ada filter phone
    if (phone) {
        filters.push(`phone LIKE ?`);
        values.push(`%${phone}%`);
    }
    //Penggabungan beberapa filter atau hanya 1 filter 
    const whereClause = filters.length > 0 ? `WHERE ${filters.join(' AND ')}` : '';
    //SELECT DATA BERDASARKAN FILTER
    const [rows] = await query(
        `SELECT * FROM contacts ${whereClause} LIMIT ? OFFSET ?`, [...values, size, offset]);
    //HITUNG JUMLAH DATA BERDASARKAN FILTER
    const [countRows] = await query(`SELECT COUNT(* AS total)FROM contacts${whereClause}`, values);
    //HITUNG JLM TOTAL ITEM
    const totalItems = countRows[0].total;
    //RETURN DATA
    return {
        data: rows,
        paging: {
            page: page,
            total_item: totalItems,
            total_page: Math.ceil(totalItems / size)
        }
    }
}


// // 2. Switch case for adding filters
// switch (true) {
//     case !!name:
//         filters.push(`(first_name LIKE ? OR last_name LIKE ?)`);
//         values.push(`%${name}%`, `%${name}%`);
//         break;
//     case !!email:
//         filters.push(`email LIKE ?`);
//         values.push(`%${email}%`);
//         break;
//     case !!phone:
//         filters.push(`phone LIKE ?`);
//         values.push(`%${phone}%`);
//         break;
// }

export default {
    create,
    get,
    update,
    remove,
    search
}