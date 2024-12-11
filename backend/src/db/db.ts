import knexConfig, { Environment } from '../knexfile';
import knex from 'knex';

// Setup Knex instance using the appropriate environment
const environment = process.env.NODE_ENV as Environment || 'development';
const db = knex(knexConfig[environment]);

export default db;