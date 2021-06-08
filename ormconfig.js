module.exports = {
   "type": "postgres",
   "host": process.env.CLOUD_SQL_CONNECTION_NAME || "127.0.0.1",
   "extra": {
      "socketPath": process.env.CLOUD_SQL_CONNECTION_NAME
 },
   "username": process.env.DB_USER,
   "password": process.env.DB_PASS,
   "database": process.env.DB_NAME,
   "synchronize": true,
   "logging": false,
   "entities": [
      "build/server/entity/**/*.js"
   ],
   "migrations": [
<<<<<<< HEAD
      "build/server/migration/**/*.js"
   ],
   "subscribers": [
      "build/server/subscriber/**/*.js"
=======
      "server/migration/**/*.js"
   ],
   "subscribers": [
      "server/subscriber/**/*.js"
>>>>>>> ceeb7029d8d8467595e86c5cf6b6e16e122dc02d
   ],
   "cli": {
      "entitiesDir": "server/entity",
      "migrationsDir": "server/migration",
      "subscribersDir": "server/subscriber"
   }
}

