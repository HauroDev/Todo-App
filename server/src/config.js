if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

module.exports = {
  PG_NAME: process.env.PG_NAME,
  PG_USER: process.env.PG_USER,
  PG_PASS: process.env.PG_PASS,
  PG_HOST: process.env.PG_HOST,
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.HOST,
  JWT_SECRET: process.env.JWT_SECRET,
  SALT_OR_ROUNDS: process.env.SALT_OR_ROUNDS,
  URL_DEVELOPMENT: process.env.URL_DEVELOPMENT,
  URL_PRODUCTION: process.env.URL_PRODUCTION,
  URL_CLIENT_PRODUCTION: process.env.URL_CLIENT_PRODUCTION,
  URL_CLIENT_DEVELOPMENT: process.env.URL_CLIENT_DEVELOPMENT
}
