module.exports = {
   "type": "postgres",
   "host": process.env.DB_INSTANCE || "127.0.0.1",
   "port": process.env.DB_PORT,
   "username": process.env.DB_USER,
   "password": process.env.DB_PASS,
   "database": process.env.DB_NAME,
   "socketPath": process.env.DB_INSTANCE,
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

//"concurrently \"npm run serve\" \