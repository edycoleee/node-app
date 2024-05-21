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