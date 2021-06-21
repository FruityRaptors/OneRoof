const pgconnection = require("pg-connection-string")
require('dotenv').config()

const databaseUrl = process.env.DATABASE_URL
const connectionOptions = pgconnection.parse(databaseUrl)

module.exports = {
   "name": 'default',
   "type": "postgres",
   "host": connectionOptions.host,
   "port": connectionOptions.port,
   "extra": {
      ssl: { rejectUnauthorized: false }
 },
   "username": connectionOptions.user,
   "password": connectionOptions.password,
   "database": connectionOptions.database,
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
   "connectionDisplay": connectionOptions
}

//`/cloudsql/${process.env.CLOUD_SQL_CONNECTION_NAME}` || 

