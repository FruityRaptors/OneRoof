// "node build/server/index.js"
module.exports = {
   "type": "postgres",
   "host": `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`,
   "extra": {
   "socketPath": `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`,
   },
   "username": process.env.DB_USER,
   "password": process.env.DB_PASS,
   "database": process.env.DB_NAME,
   "synchronize": true,
   "logging": false,
   "entities": [
      "server/entity/**/*.ts"
   ],
   "migrations": [
      "server/migration/**/*.ts"
   ],
   "subscribers": [
      "server/subscriber/**/*.ts"
   ],
   "cli": {
      "entitiesDir": "server/entity",
      "migrationsDir": "server/migration",
      "subscribersDir": "server/subscriber"
   }
}

