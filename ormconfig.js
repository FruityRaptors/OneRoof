module.exports = {
   "type": "postgres",
   "host": `/cloudsql/${process.env.CLOUD_SQL_CONNECTION_NAME}` || "127.0.0.1",
   "extra": {
      "socketPath": `/cloudsql/${process.env.CLOUD_SQL_CONNECTION_NAME}`,
 },
   "username": process.env.DB_USER,
   "password": process.env.DB_PASS,
   "database": process.env.DB_NAME,
   "synchronize": true,
   "logging": false,
   "entities": [
      "dist/server/entity/**/*.js"
   ],
   "migrations": [
      "dist/server/migration/**/*.js"
   ],
   "subscribers": [
      "dist/server/subscriber/**/*.js"
   ],
   "cli": {
      "entitiesDir": "server/entity",
      "migrationsDir": "server/migration",
      "subscribersDir": "server/subscriber"
   }
}

