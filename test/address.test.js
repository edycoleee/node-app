import { app } from "../src/application.js";
import supertest from "supertest";
import { createTestAddress, createTestContact, createTestUser, getTestAddress, getTestContact, removeAllTestAddresses, removeTestContact, removeTestUser } from "./test-util.js";

describe.skip('POST /api/contacts/:contactId/addresses', function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  })

  afterEach(async () => {
    await removeAllTestAddresses();
    await removeTestContact();
    await removeTestUser();
  })

  it('should can create new address', async () => {
    const testContact = await getTestContact();

    const result = await supertest(app)
      .post('/api/contacts/' + testContact.id + '/addresses')
      .set('Authorization', 'test')
      .send({
        street: "jalan test",
        city: 'kota test',
        province: 'provinsi test',
        country: 'indonesia',
        postal_code: '234234'
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.street).toBe('jalan test');
    expect(result.body.data.city).toBe('kota test');
    expect(result.body.data.province).toBe('provinsi test');
    expect(result.body.data.country).toBe('indonesia');
    expect(result.body.data.postal_code).toBe('234234');
  });

  it('should reject if address request is invalid', async () => {
    const testContact = await getTestContact();

    const result = await supertest(app)
      .post('/api/contacts/' + testContact.id + '/addresses')
      .set('Authorization', 'test')
      .send({
        street: "jalan test",
        city: 'kota test',
        province: 'provinsi test',
        country: '',
        postal_code: ''
      });

    expect(result.status).toBe(400);
  });

  it('should reject if contact is not found', async () => {
    const testContact = await getTestContact();

    const result = await supertest(app)
      .post('/api/contacts/' + (testContact.id + 1) + '/addresses')
      .set('Authorization', 'test')
      .send({
        street: "jalan test",
        city: 'kota test',
        province: 'provinsi test',
        country: '',
        postal_code: ''
      });

    expect(result.status).toBe(404);
  });
});

describe.skip('GET /api/contacts/:contactId/addresses/:addressId', function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
    await createTestAddress();
  })

  afterEach(async () => {
    await removeAllTestAddresses();
    await removeTestContact();
    await removeTestUser();
  })

  it('should can get contact', async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(app)
      .get('/api/contacts/' + testContact.id + '/addresses/' + testAddress.id)
      .set('Authorization', 'test');

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.street).toBe('jalan test');
    expect(result.body.data.city).toBe('kota test');
    expect(result.body.data.province).toBe('provinsi test');
    expect(result.body.data.country).toBe('indonesia');
    expect(result.body.data.postal_code).toBe('234234');
  });

  it('should reject if contact is not found', async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(app)
      .get('/api/contacts/' + (testContact.id + 1) + '/addresses/' + testAddress.id)
      .set('Authorization', 'test');

    expect(result.status).toBe(404);
  });

  it('should reject if address is not found', async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(app)
      .get('/api/contacts/' + testContact.id + '/addresses/' + (testAddress.id + 1))
      .set('Authorization', 'test');

    expect(result.status).toBe(404);
  });
});

describe.skip('PUT /api/contacts/:contactId/addresses/:addressId', function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
    await createTestAddress();
  })

  afterEach(async () => {
    await removeAllTestAddresses();
    await removeTestContact();
    await removeTestUser();
  })

  it('should can update address', async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(app)
      .put('/api/contacts/' + testContact.id + '/addresses/' + testAddress.id)
      .set('Authorization', 'test')
      .send({
        street: "street",
        city: 'city',
        province: 'provinsi',
        country: 'indonesia',
        postal_code: '1111'
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(testAddress.id);
    expect(result.body.data.street).toBe("street");
    expect(result.body.data.city).toBe("city");
    expect(result.body.data.province).toBe("provinsi");
    expect(result.body.data.country).toBe("indonesia");
    expect(result.body.data.postal_code).toBe("1111");
  });

  it('should reject if request is not valid', async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(app)
      .put('/api/contacts/' + testContact.id + '/addresses/' + testAddress.id)
      .set('Authorization', 'test')
      .send({
        street: "street",
        city: 'city',
        province: 'provinsi',
        country: '',
        postal_code: ''
      });

    expect(result.status).toBe(400);
  });

  it('should reject if address is not found', async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(app)
      .put('/api/contacts/' + testContact.id + '/addresses/' + (testAddress.id + 1))
      .set('Authorization', 'test')
      .send({
        street: "street",
        city: 'city',
        province: 'provinsi',
        country: 'indonesia',
        postal_code: '2312323'
      });

    expect(result.status).toBe(404);
  });

  it('should reject if contact is not found', async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(app)
      .put('/api/contacts/' + (testContact.id + 1) + '/addresses/' + testAddress.id)
      .set('Authorization', 'test')
      .send({
        street: "street",
        city: 'city',
        province: 'provinsi',
        country: 'indonesia',
        postal_code: '2312323'
      });

    expect(result.status).toBe(404);
  });
});

describe.skip('DELETE /api/contacts/:contactId/addresses/:addressId', function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
    await createTestAddress();
  })

  afterEach(async () => {
    await removeAllTestAddresses();
    await removeTestContact();
    await removeTestUser();
  })

  it('should can remove address', async () => {
    const testContact = await getTestContact();
    let testAddress = await getTestAddress();

    const result = await supertest(app)
      .delete('/api/contacts/' + testContact.id + '/addresses/' + testAddress.id)
      .set('Authorization', 'test');

    expect(result.status).toBe(200);
    expect(result.body.data).toBe("OK");

    testAddress = await getTestAddress();
    expect(testAddress).toBeNull();
  });

  it('should reject if address is not found', async () => {
    const testContact = await getTestContact();
    let testAddress = await getTestAddress();

    const result = await supertest(app)
      .delete('/api/contacts/' + testContact.id + '/addresses/' + (testAddress.id + 1))
      .set('Authorization', 'test');

    expect(result.status).toBe(404);
  });

  it('should reject if contact is not found', async () => {
    const testContact = await getTestContact();
    let testAddress = await getTestAddress();

    const result = await supertest(app)
      .delete('/api/contacts/' + (testContact.id + 1) + '/addresses/' + testAddress.id)
      .set('Authorization', 'test');

    expect(result.status).toBe(404);
  });
});

describe.skip('GET /api/contacts/:contactId/addresses', function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
    await createTestAddress();
  })

  afterEach(async () => {
    await removeAllTestAddresses();
    await removeTestContact();
    await removeTestUser();
  })

  it('should can list addresses', async function () {
    const testContact = await getTestContact();

    const result = await supertest(app)
      .get('/api/contacts/' + testContact.id + "/addresses")
      .set('Authorization', 'test');

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(1);
  });

  it('should reject if contact is not found', async function () {
    const testContact = await getTestContact();

    const result = await supertest(app)
      .get('/api/contacts/' + (testContact.id + 1) + "/addresses")
      .set('Authorization', 'test');

    expect(result.status).toBe(404);
  });
});