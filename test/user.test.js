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