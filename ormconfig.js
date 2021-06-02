//const dbSocketPath = process.env.DB_SOCKET_PATH || "/cloudsql";

module.exports = {
   "type": "postgres",
   "socketPath": "/cloudsql/oneroof-315600:asia-northeast2:oneroof/.s.PGSQL.5432", 
   "username": "oneroof",
   "password": "oneroof",
   "database": "oneroof",
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

