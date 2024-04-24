//src/test/test-util.js
import { query } from "../src/util/db.js"


export const removeTestUser = async () => {
  await query('DELETE FROM users WHERE username =?', ["test"])
}

export const createTestUser = async () => {
  await query('INSERT INTO users (username,password,name,token) VALUES (?, ?, ?,?)', ["test", await bcrypt.hash("rahasia", 10), "test", "test"]);
}