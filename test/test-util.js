//src/test/test-util.js
import { query } from "../src/util/db.js"
import bcrypt from "bcrypt";

//REMOVE TEST USER
export const removeTestUser = async () => {
  await query('DELETE FROM users WHERE username =?', ["test"])
}

//CREATE TEST USER
export const createTestUser = async () => {
  await query('INSERT INTO users (username,password,name,token) VALUES (?, ?, ?,?)', ["test", await bcrypt.hash("rahasia", 10), "test", "test"]);
}

//GET TEST USER
export const getTestUser = async () => {
  //select user where
  const user = await query('SELECT * FROM users WHERE username = ?', ["test"])
  //yang di kembalikan [{}], array ke 0
  return user[0]
}

//REMOVE ALL CONTACT
export const removeTestContact = async () => {
  await query('DELETE FROM contacts WHERE username =?', ["test"])
}

//GET DATA CONTACT
export const getTestContact = async () => {
  const rows = await query('SELECT * FROM contacts WHERE username = ?', ['test']);
  // Mengambil hasil pertama (jika ada)
  const contact = rows[0] || null;
  // Log hasil yang didapat
  console.log('Retrieved contact:', contact);
  return contact;
}

//CREATE TEST CONTACT
export const createTestContact = async () => {
  // Query untuk memasukkan data kontak baru
  const querySQL = `
      INSERT INTO contacts (username, first_name, last_name, email, phone)
      VALUES (?, ?, ?, ?, ?)
    `;
  const values = ["test", "test", "test", "test@gmail.com", "080900000"];
  // Menjalankan query
  const result = await query(querySQL, values);
  // Log hasil yang didapat
  console.log('Contact created with ID:', result.insertId);
  return result;
}

//CREATE MANY TEST CONTACT
export const createManyTestContacts = async () => {
  //Membuat test kontak sejumlah 15 kontak dg for
  for (let i = 0; i < 15; i++) {
    const querySQL = `
          INSERT INTO contacts (username, first_name, last_name, email, phone)
          VALUES (?, ?, ?, ?, ?)
        `;
    const values = [
      'test',
      `test ${i}`,
      `test ${i}`,
      `test${i}@gmail.com`,
      `080900000${i}`
    ];
    // Menjalankan query untuk setiap kontak
    const result = await query(querySQL, values);
    console.log('Contact created with ID:', result.insertId);
  }
}


export const removeAllTestAddresses = async () => {
  // Menghapus semua alamat yang terkait dengan kontak yang memiliki username "test"
  const querySQL = `
        DELETE FROM addresses
        WHERE contact_id IN (
            SELECT id FROM contacts WHERE username = ?
        )
    `;
  await query(querySQL, ['test']);
}

export const createTestAddress = async () => {
  const contact = await getTestContact();
  if (!contact) {
    throw new Error('Test contact not found');
  }

  const querySQL = `
        INSERT INTO addresses (contact_id, street, city, province, country, postal_code)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
  await query(querySQL, [contact.id, 'jalan test', 'kota test', 'provinsi test', 'indonesia', '234234']);
}

export const getTestAddress = async () => {
  const querySQL = `
        SELECT * FROM addresses
        WHERE contact_id IN (
            SELECT id FROM contacts WHERE username = ?
        )
        LIMIT 1
    `;
  const rows = await query(querySQL, ['test']);
  return rows.length > 0 ? rows[0] : null;
}