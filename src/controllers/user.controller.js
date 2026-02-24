import { registerService, loginService, profileService } from '../services/user.service.js';

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

export const profileController = async (req, res, next) => {
  try {
    const userData = await profileService({ user_id: req.user.id });

    res.status(200).json({
      message: 'Profil ist erfolgreich!',
      user: userData,
    });
  } catch (err) {
    next(err);
  }
};
