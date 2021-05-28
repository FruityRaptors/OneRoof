module.exports = {
   "type": "postgres",
   "host": "localhost",
   "port": process.env.DB_PORT,
   "username": 'postgres',
   "password": 'postgres',
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