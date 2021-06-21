const pgconnection = require("pg-connection-string")

const databaseUrl = process.env.DATABASE_URL
const connectionOptions = pgconnection.parse(databaseUrl)

module.exports = {
   "name": connectionOptions.name,
   "type": "postgres",
   "host": connectionOptions.host,
   "port": connectionOptions.port,
   "extra": {
      ssl: true
 },
   "username": connectionOptions.username,
   "password": connectionOptions.password,
   "database": connectionOptions.database,
   "synchronize": true,
   "logging": false,
   "entities": [
      "./dist/server/entity/**/*.js"
   ],
   "migrations": [
      "./dist/server/migration/**/*.js"
   ],
   "subscribers": [
      "./dist/server/subscriber/**/*.js"
   ],
   "cli": {
      "entitiesDir": `${__dirname}/dist/server/entity`,
      "migrationsDir": `${__dirname}/dist/server/migration`,
   }
}

//`/cloudsql/${process.env.CLOUD_SQL_CONNECTION_NAME}` || 

