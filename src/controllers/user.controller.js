import { registerService } from '../services/user.service.js';

export const registerController = async (req, res, next) => {
  const userId = await registerService(req.body);
  try {
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
