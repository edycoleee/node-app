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

## 4. Setting Database

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
function createResponseError(status, message) {
    const error = new Error(message);
    error.status = status;
    return error;
}

export { createResponseError };
//const error = createResponseError(404, "Not Found");

```

b. Membuat fungsi errorMiddleware(err, req, res, next)

1.jika tidak error >> next, 2. jika error dari ResponseError kirim status dan pesan error, 3. jika error diluar response kirim status 500 dan pesan error.

```
//src/middleware/error-middleware.js
import {ResponseError} from "../error/response-error.js";

const errorMiddleware = async (err, req, res, next) => {
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

    // Jika pesan error validation kirim error validation
    //else if (err instanceof ValidationError) {
    //  res.status(400).json({
    //    errors: err.message
    //  })
    //}

    //3. jika error selain itu maka kirim status 500 dan pesan error
    }  else {
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

app.use(publicRouter);
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
    //2. register user baru
    //3. test body request invalid
    //4. test user yang sudah terdaftar
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
//validation/user-validation.js
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
import {validate} from "../validation/validation.js";
import {
    getUserValidation,
} from "../validation/user-validation.js";
import bcrypt from "bcrypt";

const register = async (request) => {

    //1. cek validation >> jika error maka kirim pesan error, atau jika sesuai lanjutkan no.2
    const user = validate(registerUserValidation, request);
    //2. Get username di database
    const countUser = await prismaClient.user.count({
        where: {
            username: user.username
        }
    });
    //3. Cek jika username sudah ada / === 1 maka kirim error 400, user sudah ada
    //jika countUser = 0 atau belum ada maka lanjutkan no.4
    if (countUser === 1) {
        throw new ResponseError(400, "Username already exists");
    }

    //4. encrypt dg bcrypt password agar tidak terlihat langsung di database
    user.password = await bcrypt.hash(user.password, 10);

    //5. buat user baru ke database
    return prismaClient.user.create({
        data: user,
        select: {
            username: true,
            name: true
        }
    });
}

export default {
    register,
}
```

### - e. Membuat Controller >> user-controller.js

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

### - f. Membuat Route >> public-api.js

Membuat routing POST /api/users >> userController.register

```
//src/route// public-api.js
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
```

### - g. Unit Test

```
//src/test/user.test.js
import supertest from "supertest";
import {app} from "../src/application/web.js";
import bcrypt from "bcrypt";

// Fungsi tes untuk register POST /api/users
describe('Register POST /api/users', function () {

    //1. setelah selesai test, hapus username: "test" di table/database
    afterEach(async () => {
        await removeTestUser();
    })

    //2. register user baru
    it('should can register new user', async () => {
        const result = await supertest(web)
            .post('/api/users')
            .send({
                username: 'test',
                password: 'rahasia',
                name: 'test'
            });

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("test");
        expect(result.body.data.name).toBe("test");
        expect(result.body.data.password).toBeUndefined();
    });

    //3. test body request invalid
    it('should reject if request is invalid', async () => {
        const result = await supertest(web)
            .post('/api/users')
            .send({
                username: '',
                password: '',
                name: ''
            });

        logger.info(result.body);

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    //4. test user yang sudah terdaftar
    it('should reject if username already registered', async () => {
        let result = await supertest(web)
            .post('/api/users')
            .send({
                username: 'test',
                password: 'rahasia',
                name: 'test'
            });

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("test");
        expect(result.body.data.name).toBe("test");
        expect(result.body.data.password).toBeUndefined();

        result = await supertest(web)
            .post('/api/users')
            .send({
                username: 'test',
                password: 'rahasia',
                name: 'test'
            });

        logger.info(result.body);

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });
});

```

```
//src/test/test-util.js

import {prismaClient} from "../src/application/database.js";
import bcrypt from "bcrypt";

export const removeTestUser = async () => {
    await prismaClient.user.deleteMany({
        where: {
            username: "test"
        }
    })
}

```
