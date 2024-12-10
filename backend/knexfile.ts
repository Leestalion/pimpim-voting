import dotenv from 'dotenv';

const environment = process.env.NODE_ENV || 'development';
const envFile = `.env.${environment}`;
dotenv.config({ path: envFile });
console.log('DATABASE_HOST', process.env.DATABASE_HOST);

export default {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
    },
    migrations: {
      directory: './migrations',
    },
    seeds: {
      directory: './seeds',
    },
  },
};
