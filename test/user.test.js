//src/test/user.test.js
import supertest from "supertest";
import { createTestUser, getTestUser, removeTestUser } from "./test-util.js";
import { app } from "../src/application.js";
import bcrypt from "bcrypt";

// Fungsi tes untuk register POST /api/users
describe.skip('Register POST /api/users', function () {

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

describe.skip('POST /api/users/login', function () {
  beforeEach(async () => {
    await removeTestUser();
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it('1. should can login', async () => {
    const result = await supertest(app)
      .post('/api/users/login')
      .send({
        username: "test",
        password: "rahasia"
      });

    console.log("result.body 1 :", result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.token).toBeDefined();
    expect(result.body.data.token).not.toBe("test");
  });

  it('2. should reject login if request is invalid', async () => {
    const result = await supertest(app)
      .post('/api/users/login')
      .send({
        username: "",
        password: ""
      });

    console.log("result.body 2 :", result.body);

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it('3. should reject login if password is wrong', async () => {
    const result = await supertest(app)
      .post('/api/users/login')
      .send({
        username: "test",
        password: "salah"
      });

    console.log("result.body 3 :", result.body);

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });

  it('4. should reject login if username is wrong', async () => {
    const result = await supertest(app)
      .post('/api/users/login')
      .send({
        username: "salah",
        password: "salah"
      });

    console.log("result.body 4 :", result.body);

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});

describe.skip('GET /api/users/current', function () {
  beforeEach(async () => {
    await removeTestUser();
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it('1. should can get current user', async () => {
    const result = await supertest(app)
      .get('/api/users/current')
      .set('Authorization', 'test');
    console.log("result.body 1 :", result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe('test');
    expect(result.body.data.name).toBe('test');
  });

  it('2. should reject if token is invalid', async () => {
    const result = await supertest(app)
      .get('/api/users/current')
      .set('Authorization', 'salah');
    console.log("result.body 2 :", result.body);
    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});

describe('PATCH /api/users/current', function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it('1. should can update user', async () => {
    const result = await supertest(app)
      .patch("/api/users/current")
      .set("Authorization", "test")
      .send({
        name: "Edy",
        password: "rahasialagi"
      });
    console.log("result.body 1 :", result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("test");
    expect(result.body.data.name).toBe("Edy");

    const user = await getTestUser();
    console.log("user getTestUser  :", user);
    expect(await bcrypt.compare("rahasialagi", user.password)).toBe(true);
  });

  it('2. should can update user name', async () => {
    const result = await supertest(app)
      .patch("/api/users/current")
      .set("Authorization", "test")
      .send({
        name: "Edy Lagi"
      });
    console.log("result.body 2 :", result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("test");
    expect(result.body.data.name).toBe("Edy Lagi");
  });

  it('3. should can update user password', async () => {
    const result = await supertest(app)
      .patch("/api/users/current")
      .set("Authorization", "test")
      .send({
        password: "rahasialagi"
      });
    console.log("result.body 3 :", result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("test");
    expect(result.body.data.name).toBe("test");

    const user = await getTestUser();
    console.log("user getTestUser  :", user);
    expect(await bcrypt.compare("rahasialagi", user.password)).toBe(true);
  });

  it('4. should reject if request is not valid', async () => {
    const result = await supertest(app)
      .patch("/api/users/current")
      .set("Authorization", "salah")
      .send({});
    console.log("result.body 4 :", result.body);
    expect(result.status).toBe(401);
  });
});