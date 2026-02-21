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

export const profileRepository = async (user_id) => {
  const findUserByid = 'SELECT firstName, lastName, email FROM users WHERE id = ?';
  const [result] = await db.query(findUserByid, [user_id]);

  return result;
};
