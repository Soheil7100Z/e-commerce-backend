import { AppError } from '../utils/AppError.js';
import { loginRepository, registerRepository, profileRepository } from '../repositories/user.repository.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export const registerService = async (userData) => {
  const { firstName, lastName, email, password } = userData;

  if (!firstName || !lastName || !email || !password) {
    throw new AppError('Vorname, Nachname, Email und Passwort sind pflicht!', 400);
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const userID = await registerRepository({ firstName, lastName, email, password: hashedPassword });

  return userID;
};

export const loginService = async (userData) => {
  const { email, password } = userData;
  if (!email || !password) throw new AppError('Email und Passwort sind pflicht!', 400);

  const user = await loginRepository(userData);
  if (!user) throw new AppError('E-Mail ist nicht registriert!', 400);

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) throw new AppError('Bitte geben Sie richtig Passwort ein!', 401);

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

  return token;
};

export const profileService = async (user_id) => {
  if (!user_id) throw new AppError('Benutzer-ID fehlt oder ist ungültig!', 401);

  const userData = await profileRepository(user_id);
  if (!userData || userData.length === 0) throw new AppError('Benutzer konnte nicht gefunden werden!', 404);

  return userData[0];
};
