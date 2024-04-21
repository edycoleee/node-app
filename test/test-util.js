//src/test/test-util.js
import { query } from "../src/util/db.js"


export const removeTestUser = async () => {
  await query('DELETE FROM users WHERE username =?', ["test"])
}