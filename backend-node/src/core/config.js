require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 8000,
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_USER: process.env.DB_USER || 'root',
  DB_PASSWORD: process.env.DB_PASSWORD || 'your_password',
  DB_NAME: process.env.DB_NAME || 'campus_notice',
  JWT_SECRET: process.env.JWT_SECRET || 'your_node_secret_key'
};
