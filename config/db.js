// config/db.js
import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false, // required for Railway/Neon/Render
  },
  idleTimeoutMillis: 30000,       // Close idle connections after 30s
  connectionTimeoutMillis: 10000, // Timeout for new connections
});

// ✅ Handle unexpected errors gracefully
pool.on("error", (err) => {
  console.error("💥 Unexpected PostgreSQL error:", err.message);
  // Do NOT exit the process — Pool will recover automatically
});

// ✅ Optional test query at startup
(async () => {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("✅ Connected to PostgreSQL:", res.rows[0].now);
  } catch (err) {
    console.error("❌ Database connection error:", err.message);
  }
})();

export default pool;
