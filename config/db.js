// config/db.js
import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false, // Needed for Neon, especially in free tier
  },
});

pool.connect()
  .then(() => console.log("✅ Connected to PostgreSQL (Neon)"))
  .catch((err) => console.error("❌ Database connection error:", err));

export default pool;
