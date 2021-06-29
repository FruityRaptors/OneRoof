/* const pgconnection = require("pg-connection-string") */
require('dotenv').config()

/* const databaseUrl = process.env.DATABASE_URL
const connectionOptions = pgconnection.parse(databaseUrl) */

module.exports = {
   // the following has changed: change back for Heroku deploy:
   "name": 'default',
   "type": "postgres",
   "host": "localhost",
   "port": 5432,
   "username": process.env.DB_USER,
   "password": process.env.DB_PASS,
   "database": process.env.DB_NAME,
   // replace the above with the long section below. In addition, uncomment line 34!
   "synchronize": true,
   "logging": false,
   "entities": [
      `${__dirname}/dist/server/entity/**/*.js`
   ],
   "migrations": [
      `${__dirname}/dist/server/migration/**/*.js`
   ],
   "subscribers": [
      `${__dirname}/dist/server/subscriber/**/*.js`
   ],
   "cli": {
      "entitiesDir": `${__dirname}/dist/server/entity`,
      "migrationsDir": `${__dirname}/dist/server/migration`,
   },
   // uncomment this for heroku!

   /* "connectionDisplay": connectionOptions */
}

// here lies the heroku deployment!

/* "host": connectionOptions.host,
   "port": connectionOptions.port,
   "extra": {
      ssl: { rejectUnauthorized: false }
   },
   "username": connectionOptions.user,
   "password": connectionOptions.password,
   "database": connectionOptions.database, */

