import { AppError } from '../utils/AppError.js';
import { registerRepository } from '../repositories/user.repository.js';
import bcrypt from 'bcryptjs';


export const registerService = async (userData) => {
  const { firstName, lastName, email, password } = userData;

  if (!firstName || !lastName || !email || !password) {
    throw new AppError('Vorname, Nachname, Email und Passwort sind pflicht!', 400);
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const userID = await registerRepository({ firstName, lastName, email, password: hashedPassword });
  return userID;
};


