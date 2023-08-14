if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

module.exports = {
  PG_NAME: process.env.PG_NAME || 'db_name',
  PG_USER: process.env.PG_USER || 'postgres',
  PG_PASS: process.env.PG_PASS || 'password',
  PG_HOST: process.env.PG_HOST || 'localhost',
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.HOST || 3001,
  JWT_SECRET: process.env.JWT_SECRET,
  SALT_OR_ROUNDS: process.env.SALT_OR_ROUNDS || 10
}
