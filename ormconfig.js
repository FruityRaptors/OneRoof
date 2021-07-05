const pgconnection = require("pg-connection-string")
require('dotenv').config()

let connectionOptions = ''
const databaseUrl = process.env.DATABASE_URL

if (databaseUrl){
  connectionOptions = pgconnection.parse(databaseUrl)
}

let connectionConfig = {
   "name": 'default',
   "type": "postgres",
   "host": connectionOptions.host || 'localhost',
   "port": connectionOptions.port || 5432,
   "username": connectionOptions.user || process.env.DB_USER,
   "password": connectionOptions.password || process.env.DB_PASS,
   "database": connectionOptions.database || process.env.DB_NAME,
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

 if (databaseUrl){
    connectionConfig.extra = {ssl: { rejectUnauthorized: false }}
 }


module.exports = connectionConfig

//`/cloudsql/${process.env.CLOUD_SQL_CONNECTION_NAME}` || 

