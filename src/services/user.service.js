import { AppError } from '../utils/AppError.js';
import {
  loginRepository,
  registerRepository,
  profileRepository,
  updateProfileRepository,
} from '../repositories/user.repository.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

import { emailValidation, passwordValidation } from '../utils/validator.js';

dotenv.config();

export const registerService = async ({ userData }) => {
  const { firstName, lastName, email, password } = userData;

  if (!firstName || !lastName || !email || !password) {
    throw new AppError('Vorname, Nachname, Email und Passwort sind pflicht!', 400);
  }

  const trimFirstName = firstName.trim();
  const trimLastName = lastName.trim();

  const normalizedEmail = email.trim().toLowerCase();

  const isEmailValid = emailValidation(normalizedEmail);
  if (!isEmailValid) throw new AppError('E-mail ist ungültig!', 400);

  const isPasswordValid = passwordValidation(password);
  if (!isPasswordValid) throw new AppError('Passwort ist ungültig!', 400);

  const hashedPassword = await bcrypt.hash(password, 10);
  const userID = await registerRepository({
    firstName: trimFirstName,
    lastName: trimLastName,
    email: normalizedEmail,
    password: hashedPassword,
  });

  return userID;
};

export const loginService = async ({ userData }) => {
  const { email, password } = userData;
  if (!email || !password) throw new AppError('Email und Passwort sind pflicht!', 400);

  const normalizedEmail = email.trim().toLowerCase();

  const isEmailValid = emailValidation(normalizedEmail);
  if (!isEmailValid) throw new AppError('E-mail ist ungültig!', 400);

  const user = await loginRepository({ email: normalizedEmail });
  if (!user) throw new AppError('E-Mail ist nicht registriert!', 400);

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) throw new AppError('Passwort oder E-mail ist falsch!', 401);

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  return token;
};

export const profileService = async ({ user_id }) => {
  if (!user_id) throw new AppError('Benutzer-ID fehlt oder ist ungültig!', 401);

  const userData = await profileRepository(user_id);
  if (!userData || userData.length === 0) throw new AppError('Benutzer konnte nicht gefunden werden!', 404);

  return userData[0];
};

export const updateProfileService = async ({ userData, user_id }) => {
  const { firstName, lastName, phone, password } = userData;

  if (!firstName || !lastName) throw new AppError('Vorname, Nachname sind pflicht!', 400);

  const [originalUserData] = await profileRepository(user_id);

  const editedData = {};

  const trimFirstName = firstName.trim();
  const trimLastName = lastName.trim();

  if (trimFirstName !== originalUserData.firstName) editedData.firstName = trimFirstName;
  if (trimLastName !== originalUserData.lastName) editedData.lastName = trimLastName;

  if (phone) {
    const trimPhone = phone.trim();
    if (trimPhone !== originalUserData.phone) editedData.phone = trimPhone;
  } else {
    editedData.phone = null;
  }

  if (password) {
    const passwordMatch = await bcrypt.compare(password, originalUserData.password);
    if (!passwordMatch) {
      const hashedPassword = await bcrypt.hash(password, 10);
      editedData.password = hashedPassword;
    }
  }

  if (Object.keys(editedData).length === 0) throw new AppError('Es gibt kein neue Angaben zu speichern!', 400);

  const affectedRowsResult = await updateProfileRepository({ user_id, ...editedData });

  if (affectedRowsResult === 0) throw new AppError('Benutzer nicht gefunden!', 404);
};
