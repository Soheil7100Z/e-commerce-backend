import { getHomeDataRepository } from '../repositories/product.repository.js';
import { AppError } from '../utils/AppError.js';

export const getHomeDataService = async () => {
  const newProducts = await getHomeDataRepository();
  const { newWomenProducts, newMenProducts } = newProducts;

  if (newWomenProducts.length === 0) throw new AppError('Neue Produkte für Damen nicht gefunden!', 404);
  if (newMenProducts.length === 0) throw new AppError('Neue Produkte für Herren nicht gefunden!', 404);

  const mixedProducts = [...newWomenProducts, ...newMenProducts].sort(() => Math.random() - 0.5);

  return mixedProducts;
};
