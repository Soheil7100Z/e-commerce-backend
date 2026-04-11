import db from '../config/db.js';
import { getProducts } from './products.js';

export async function seedProducts() {
  const [rows] = await db.query(`SELECT COUNT(*) as count FROM products`);
  if (rows[0].count > 0) {
    console.log('Products already exist!');
    return;
  }

  console.log('Seeding 20 products...');

  await db.beginTransaction();

  try {
    await db.query(`
      INSERT IGNORE INTO categories (name) VALUES ('Men'), ('Women')
    `);

    const [categories] = await db.query(`SELECT * FROM categories`);

    const menCategory = categories.find((c) => c.name === 'Men');
    const womenCategory = categories.find((c) => c.name === 'Women');

    if (!menCategory || !womenCategory) throw new Error('Categories not found!');

    const menCategoryId = menCategory.id;
    const womenCategoryId = womenCategory.id;

    const products = getProducts(menCategoryId, womenCategoryId);

    for (const product of products) {
      const [result] = await db.query(`INSERT INTO products (name, description, brand) VALUES (?, ?, ?)`, [
        product.name,
        product.desc,
        product.brand,
      ]);

      const productId = result.insertId;

      await db.query(`INSERT INTO product_categories (product_id, category_id) VALUES (?, ?)`, [
        productId,
        product.categoryId,
      ]);

      await db.query(
        `INSERT INTO product_variants (product_id, size, color, price, stock, sku)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          productId,
          product.size,
          product.color,
          product.price,
          product.stock,
          `SKU-${productId}-${product.size}-${product.color}`,
        ]
      );

      await db.query(
        `INSERT INTO product_images (product_id, image_url, is_main)
         VALUES (?, ?, true)`,
        [productId, product.imageUrl]
      );
    }

    await db.commit();
    console.log('All 20 products inserted successfully!');
  } catch (err) {
    await db.rollback();
    console.error('Seeding failed: ', err);
  }
}
