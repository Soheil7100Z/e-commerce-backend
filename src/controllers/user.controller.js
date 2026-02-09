import { registerService, loginService } from '../services/user.service.js';

export const registerController = async (req, res, next) => {
  try {
    const userId = await registerService(req.body);

    if (userId) {
      res.status(201).json({
        message: 'Registrierung ist erfolgreich!',
        ID: userId,
      });
    }
  } catch (err) {
    next(err);
  }
};

export const loginController = async (req, res, next) => {
  try {
    const userToken = await loginService(req.body);
    if (userToken) {
      res.status(200).json({
        message: 'Anmeldung ist erfolgreich!',
        token: userToken,
      });
    }
  } catch (err) {
    next(err);
  }
};
