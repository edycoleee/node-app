//src/test/contact.test.js
import supertest from "supertest";
import { app } from "../src/application.js";
import {
  createTestUser,
  removeTestContact,
  removeTestUser,
} from "./test-util.js";

describe("POSY /api/contacts", function () {
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
