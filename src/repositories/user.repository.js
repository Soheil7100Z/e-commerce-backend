import db from '../config/db.js';

export const registerRepository = async (userData) => {
  const { firstName, lastName, email, password } = userData;

  const insertUserSQL = 'INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)';
  const [result] = await db.query(insertUserSQL, [firstName, lastName, email, password]);

  return result.insertId;
};

export const loginRepository = async ({ email }) => {
  const findUserEmail = 'SELECT id, email, password FROM users WHERE email = ?';
  const [result] = await db.query(findUserEmail, [email]);

  return result[0];
};

export const getUserProfileRepository = async (userId) => {
  const findUserByid = 'SELECT * FROM users WHERE id = ?';
  const [result] = await db.query(findUserByid, [userId]);

  return result;
};

export const updateProfileRepository = async ({ userId, ...editedData }) => {
  const fields = Object.keys(editedData);
  const values = Object.values(editedData);

  const setClause = fields.map((field) => `${field} = ?`).join(', ');
  const updateUserData = `UPDATE users SET ${setClause} WHERE id = ?`;

  const [result] = await db.query(updateUserData, [...values, userId]);

  return result.affectedRows;
};

export const createAddressRepository = async ({ deliveryAddressValuesTrim, billingAddressValuesTrim = [], userId }) => {
  const insertAddress = `
  INSERT INTO addresses
  (user_id, type, firstName, lastName, street, houseNumber, postcode, city, country)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  await db.query(insertAddress, [userId, 'delivery', ...deliveryAddressValuesTrim]);

  if (billingAddressValuesTrim.length) await db.query(insertAddress, [userId, 'billing', ...billingAddressValuesTrim]);
};

export const getUserAddressRepository = async (userId) => {
  const findUserAddressById = 'SELECT * FROM addresses WHERE user_id = ?';
  const [result] = await db.query(findUserAddressById, [userId]);

  return result;
};
