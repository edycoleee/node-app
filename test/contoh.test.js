//test/contoh.test.js
const request = require('supertest');
const { app } = require('../src/application');

//a. fungsi testing : describe >> it
describe.skip('TEST CONTOH PUBLIC API', () => {

  //1. TEST Valid username : edy  >> POST http://localhost:3000/api/contoh/public
  it('1a TEST POST http://localhost:3000/api/contoh/public', async () => {
    //a. kirim request app, POST "/api/contoh/public" dan tangkap hasilnya ke variable response
    const response = await request(app)
      //request, POST "/api/contoh/public"
      .post('/api/contoh/public')
      //request body 
      .send({
        username: "edy"
      })
    console.log("result.body 1a :", response.body);
    //b. Jika request berhasil ke server maka status response = 200
    expect(response.status).toBe(200);
    //c. Periksa isi response body seharusnya data.username adalah edy
    expect(response.body.data.username).toBe("edy");
    expect(response.body.data.name).toBe("edy kholid");
  });

  //1b. TEST Tidak Valid username : test  >> POST http://localhost:3000/api/contoh/public
  it('1b TEST POST http://localhost:3000/api/contoh/public', async () => {
    //a. kirim request app, POST "/api/contoh/public" dan tangkap hasilnya ke variable response
    const response = await request(app)
      //request, POST "/api/contoh/public"
      .post('/api/contoh/public')
      //request body 
      .send({
        username: "test"
      })
    console.log("result.body 1b :", response.body);
    //b. Jika request invalid maka status response = 400
    expect(response.status).toBe(400);
    //c. Periksa isi error seharusnya 'Username not edy'
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors).toBe('Username not edy');
  });

});

//jalankan test
//npx jest app.test.js

//b. fungsi testing : describe >> it >> test api dg middleware
describe('GET /api/contoh/current', function () {

  it('1. should reject if dont have token', async () => {
    const result = await request(app)
      .get('/api/contoh/current')
    console.log("result.body 1 :", result.body);
    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });

  it('2. should can get current user', async () => {
    const result = await request(app)
      .get('/api/contoh/current')
      .set('Authorization', 'rahasia');
    console.log("result.body 2 :", result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe('edy-dari-middleware');
    expect(result.body.data.name).toBe('Edy Cole');
  });

  it('3. should reject if token is invalid', async () => {
    const result = await request(app)
      .get('/api/contoh/current')
      .set('Authorization', 'salah');
    console.log("result.body 3 :", result.body);
    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});