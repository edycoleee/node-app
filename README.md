## BELAJAR NODE JS API

## 1. PERSIAPAN

```
//init dan instal depedency
npm init
npm install express
npm install jest --save-dev
npm install babel-jest --save-dev
npm install @babel/preset-env --save-dev
npm install @babel/plugin-transform-runtime --save-dev
npm install jest supertest @types/jest --save-dev
npm install --save-dev nodemon
npm install winston winston-daily-rotate-file
npm install mysql2

//Edit file package.json

"main": "./src/index.js",
"type": "module",
"scripts": {
    "test": "jest",
    "start": "node ./src/index.js",
    "dev": "nodemon ./src/index.js"
  },
"jest": {
"maxConcurrency" : 2,
"verbose": true,
"transform": {
"^.+\\.[t|j]sx?$": "babel-jest"
},
"collectCoverage": true,
"coverageThreshold": {
"global": {
"branches": 100,
"functions": 100,
"lines": 100,
"statements": 100
}
},
"collectCoverageFrom": [
"src/**/*.{js,jsx}",
"!vendor/**/*.{js,jsx}"
]
},

//Tambahkan File babel.config.json
{
  "presets": ["@babel/preset-env"],
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "regenerator": true
      }
    ]
  ]
}

//Tambahkan File .gitignore
node_modules
build
npm-debug.log
.nyc
.env
.DS_Store
.idea
coverage
\*.log

```

## 2. Mengenal Express JS

ExpressJS adalah salah satu Web Framework OpenSource paling populer di NodeJS

### Object App dari Express

`export const app = express();`

Objek app pada Express adalah inti dari aplikasi Express. Dengan objek ini, Anda dapat membuat rute, menangani permintaan HTTP, mengatur middleware, dan berbagai fungsi lainnya yang terkait dengan pengaturan dan penanganan aplikasi web.

Berikut adalah beberapa contoh penggunaan umum objek app pada Express:

1. Membuat Rute: Anda dapat menggunakan metode `app.get()`, `app.post()`, `app.put()`, `app.delete()`, dll., untuk menentukan rute HTTP dan menangani permintaan yang sesuai.

```
app.get('/', function(req, res) {
  res.send('Hello World!');
});
```

2. Mengatur Middleware: Middleware adalah fungsi-fungsi yang dipanggil sebelum penanganan permintaan akhir. Dengan Express, Anda dapat menggunakan metode `app.use()` untuk mengatur middleware.

```
app.use(express.json()); // Middleware untuk menangani JSON data
```

3. Menjalankan Server: Seperti yang Anda lihat dalam potongan kode sebelumnya, Anda menggunakan objek app untuk memanggil metode `listen()` untuk memulai server dan mendengarkan koneksi masuk.

```
app.listen(PORT, function() {
  console.log(`Server berjalan di port ${PORT}`);
});
```

### Application :: _a.import library >> b.app object >> c.port >> d.listen_

```
//src/index.js
//a. import library Framework express
import express from "express";

//b. membuat object app dari express function
export const app = express();

//c. definisikan PORT sebagai variable,
// sehingga mudah menggantinya jika diperlukan
const PORT = process.env.PORT || 3000;

//d. metode app.listen untuk memulai sebuah server dan mendengarkan koneksi masuk pada port
//app.listen(PORT, callback)
//() => {...}: arrow function, used as the callback function. logs a message to the console
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
```

### Jalankan Server : `npm run dev`

## 3. Basic Testing

Belajar membuat endpoint request dan response

1. Endpoint GET http://localhost:3000/ > Request => Response send String

Response Body Success :

```json
"Hello World!"
```

```
//src/application.js
//a. import library Framework express
import express from "express";

//b. membuat object app dari express function
export const app = express();

//e. Menjalankan Middleware app.use menangani data json
app.use(express.json());

//f. Membuat Rute >> app.get(Route, callback) >> (req,res) => {...}
//1. Contoh : Endpoint API : GET '/' ========================
app.get('/', (req, res) => {
    console.log('Hello World requested');
    res.send('Hello World!');
});
```

- Memisahkan index.js dan application.js ,untuk memudahkan pengetesan dengan unit test

```
//src/index.js
import { app } from "./application.js";

//c. definisikan PORT sebagai variable,
// sehingga mudah menggantinya jika diperlukan
const PORT = process.env.PORT || 3000;

//d. metode app.listen untuk memulai sebuah server dan mendengarkan koneksi masuk pada port
//app.listen(PORT, callback)
//() => {...}: arrow function, used as the callback function. logs a message to the console
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
```

- melakukan pengetesan dengan request.rest

```
//request.rest
### 1. Contoh : Endpoint API : GET '/'
GET http://localhost:3000/

###
```

- melakukan pengetesan dengan unit test

Unit Test adalah callback function

```
1. fungsi testing : describe >> it =======================
describe('Nama Test', callback1)
callback1 >> () => {it('Nama Sub Test', callback2)}
callback2 >> async()=>{...}

describe("Test1", () => {
  it("Test 1.a", async() => {
    expect(...).toBe(...);
  });
  it("Test 1.b", async() => {
    expect(...).toBe(...);
  });
});

2. fungsi testing : describe >> test =======================
describe('Nama Test', callback1)
callback1 >> () => {test('Nama Sub Test', callback2)}
callback2 >> async()=>{...}

describe("Test1", () => {
  test("Test 1.a", async() => {
    expect(...).toBe(...);
  });
  test("Test 1.b", async() => {
    expect(...).toBe(...);
  });
});
```

Unit Test :

```
//test/app.test.js
const request = require('supertest');
const { app } = require('../src/application');

//a. fungsi testing : describe >> it
describe('TEST GET No 1 dan No 3', () => {

  //1. TEST No 1 >> GET http://localhost:3000/
  it('TEST GET http://localhost:3000/', async () => {
    //b. lakukan request, GET "/" dan tangkap hasilnya ke variable response
    const response = await request(app)
    .get('/');
    //c. Jika request berhasil ke server maka status response = 200
    expect(response.status).toBe(200);
    //d. Periksa isi response seharusnya 'Hello World!'
    expect(response.text).toBe('Hello World!');
  });
});

//jalankan test
//npx jest app.test.js
```

## Pada Episode ini kita akan mebuat :

### 6. Membuat REGISTER User API

### 7. Membuat LOGIN User API

### 8. Membuat GET User API

### 9. Membuat UPDATE User API

### 10. Membuat LOGOUT User API

### 11. Membuat CREATE Contact API

### 12. Membuat GET Contact API

### 13. Membuat UPDATE Contact API

### 14. Membuat REMOVE Contact API

### 15. Membuat SEARCH Contact API

### 16. Membuat CREATE Address API

### 17. Membuat GET Address API

### 18. Membuat UPDATE Address API

### 19. Membuat REMOVE Address API

### 20. Membuat LIST Address API

## 4. Setting Database

Membangun server MYSQL di VPS dengan docker compose

```
#create folder /root/cmp_mysql_admin
#create file docker-compose.yml

version: "3"

services:
  # Database
  db:
    image: mysql:latest
    command: --default-authentication-plugin=mysql_native_password
    volumes:
      - db_data:/var/lib/mysql
    restart: always
    ports:
      - "3306:3306"
    environment:
      MYSQL_DATABASE: patientsdb
      MYSQL_USER: admin
      MYSQL_PASSWORD: super-password1
      MYSQL_ROOT_PASSWORD: super-password1
      SERVICE_TAGS: prod
      SERVICE_NAME: mysqldb
    networks:
      - mysql-phpmyadmin

  # phpmyadmin
  phpmyadmin:
    depends_on:
      - db
    image: phpmyadmin
    restart: always
    ports:
      - "8090:80"
    environment:
      PMA_HOST: db
      MYSQL_ROOT_PASSWORD: super-password1
    networks:
      - mysql-phpmyadmin

networks:
  mysql-phpmyadmin:

volumes:
  db_data:

#docker compose up
#docker compose down
```

Menggunakan CMD >> databse di VPS (Server Cloud)

```
ssh root@147.139.169.55
>> password :
docker ps -a
>>CONTAINER ID   IMAGE             COMMAND                  CREATED        STATUS        >>PORTS                                                  NAMES
>>db2e71ec05d6   mysql:latest      "docker-entrypoint.s…"   2 weeks ago    Up 2 weeks    0.0.0.0:3306->3306/tcp, :::3306->3306/>>tcp, 33060/tcp   cmp_mysql_admin_db_1
docker exec -it cmp_mysql_admin_db_1 /bin/bash
mysql -uroot -p
>>password mysql :
show databases;
CREATE DATABASE dbsekolah;
USE dbsekolah;

CREATE TABLE users (
username VARCHAR(100) PRIMARY KEY,
password VARCHAR(100),
name VARCHAR(100),
token VARCHAR(100)
);

SELECT * FROM users;

```

Setting node JS MYSQL `npm install mysql2`

```
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

```

```
//src/util/db.js
//perintah query(sql, params)
import mysql from "mysql2/promise";
import { config } from "./config.js";


export async function query(sql, params) {
  const connection = await mysql.createConnection(config.db);
  const [results,] = await connection.execute(sql, params);
  await connection.end();
  return results;
}

```

```
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

//npx jest db.test.js
```

## 5. Menangkap Error Middleware

Energi terbesar programmer adalah menangani error atau bug.
Kadang Error bisa terjadi pada bermacam proses, untuk memudahkan dalam mengetahui sumber error,
maka semua error di masukkan dalam middleware >> kirim error dan hentikan semua proses.

a. Membuat fungsi createResponseError(status, message) return object

```json
error = {
  "message" : message,
  "status" : status
}
```

membuat folder //src/error

```
//src/error/response-error.js
class ResponseError extends Error {

  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

export {
  ResponseError
}
//const error = new ResponseError(404, "Not Found");

```

b. Membuat fungsi errorMiddleware(err, req, res, next)

1.jika tidak error >> next, 2. jika error dari ResponseError kirim status dan pesan error, 3. jika error diluar response kirim status 500 dan pesan error.

```
//src/middleware/error-middleware.js
import { ResponseError } from "../error/response-error.js";

const errorMiddleware = async (err, req, res, next) => {
  console.log("ERROR :", err);
  console.log(err instanceof ResponseError);
  console.log(err.constructor);
  console.log(err.constructor.name);
  //1. jika tidak error maka next lanjutkan
  if (!err) {
    next();
    return;
  }

  //2. jika error dari response error maka tampilkan status dan pesannya
  if (err instanceof ResponseError) {
    res.status(err.status).json({
      errors: err.message
    }).end();

    //3. jika error selain itu maka kirim status 500 dan pesan error
  } else {
    res.status(500).json({
      errors: err.message
    }).end();
  }
}

export {
  errorMiddleware
}
```

c. Jalankan middleware errorMiddleware di app

```
//src/application.js
//a. import library Framework express
import express from "express";

.......................


app.use(errorMiddleware)
```

## 6. Membuat Register User API

### Langkah - langkah :

1. Endpoint dan response >> Pahami alamat End point dan bgmana responnya >> POST /api/users
2. Validasi Request Body >> Data yg dikirim req.body (username,password,name) >> validasi dahulu isinya

```
const registerUserValidation = Joi.object({ username: ..., password: ..., name: ...});

const validate = (schema, request) => {
    const result = schema.validate(request)
}
```

3. Service >> 1.CekValidationRequestBody, 2.GetUsername, 3.CekUsername, 4.EncryptPassword, 5.RegisterUser

```
const register = async (request) => {
    //1. cek validation >> jika error maka kirim pesan error, atau jika sesuai lanjutkan no.2
	const user = validate(registerUserValidation, request);
    //2. Get username di database
    //3. Cek jika username sudah ada / === 1 maka kirim error 400, user sudah ada
    //jika countUser = 0 atau belum ada maka lanjutkan no.4
    //4. encrypt dg bcrypt password agar tidak terlihat langsung di database
    //5. buat user baru ke database
}
```

4. Controller >> meneruskan semua request dari route (userController.register) ke service (userService.register(req.body)), jika sukses kirim status 200 dan isi data

```
const register = async (req, res, next) => {
    try {
        const result = await userService.register(req.body);
    } catch (e) {
        next(e);
    }
}
```

5. Route >> Membuat routing POST /api/users >> userController.register

`publicRouter.post('/api/users', userController.register)`

6. Unit Test >>

```
// Fungsi tes untuk register POST /api/users
describe('Register POST /api/users', function () {
    //1. setelah selesai test, hapus username: "test" di table/database
    //2. test register user baru >> valid
    //3. test reject body request >> invalid
    //4. test reject user yang sudah terdaftar >> invalid
})
```

### - a. Endpoint : POST /api/users

Request Body :

```json
{
  "username": "edy",
  "password": "rahasia",
  "name": "Edy Cole"
}
```

Response Body Success :

```json
{
  "data": {
    "username": "edy",
    "name": "Edy Cole"
  }
}
```

Response Body Error :

```json
{
  "errors": "Username already registered"
}
```

### - b. membuat folder : validation, service, controller, route

### Langkah : Validasi >> Service >> Controller >> Route

### - c. Membuat Validation sesuaikan dengan database

`npm install joi bcrypt`

```
// pada pembuatan tabel di database kita menentukan masing2 kolom

CREATE TABLE users (
username VARCHAR(100) PRIMARY KEY, >> joi : max(100).required()
password VARCHAR(100), >> joi : max(100).required()
name VARCHAR(100),  >> joi : max(100).required()
token VARCHAR(100)
);
```

Validation dengan Joi sesuaikan dengan table mysql

```
//src/validation/user-validation.js
import Joi from "joi";

const registerUserValidation = Joi.object({
    username: Joi.string().max(100).required(),
    password: Joi.string().max(100).required(),
    name: Joi.string().max(100).required()
});

export {
    registerUserValidation,
}
```

Fungsi validate untuk menangkap error dari validasi >> callback

```
//validation/validation.js
import {ResponseError} from "../error/response-error.js";

//callback >> validate = (schema, callback){ >> schema.validate.error/value }
const validate = (schema, request) => {
    const result = schema.validate(request, {
        abortEarly: false,
        allowUnknown: false
    })
    //jika result.error = true >> kirim status 400 dan pesan error
    if (result.error) {
        throw new ResponseError(400, result.error.message);
    //jika result.error = false >> kirim result.value >> true
    } else {
        return result.value;
    }
}

export {
    validate
}
```

### - d. Membuat user-service untuk Register

Langkahnya 1.CekValidationRequestBody, 2.GetUsername, 3.CekUsername, 4.EncryptPassword, 5.RegisterUser

```
//src/service/user-service.js
import { ResponseError } from "../error/response-error.js";
import { query } from "../util/db.js";
import { registerUserValidation } from "../validation/user-validation.js";
import { validate } from "../validation/validation.js";
import bcrypt from "bcrypt";


const register = async (request) => {

  //1. cek validation >> jika error maka kirim pesan error, atau jika sesuai lanjutkan no.2
  const user = validate(registerUserValidation, request);

  console.log("DATA VALIDATE:", user);
  //2. Get username di database
  const countUser = await query('SELECT * FROM users WHERE username = ?', [user.username])
  //3. Cek jika username sudah ada / === 1 maka kirim error 400, user sudah ada
  //jika countUser = 0 atau belum ada maka lanjutkan no.4
  console.log("countUser:", countUser.length);
  if (countUser.length === 1) {
    throw new ResponseError(400, "Username already exists");
  }

  //4. encrypt dg bcrypt password agar tidak terlihat langsung di database
  user.password = await bcrypt.hash(user.password, 10);

  console.log("DATA POST:", user.username, user.password, user.name);
  //5. buat user baru ke database
  await query('INSERT INTO users (username,password,name,token) VALUES (?, ?, ?,?)', [user.username, user.password, user.name, ""]);

  //6. Get username di database
  const rows = await query('SELECT * FROM users WHERE username = ?', [user.username])
  //tampilkan hasilnya di log
  console.log(`POST NEW DATA: ${JSON.stringify(rows)}`);

  return rows[0]
}

export default {
  register,
}
```

### - e. Membuat Register Controller >> user-controller.js

Controller : meneruskan semua request dari route ke service, jika sukses kirim status 200 dan isi data

```
//src/controller//user-controller.js
import userService from "../service/user-service.js";

const register = async (req, res, next) => {
    try {
        const result = await userService.register(req.body);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

export default {
    register,
}
```

### - f. Membuat Register Route >> public-api.js

Membuat routing POST /api/users >> userController.register

```
//src/route/public-api.js
import express from "express";
import userController from "../controller/user-controller.js";

const publicRouter = new express.Router();
publicRouter.post('/api/users', userController.register);

export {
    publicRouter
}
```

Masukkan ke dalam middleware application

```
//src/application.js
//a. import library Framework express
import express from "express";

.........

app.use(publicRouter);
app.use(errorMiddleware)
```

### - g. Unit Test Register

```
//src/test/user.test.js
import supertest from "supertest";
import { removeTestUser } from "./test-util.js";
import { app } from "../src/application.js";


// Fungsi tes untuk register POST /api/users
describe('Register POST /api/users', function () {

  //1a. sebelum test, hapus username: "test" di table/database
  beforeEach(async () => {
    await removeTestUser();
  })

  //1b. setelah selesai test, hapus username: "test" di table/database
  afterEach(async () => {
    await removeTestUser();
  })

  //2. register user baru
  it('should can register new user', async () => {
    const result = await supertest(app)
      //kirim post req /api/users
      .post('/api/users')
      //kirim req body (username,password,name)
      .send({
        username: 'test',
        password: 'rahasia',
        name: 'test'
      });
    //log hasilnya result
    console.log("REGISTER :", result.body.data);
    //status harus 200
    expect(result.status).toBe(200);
    //isi body.data.username adalah test
    expect(result.body.data.username).toBe("test");
    //isi body.data.name adalah test
    expect(result.body.data.name).toBe("test");
    expect(result.body.data.password).toBeDefined();
  });

  //3. test body request invalid
  it('should reject if request is invalid', async () => {
    const result = await supertest(app)
      //kirim post req /api/users
      .post('/api/users')
      //kirim req body (username,password,name) >> kosong supaya error validasi
      .send({
        username: '',
        password: '',
        name: ''
      });
    //log hasilnya result
    console.log("REGISTER INVALID :", result.status, result.body);
    //log hasilnya result
    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  //4. test user yang sudah terdaftar
  it('should reject if username already registered', async () => {
    let result = await supertest(app)
      .post('/api/users')
      .send({
        username: 'test',
        password: 'rahasia',
        name: 'test'
      });
    //log hasilnya result
    console.log("REGISTER 2 :", result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("test");
    expect(result.body.data.name).toBe("test");
    expect(result.body.data.password).toBeDefined();

    result = await supertest(app)
      .post('/api/users')
      .send({
        username: 'test',
        password: 'rahasia',
        name: 'test'
      });
    //log hasilnya result
    console.log("REGISTER REGISTERED :", result.status, result.body);
    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

```

```
//src/test/test-util.js
import { query } from "../src/util/db"


export const removeTestUser = async () => {
  await query('DELETE FROM users WHERE username =?', ["test"])
}
```

### - h. Request.Test Register

```
### 1a. Fungsi tes untuk register >> ERROR Validation
POST http://localhost:3000/api/users
Content-Type: application/json

{
"username": "",
"password": "",
"name": ""
}

### 1b. Fungsi tes untuk register POST /api/users
POST http://localhost:3000/api/users
Content-Type: application/json

{
"username": "test",
"password": "rahasia",
"name": "test"
}

### 1c. Fungsi tes untuk register >> ERROR Duplicate
POST http://localhost:3000/api/users
Content-Type: application/json

{
"username": "test",
"password": "rahasia",
"name": "test"
}
```

## 7. Membuat Login User API

### Langkah - langkah :

1. Endpoint dan response >> Pahami alamat End point dan bgmana responnya >> POST /api/users/login
2. Validasi Request Body >> Data yg dikirim req.body (username,password) >> validasi dahulu isinya

```
const loginUserValidation = Joi.object({ username: ..., password: ..., });

const validate = (schema, request) => {
    const result = schema.validate(request)
}
```

3. Service >> 1.CekValidationRequestBody, 2.GetUsername, 3.CekUsername, 4.CekPassword, 5.UpdateToken, 6.SendToken

```
const login = async (request) => {
    //1. cek validation >> jika error maka kirim pesan error, atau jika sesuai lanjutkan no.2
	const user = validate(loginUserValidation, request);
    //2. Get username di database
    //3. Cek jika username tdk ada / === 0 maka kirim error 401, user dn password salah
    //jika countUser = 1 atau  ada maka lanjutkan no.4
    //4. Cek Passord sesuai dengan yang tersimpan
    //5. buat token dan update ke tabel user
    //6. kirim token sebagai response
}
```

4. Controller >> meneruskan semua request dari route (userController.login) ke service (userService.login(req.body)), jika sukses kirim status 200 dan isi data

```
const login = async (req, res, next) => {
    try {
        const result = await userService.login(req.body);
    } catch (e) {
        next(e);
    }
}
```

5. Route >> Membuat routing POST /api/users/login >> userController.login

`publicRouter.post('/api/users/login', userController.login)`

6. Unit Test >>

```
// Fungsi tes untuk login POST /api/users/login
describe('login POST /api/users/login', function () {
    //1. sebelum tes, buat user test
    //2. setelah selesai test, hapus username: "test" di table/database
    //3. login user dan password > valid
    //3. test reject body request invalid
    //4. test reject user/password yang invalid
})
```

### - a. Endpoint : POST /api/users/login

Request Body :

```json
{
  "username": "edy",
  "password": "rahasia"
}
```

Response Body Success :

```json
{
  "data": {
    "token": "unique-token"
  }
}
```

Response Body Error :

```json
{
  "errors": "Username or password wrong"
}
```

### - b. Membuat Login Validation sesuaikan dengan database

```
//src/validation/user-validation.js

....................
const loginUserValidation = Joi.object({
    username: Joi.string().max(100).required(),
    password: Joi.string().max(100).required()
});

export {
    registerUserValidation,
    loginUserValidation,
}
```

### - c. Membuat Login user-service

`npm install uuid`

Service >> 1.CekValidationRequestBody, 2.GetUsername, 3.CekUsername, 4.CekPassword, 5.UpdateToken, 6.SendToken

```
//src/service/user-service.js

..........................
const login = async (request) => {
    //1. cek validation >> jika error maka kirim pesan error, atau jika sesuai lanjutkan no.2
    const loginRequest = validate(loginUserValidation, request);
    //2. Get username di database
    let user = await query('SELECT * FROM users WHERE username = ?', [loginRequest.username])
    //3. Cek jika username tdk ada / === 0 maka kirim error 401, user dn password salah
    if (user.length === 0) {
        throw new ResponseError(401, "Username or password wrong");
    }
    //4. Cek Passord sesuai dengan yang tersimpan
    const isPasswordValid = await bcrypt.compare(loginRequest.password, user[0].password);
    if (!isPasswordValid) {
        throw new ResponseError(401, "Username or password wrong");
    }
    //5. buat token dan update ke tabel user
    const token = uuid().toString()
    await query('UPDATE users SET token = ? WHERE username = ?', [token, user.username]);
    //6. Get username di database >> kirim token sebagai response
    user = await query('SELECT * FROM users WHERE username = ?', [user.username])
    const tokenUser = user[0].token
    return {
        data: {
            token: tokenUser
        },
    }
}

export default {
    register,
    login,
}
```

### - d. Membuat Login Controller >> user-controller.js

```
//src/controller//user-controller.js

....................
const login = async (req, res, next) => {
    try {
        const result = await userService.login(req.body);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}
```

### - e. Membuat Login Route >> public-api.js

```
//src/route/public-api.js

................
publicRouter.post('/api/users/login', userController.login);
```

### - f. Unit Test Login

```
//src/test/user.test.js

.............
describe('POST /api/users/login', function () {
    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await removeTestUser();
    });

    it('should can login', async () => {
        const result = await supertest(web)
            .post('/api/users/login')
            .send({
                username: "test",
                password: "rahasia"
            });

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.token).toBeDefined();
        expect(result.body.data.token).not.toBe("test");
    });

    it('should reject login if request is invalid', async () => {
        const result = await supertest(web)
            .post('/api/users/login')
            .send({
                username: "",
                password: ""
            });

        logger.info(result.body);

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('should reject login if password is wrong', async () => {
        const result = await supertest(web)
            .post('/api/users/login')
            .send({
                username: "test",
                password: "salah"
            });

        logger.info(result.body);

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });

    it('should reject login if username is wrong', async () => {
        const result = await supertest(web)
            .post('/api/users/login')
            .send({
                username: "salah",
                password: "salah"
            });

        logger.info(result.body);

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });
});
```

```
//src/test/test-util.js
import { query } from "../src/util/db.js"

.......................
export const createTestUser = async () => {
  await query('INSERT INTO users (username,password,name,token) VALUES (?, ?, ?,?)', [ "test", await bcrypt.hash("rahasia", 10),"test", "test"]);
}
```

### - g. Request.Test Login

```
### 2a. Fungsi tes untuk login >> ERROR Validation
POST http://localhost:3000/api/users/login
Content-Type: application/json

{
"username": "",
"password": ""
}

### 2b. Fungsi tes untuk login >> Valid
POST http://localhost:3000/api/users/login
Content-Type: application/json

{
"username": "test",
"password": "rahasia"
}

### 2c. Fungsi tes untuk login >> Password salah, User Benar
POST http://localhost:3000/api/users/login
Content-Type: application/json

{
"username": "test",
"password": "salah"
}

### 2d. Fungsi tes untuk login >> Password salah, User Salah
POST http://localhost:3000/api/users/login
Content-Type: application/json

{
"username": "test",
"password": "salah"
}
```

## 8. Membuat GET User API

### Langkah - langkah :

1. Endpoint dan response >> Pahami alamat End point dan bgmana responnya >> **GET /api/users/current, Headers : - Authorization : token** >>
2. Router : Request mengirim token >> **userRouter.get** >> authMiddleware >> Select users token >> req.user = user
   `userRouter.get('/api/users/current', userController.get);`
3. Membuat Middleware **authMiddleware**
   semua request yang menuju userRouter maka akan dilakukan pengecekan token, jika ditemukan next user-controller:get, jika tidak kirim errors: "Unauthorized"
4. Controller **user-service:get** >> const username = req.user.username,
   setelah authMiddleware sukses maka akan dilanjutkan ke controller bersama data user ke user-service:get

5. Service user-service:get >> 1.CekValidationUsername, 2.GetUsername, 4.Send username,name

```
const login = async (request) => {
    //1. cek validation >> jika error maka kirim pesan error, atau jika sesuai lanjutkan no.2
	const user = validate(getUserValidation, username);
    //2. Get username di database
    //3. Cek jika username tdk ada / === 0 maka kirim error 404, user is not found
    //jika countUser = 1 atau  ada maka lanjutkan no.4
    //4. kirim username,name sebagai response
}
```

6. Validasi username >> Data yg dikirim username >> validasi dahulu isinya

```
username = validate(getUserValidation, username);
```

7. Unit Test >>

```
// Fungsi tes untuk login POST /api/users/login
describe('login POST /api/users/login', function () {
    //1. sebelum tes, buat user test
    //2. setelah selesai test, hapus username: "test" di table/database
    //3. get user dg token yg valid
    //4. get user dg token yg invalid
})
```

### - a. GET Endpoint : GET /api/users/current

Endpoint : GET /api/users/current

Headers :

- Authorization : token

Response Body Success:

```json
{
  "data": {
    "username": "pzn",
    "name": "Programmer Zaman Now"
  }
}
```

Response Body Error :

```json
{
  "errors": "Unauthorized"
}
```

### - b. Membuat GET Validation sesuaikan dengan database

### - c. Membuat GET user-service

### - d. Membuat GET Controller >> user-controller.js

### - e. Membuat GET Route >> public-api.js

### - f. Unit Test GET

### - g. Request.Test GET

## 9. Membuat UPDATE User API

### Langkah - langkah :

### - a. UPDATE Endpoint : POST /api/users/login

### - b. Membuat UPDATE Validation sesuaikan dengan database

### - c. Membuat UPDATE user-service

### - d. Membuat UPDATE Controller >> user-controller.js

### - e. Membuat UPDATE Route >> public-api.js

### - f. Unit Test UPDATE

### - g. Request.Test UPDATE

## 10. Membuat LOGOUT User API

### Langkah - langkah :

### - a. LOGOUT Endpoint : POST /api/users/login

### - b. Membuat LOGOUT Validation sesuaikan dengan database

### - c. Membuat LOGOUT user-service

### - d. Membuat LOGOUT Controller >> user-controller.js

### - e. Membuat LOGOUT Route >> public-api.js

### - f. Unit Test LOGOUT

### - g. Request.Test LOGOUT

## 11. Membuat CREATE Contact API

## 12. Membuat GET Contact API

## 13. Membuat UPDATE Contact API

## 14. Membuat REMOVE Contact API

## 15. Membuat SEARCH Contact API

## 16. Membuat CREATE Address API

## 17. Membuat GET Address API

## 18. Membuat UPDATE Address API

## 19. Membuat REMOVE Address API

## 20. Membuat LIST Address API
