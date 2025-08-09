import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from '@shared/schema';
import 'dotenv/config';

// Parse the DATABASE_URL to handle SSL options
const databaseUrl = process.env.DATABASE_URL || '';
console.log('Connecting to database with URL:', databaseUrl.split('@')[1] || 'REDACTED');

if (!databaseUrl) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Parse the database URL to extract components
const url = new URL(databaseUrl);

// Create a connection pool with explicit connection parameters
export const pool = new Pool({
  user: url.username,
  password: url.password,
  host: url.hostname,
  port: parseInt(url.port, 10),
  database: url.pathname.replace(/^\//, ''), // Remove leading slash
  // Disable SSL for development
  ssl: false,
  // Connection settings
  connectionTimeoutMillis: 10000, // 10 seconds
  idleTimeoutMillis: 30000, // 30 seconds
  max: 5, // Max connections
});

// Test the connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Successfully connected to the database');
  release();
});

// Handle connection errors
pool.on('error', (err: Error) => {
  console.error('Unexpected error on idle client', err);
  process.exit(1);
});

export const db = drizzle(pool, { schema });