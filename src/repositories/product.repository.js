import db from '../config/db.js';

export const getHomeDataRepository = async () => {
  const getNewProductsWomen = `
    SELECT p.*, pi.image_url, pi.is_main
    FROM products p
    JOIN product_categories pc ON p.id = pc.product_id
    JOIN categories c ON c.id = pc.category_id
    JOIN product_images pi ON p.id = pi.product_id
    WHERE c.name = 'Women'
      AND pi.is_main = true
    ORDER BY p.created_at DESC
    LIMIT 5
  `;

  const getNewProductsMen = `
    SELECT p.*, pi.image_url, pi.is_main
    FROM products p
    JOIN product_categories pc ON p.id = pc.product_id
    JOIN categories c ON c.id = pc.category_id
    JOIN product_images pi ON p.id = pi.product_id
    WHERE c.name = 'Men'
      AND pi.is_main = true
    ORDER BY p.created_at DESC
    LIMIT 5
  `;

  const [newWomenProducts] = await db.query(getNewProductsWomen);
  const [newMenProducts] = await db.query(getNewProductsMen);

  return { newWomenProducts, newMenProducts };
};
