//src/util/config.js
//simpan konfigurasi koneksi mysql server
export const config = {
  db: {
    /* don't expose password or any sensitive info, done only for demo */
    host: "147.139.169.55",
    user: "root",
    password: "super-password1",
    database: "dbsekolah",
    connectTimeout: 60000
  },
};