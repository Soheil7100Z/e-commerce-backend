import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.DB_PASS,
});

await connection.query(`CREATE DATABASE IF NOT EXISTS ecommerce`);

console.log('Database ecommerce ready ');

const db = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.DB_PASS,
  database: 'ecommerce',
});

console.log('MySQL connected to ecommerce ');

export default db;
