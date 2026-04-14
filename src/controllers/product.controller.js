import { getHomeDataService } from '../services/product.service.js';

export const getHomeDataController = async (req, res, next) => {
  try {
    const homeData = await getHomeDataService();

    res.status(200).json({
      homeData,
    });
  } catch (err) {
    next(err);
  }
};
