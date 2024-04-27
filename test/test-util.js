//src/test/test-util.js
import { query } from "../src/util/db.js"
import bcrypt from "bcrypt";

export const removeTestUser = async () => {
  await query('DELETE FROM users WHERE username =?', ["test"])
}

export const createTestUser = async () => {
  await query('INSERT INTO users (username,password,name,token) VALUES (?, ?, ?,?)', ["test", await bcrypt.hash("rahasia", 10), "test", "test"]);
}

export const getTestUser = async () => {
  //select user where
  const user = await query('SELECT * FROM users WHERE username = ?', ["test"])
  //yang di kembalikan [{}], array ke 0
  return user[0]
}