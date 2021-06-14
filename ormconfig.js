module.exports = {
   "type": "postgres",
   "host": "localhost",
   "port": process.env.DB_PORT || 5432,
   "extra": {
      "socketPath": process.env.CLOUD_SQL_CONNECTION_NAME
 },
   "username": process.env.DB_USER,
   "password": process.env.DB_PASS,
   "database": process.env.DB_NAME,
   "synchronize": true,
   "logging": false,
   "entities": [
      "build/server/entity/*.js"
   ],
   "migrations": [
      "build/server/migration/*.js"
   ],
   "subscribers": [
      "build/server/subscriber/*.js"
   ],
   "cli": {
      "entitiesDir": "server/entity",
      "migrationsDir": "server/migration",
      "subscribersDir": "server/subscriber"
   }
}

