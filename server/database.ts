import { createConnection } from 'typeorm';

export const connectDB = async () => {
   let connection = await createConnection();
   return connection
};