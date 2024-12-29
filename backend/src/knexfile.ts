import dotenv from 'dotenv';
import { Knex } from 'knex';

const environment = process.env.NODE_ENV || 'development';
const envFile = `.env.${environment}`;
dotenv.config({ path: envFile });

if (environment === 'development') {
  if (!process.env.DATABASE_HOST) {
    console.error('Missing DATABASE_HOST in environment variables.');
    process.exit(1);
  } else {
    console.log('Connecting to database at', process.env.DATABASE_HOST);
  }
} else if (environment === 'production') {
  if (!process.env.DATABASE_URL) {
    console.error('Missing DATABASE_URL in environment variables.');
    process.exit(1);
  } else {
    console.log('Connecting to database with URL', process.env.DATABASE_URL);
  }
}

export type Environment = 'development' | 'production';

const retry = async <T>(fn: () => Promise<T>, retries: number, delay: number): Promise<T> => {
  let attempts = 0;
  while (attempts < retries) {
    try {
      return await fn();
    } catch (error) {
      attempts++;
      console.error(`Connection attempt ${attempts} failed. Retrying in ${delay}ms...`);
      if (attempts === retries) {
        console.error('All retry attempts failed.');
        throw error;
      }
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
  throw new Error('Retries exceeded.');
};

const productionConfig = {
  client: 'pg',
  connection: async () => {
    return await retry(
      async () => ({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
      }),
      5, // Number of retries
      3000 // Delay between retries in ms
    );
  },
  migrations: {
    directory: './migrations',
  },
  seeds: {
    directory: './seeds',
  },
};

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
  production: productionConfig,
} as Record<Environment, Knex.Config>;
