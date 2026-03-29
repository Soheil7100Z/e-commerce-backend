import {
  registerService,
  loginService,
  getUserProfileService,
  updateProfileService,
  createAddressService,
  getUserAddressService,
} from '../services/user.service.js';

export const registerController = async (req, res, next) => {
  try {
    const userId = await registerService({ userData: req.body });

    res.status(201).json({
      message: 'Registrierung ist erfolgreich!',
      ID: userId,
    });
  } catch (err) {
    next(err);
  }
};

export const loginController = async (req, res, next) => {
  try {
    const userToken = await loginService({ userData: req.body });

    res.status(200).json({
      message: 'Anmeldung ist erfolgreich!',
      token: userToken,
    });
  } catch (err) {
    next(err);
  }
};

export const getUserProfileController = async (req, res, next) => {
  try {
    const userData = await getUserProfileService({ userId: req.user.id });

    res.status(200).json({
      message: 'Profil ist erfolgreich!',
      user: userData,
    });
  } catch (err) {
    next(err);
  }
};

export const updateProfileController = async (req, res, next) => {
  try {
    await updateProfileService({ userData: req.body, userId: req.user.id });

    res.status(200).json({
      message: 'Ihre Daten wurden gespeichert!',
    });
  } catch (err) {
    next(err);
  }
};

export const createAddressController = async (req, res, next) => {
  try {
    await createAddressService({ userAddress: req.body, userId: req.user.id });

    res.status(200).json({
      message: 'Adresse wurde gespeichert!',
    });
  } catch (err) {
    next(err);
  }
};

export const getUserAddressController = async (req, res, next) => {
  try {
    const address = await getUserAddressService({ userId: req.user.id });

    res.status(200).json({
      address,
    });
  } catch (err) {
    next(err);
  }
};
