const { Client } = require('pg');
require('dotenv').config(); // Loads environment variables from .env

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function testDB() {
  try {
    await client.connect();
    console.log("✅ Connected to Supabase PostgreSQL successfully!");
    await client.end();
  } catch (error) {
    console.error("❌ Failed to connect:", error);
  }
}

testDB();
