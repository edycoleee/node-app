//src/test/user.test.js
import supertest from "supertest";
import { removeTestUser } from "./test-util.js";
import { app } from "../src/application.js";


// Fungsi tes untuk register POST /api/users
describe('Register POST /api/users', function () {

  beforeEach(async () => {
    await removeTestUser();
  })

  //1. setelah selesai test, hapus username: "test" di table/database
  afterEach(async () => {
    await removeTestUser();
  })

  //2. register user baru
  it('should can register new user', async () => {
    const result = await supertest(app)
      .post('/api/users')
      .send({
        username: 'test',
        password: 'rahasia',
        name: 'test'
      });

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("test");
    expect(result.body.data.name).toBe("test");
    console.log("REGISTER :", result.body.data);
    //expect(result.body.data.password).toBeUndefined();
  });

  //3. test body request invalid
  it('should reject if request is invalid', async () => {
    const result = await supertest(app)
      .post('/api/users')
      .send({
        username: '',
        password: '',
        name: ''
      });

    console.log("REGISTER INVALID :", result.status, result.body);
    expect(result.status).toBe(500);
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

    console.log("REGISTER 2 :", result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("test");
    expect(result.body.data.name).toBe("test");
    //expect(result.body.data.password).toBeUndefined();

    result = await supertest(app)
      .post('/api/users')
      .send({
        username: 'test',
        password: 'rahasia',
        name: 'test'
      });

    console.log("REGISTER REGISTERED :", result.status, result.body);

    expect(result.status).toBe(500);
    expect(result.body.errors).toBeDefined();
  });
});