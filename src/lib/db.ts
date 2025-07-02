// Neon PostgreSQL database connection
import { QueryResult, pool as mockPool, query as mockQuery } from './db-mock';

// Flag to indicate if we're using the mock implementation
const isMockImplementation = true;

// Helper function to execute database queries
export async function query(text: string, params?: any[]): Promise<QueryResult> {
  try {
    // Always use the mock implementation in browser environments
    const start = Date.now();
    const res = await mockQuery(text, params);
    const duration = Date.now() - start;
    console.log('Executed query', { text, duration, rows: res.rowCount, isMock: true });
    return res;
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }
}

// Export the pool for direct use if needed
export const pool = mockPool;

// Log that we're using the mock implementation
console.log('Using mock database implementation for browser environment'); 