//test koneksi database
//test/db.test.js
import { query } from "../src/util/db.js";


//TEST KONEKSI DB
describe('TEST DATABASE', () => {
  it('Koneksi databse >> query SELECT ', async () => {
    //Hapus semua data
    await query('DELETE FROM users')
    //Select semua data dari tabel users
    const rows = await query('SELECT * FROM users')
    //tampilkan di log
    console.log(`GET DATA:${JSON.stringify(rows)}`);
    // Memeriksa panjang array
    expect(rows.length).toBe(0);
  })

})