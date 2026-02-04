import db from '../config/db.js';

export const registerRepository = async (userData) => {
  const { firstName, lastName, email, password } = userData;
  const insertUserSQL = 'INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)';
  const [result] = await db.query(insertUserSQL, [firstName, lastName, email, password]);
  return result.insertId;
};

