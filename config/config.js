require('dotenv/config');
const fs = require('fs');

module.exports = {
  development: {
    appAddress: process.env.APP_ADDRESS,
    appPort: process.env.APP_PORT,
    appUrl: `${process.env.APP_ADDRESS}:${process.env.APP_PORT}`,

    defaultEmail: process.env.DEFAULT_EMAIL,
    defaultPassword: process.env.DEFAULT_PASSWORD,

    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_CONNECTION,
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  test: {
    appAddress: process.env.APP_ADDRESS,
    appPort: process.env.APP_PORT,
    appUrl: `${process.env.APP_ADDRESS}:${process.env.APP_PORT}`,

    defaultEmail: process.env.DEFAULT_EMAIL,
    defaultPassword: process.env.DEFAULT_PASSWORD,

    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_CONNECTION,
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  production: {
    appAddress: process.env.APP_ADDRESS,
    appPort: process.env.APP_PORT,
    appUrl: `${process.env.APP_ADDRESS}:${process.env.APP_PORT}`,

    defaultEmail: process.env.DEFAULT_EMAIL,
    defaultPassword: process.env.DEFAULT_PASSWORD,

    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_CONNECTION,
    dialectOptions: {
      bigNumberStrings: true,
      // ssl: {
      //   ca: fs.readFileSync(__dirname + '/mysql-ca-master.crt')
      // }
    },
  },
};
