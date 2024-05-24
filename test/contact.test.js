//src/test/contact.test.js
import supertest from "supertest";
import { app } from "../src/application.js";
import {
  createTestContact,
  createTestUser,
  getTestContact,
  removeTestContact,
  removeTestUser,
} from "./test-util.js";

describe.skip("POST /api/contacts", function () {
  //1.CREATE TEST USER >>
  beforeEach(async () => {
    await removeTestContact();
    await createTestUser();
  });
  //3.REMOVE ALL CONTACT >>
  //4.REMOVE TEST USER >>
  afterEach(async () => {
    await removeTestContact();
    await removeTestUser();
  });
  //2a.CREATE CONTACT VALID >>
  it("2a. create new contact valid", async () => {
    const result = await supertest(app)
      .post("/api/contacts")
      .set("Authorization", "test")
      .send({
        first_name: "test",
        last_name: "test",
        email: "test@gmail.com",
        phone: "08090000000",
      });
    console.log("result.body 2a :", result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.first_name).toBe("test");
    expect(result.body.data.last_name).toBe("test");
    expect(result.body.data.email).toBe("test@gmail.com");
    expect(result.body.data.phone).toBe("08090000000");
  });

  //2b.CREATE CONTACT INVALID
  it('2b. create new contact invalid', async () => {
    const result = await supertest(app)
      .post("/api/contacts")
      .set('Authorization', 'test')
      .send({
        first_name: "",
        last_name: "test",
        email: "test",
        phone: "0809000000043534534543534534543535345435435"
      });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});


describe.skip('GET /api/contacts/:contactId', function () {
  //1. SEBELUM TEST(DELETE TEST USER, DELETE TEST CONTACT, CREATE TEST USER, CREATE TEST CONTACT)
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  })
  //2. SESUDAH TEST(DELETE TEST USER, DELETE TEST CONTACT), 
  afterEach(async () => {
    await removeTestContact();
    await removeTestUser();
  })

  it('4. Test Kontak >> VALID', async () => {
    //3. GET DATA KONTAK UTK MENDAPATKAN ID, 
    const testContact = await getTestContact();
    //4. GET TEST CONTACT : ID, API >> VALID, 
    const result = await supertest(app)
      .get("/api/contacts/" + testContact.id)
      .set('Authorization', 'test');

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(testContact.id);
    expect(result.body.data.first_name).toBe(testContact.first_name);
    expect(result.body.data.last_name).toBe(testContact.last_name);
    expect(result.body.data.email).toBe(testContact.email);
    expect(result.body.data.phone).toBe(testContact.phone);
  });

  it('5. Test Kontak >> NOTFOUND contact id', async () => {
    //5. GET DATA KONTAK UTK MENDAPATKAN ID, 
    const testContact = await getTestContact();
    //6. GET TEST CONTACT :ID+1, API >> NOT FOUND
    const result = await supertest(app)
      .get("/api/contacts/" + (testContact.id + 1))
      .set('Authorization', 'test');

    expect(result.status).toBe(404);
  });
});


describe.skip('PUT /api/contacts/:contactId', function () {
  //1. SEBELUM TEST(DELETE TEST USER, DELETE TEST CONTACT, CREATE TEST USER, CREATE TEST CONTACT)
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  })
  //2. SESUDAH TEST(DELETE TEST USER, DELETE TEST CONTACT), 
  afterEach(async () => {
    await removeTestContacts();
    await removeTestUser();
  })

  it('4. UPDATE KONTAK >> VALID', async () => {
    //3. GET DATA KONTAK UTK MENDAPATKAN ID, 
    const testContact = await getTestContact();
    //4. UPDATE KONTAK >> VALID
    const result = await supertest(web)
      .put('/api/contacts/' + testContact.id)
      .set('Authorization', 'test')
      .send({
        first_name: "Edy",
        last_name: "Cole",
        email: "edy@gmail.com",
        phone: "09999999"
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(testContact.id);
    expect(result.body.data.first_name).toBe("Edy");
    expect(result.body.data.last_name).toBe("Cole");
    expect(result.body.data.email).toBe("edy@gmail.com");
    expect(result.body.data.phone).toBe("09999999");
  });

  it('should reject if request is invalid', async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .put('/api/contacts/' + testContact.id)
      .set('Authorization', 'test')
      .send({
        first_name: "",
        last_name: "",
        email: "eko",
        phone: ""
      });

    expect(result.status).toBe(400);
  });

  it('should reject if contact is not found', async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .put('/api/contacts/' + (testContact.id + 1))
      .set('Authorization', 'test')
      .send({
        first_name: "Eko",
        last_name: "Khannedy",
        email: "eko@pzn.com",
        phone: "09999999"
      });

    expect(result.status).toBe(404);
  });
});

describe.skip('DELETE /api/contacts/:contactId', function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  })

  afterEach(async () => {
    await removeAllTestContacts();
    await removeTestUser();
  })

  it('should can delete contact', async () => {
    let testContact = await getTestContact();
    const result = await supertest(web)
      .delete('/api/contacts/' + testContact.id)
      .set('Authorization', 'test');

    expect(result.status).toBe(200);
    expect(result.body.data).toBe("OK");

    testContact = await getTestContact();
    expect(testContact).toBeNull();
  });

  it('should reject if contact is not found', async () => {
    let testContact = await getTestContact();
    const result = await supertest(web)
      .delete('/api/contacts/' + (testContact.id + 1))
      .set('Authorization', 'test');

    expect(result.status).toBe(404);
  });
});

describe.skip('GET /api/contacts', function () {
  beforeEach(async () => {
    await createTestUser();
    await createManyTestContacts();
  })

  afterEach(async () => {
    await removeAllTestContacts();
    await removeTestUser();
  })

  it('should can search without parameter', async () => {
    const result = await supertest(web)
      .get('/api/contacts')
      .set('Authorization', 'test');

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(10);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(2);
    expect(result.body.paging.total_item).toBe(15);
  });

  it('should can search to page 2', async () => {
    const result = await supertest(web)
      .get('/api/contacts')
      .query({
        page: 2
      })
      .set('Authorization', 'test');

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(5);
    expect(result.body.paging.page).toBe(2);
    expect(result.body.paging.total_page).toBe(2);
    expect(result.body.paging.total_item).toBe(15);
  });

  it('should can search using name', async () => {
    const result = await supertest(web)
      .get('/api/contacts')
      .query({
        name: "test 1"
      })
      .set('Authorization', 'test');

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(6);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(1);
    expect(result.body.paging.total_item).toBe(6);
  });

  it('should can search using email', async () => {
    const result = await supertest(web)
      .get('/api/contacts')
      .query({
        email: "test1"
      })
      .set('Authorization', 'test');

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(6);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(1);
    expect(result.body.paging.total_item).toBe(6);
  });

  it('should can search using phone', async () => {
    const result = await supertest(web)
      .get('/api/contacts')
      .query({
        phone: "0809000001"
      })
      .set('Authorization', 'test');

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(6);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(1);
    expect(result.body.paging.total_item).toBe(6);
  });
});