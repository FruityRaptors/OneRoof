const { createConnection } = require('typeorm');

const dbSocketPath = process.env.DB_SOCKET_PATH || "/cloudsql";

module.exports.connectDB = async () => {
   let connection = await createConnection();
   return connection
};