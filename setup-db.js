const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

// Database connection configuration
const connectionString = 'postgresql://dr_owner:npg_6k1QFuCzYeDV@ep-lucky-wave-a8j7wx02-pooler.eastus2.azure.neon.tech/dr?sslmode=require&channel_binding=require';

// Create a connection pool
const pool = new Pool({
  connectionString,
});

async function setupDatabase() {
  try {
    console.log('Starting database setup...');

    // Read the SQL file
    const sqlFilePath = path.join(__dirname, 'db-setup.sql');
    const sqlContent = fs.readFileSync(sqlFilePath, 'utf8');

    // Execute the SQL
    await pool.query(sqlContent);

    console.log('Database setup completed successfully!');
  } catch (error) {
    console.error('Error setting up database:', error);
  } finally {
    // Close the pool
    await pool.end();
  }
}

// Run the setup
setupDatabase();