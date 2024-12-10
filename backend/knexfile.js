const dotenv = require('dotenv');

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

module.exports = {
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
  production: {
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    },
    migrations: {
      directory: './migrations',
    },
    seeds: {
      directory: './seeds',
    },
  },
};
