// models/user.js
import db from "../config/db.js";

const User = {
  // Create a new user
  async create(name, email, passwordHash, role = "merchant") {
    try {
      const result = await db.query(
        `INSERT INTO users (name, email, password_hash, role)
         VALUES ($1, $2, $3, $4)
         RETURNING id`,
        [name, email, passwordHash, role]
      );
      return result.rows[0].id;
    } catch (error) {
      console.error("❌ Error creating user:", error.message);
      throw error;
    }
  },

  // Find user by email
  async findByEmail(email) {
    try {
      const result = await db.query(
        `SELECT * FROM users WHERE email = $1`,
        [email]
      );
      return result.rows[0] || null;
    } catch (error) {
      console.error("❌ Error finding user by email:", error.message);
      throw error;
    }
  },
};

export default User;
