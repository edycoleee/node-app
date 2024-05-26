import { ResponseError } from "../error/response-error.js";
import { query } from "../util/db.js";
import { createAddressValidation, getAddressValidation, updateAddressValidation } from "../validation/address-validation.js";
import { getContactValidation } from "../validation/contact-validation.js";
import { validate } from "../validation/validation.js";


const checkContactMustExists = async (user, contactId) => {
  contactId = validate(getContactValidation, contactId);

  const rows = await query(
    'SELECT COUNT(*) as count FROM contacts WHERE username = ? AND id = ?',
    [user.username, contactId]
  );

  if (rows[0].count !== 1) {
    throw new ResponseError(404, "contact is not found");
  }

  return contactId;
}

const create = async (user, contactId, request) => {
  contactId = await checkContactMustExists(user, contactId);

  const address = validate(createAddressValidation, request);
  address.contact_id = contactId;

  const result = await query(
    'INSERT INTO addresses (contact_id, street, city, province, country, postal_code) VALUES (?, ?, ?, ?, ?, ?)',
    [address.contact_id, address.street, address.city, address.province, address.country, address.postal_code]
  );

  return {
    id: result.insertId,
    ...address
  };
}

const get = async (user, contactId, addressId) => {
  contactId = await checkContactMustExists(user, contactId);
  addressId = validate(getAddressValidation, addressId);

  const rows = await query(
    'SELECT id, street, city, province, country, postal_code FROM addresses WHERE contact_id = ? AND id = ?',
    [contactId, addressId]
  );

  if (rows.length === 0) {
    throw new ResponseError(404, "address is not found");
  }

  return rows[0];
}

const update = async (user, contactId, request) => {
  contactId = await checkContactMustExists(user, contactId);
  const address = validate(updateAddressValidation, request);

  const result = await query(
    'UPDATE addresses SET street = ?, city = ?, province = ?, country = ?, postal_code = ? WHERE contact_id = ? AND id = ?',
    [address.street, address.city, address.province, address.country, address.postal_code, contactId, address.id]
  );

  if (result.affectedRows === 0) {
    throw new ResponseError(404, "address is not found");
  }

  return {
    id: address.id,
    ...address
  };
}

const remove = async (user, contactId, addressId) => {
  contactId = await checkContactMustExists(user, contactId);
  addressId = validate(getAddressValidation, addressId);

  const result = await query(
    'DELETE FROM addresses WHERE contact_id = ? AND id = ?',
    [contactId, addressId]
  );

  if (result.affectedRows === 0) {
    throw new ResponseError(404, "address is not found");
  }

  return { id: addressId };
}

const list = async (user, contactId) => {
  contactId = await checkContactMustExists(user, contactId);

  const rows = await query(
    'SELECT id, street, city, province, country, postal_code FROM addresses WHERE contact_id = ?',
    [contactId]
  );

  return rows;
}

export default {
  create,
  get,
  update,
  remove,
  list
}