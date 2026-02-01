import db from './db.js';

export async function initDB() {
  try {
    // await db.query(`DROP TABLE IF EXISTS users`);
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        firstName VARCHAR(255),
        lastName VARCHAR(255),
        email VARCHAR(191) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);

    console.log('Tabelle users erstellt ');
  } catch (err) {
    console.error('Fehler beim Erstellen der Tabelle:', err);
  }
}
