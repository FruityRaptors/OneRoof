module.exports = {
   "name": "default",
   "type": "postgres",
   "host": `${process.env.DATABASE_URL}` || "127.0.0.1",
   "extra": {
      "socketPath": `/cloudsql/${process.env.CLOUD_SQL_CONNECTION_NAME}`
 },
   "username": process.env.DB_USER,
   "password": process.env.DB_PASS,
   "database": process.env.DB_NAME,
   "synchronize": true,
   "logging": false,
   "ssl":  { rejectUnauthorized: false },
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

