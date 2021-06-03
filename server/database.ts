import { createConnection } from 'typeorm';

const dbSocketPath = process.env.DB_SOCKET_PATH || "/cloudsql";

export const connectDB = async () => {
   let connection = await createConnection();
   return connection
};