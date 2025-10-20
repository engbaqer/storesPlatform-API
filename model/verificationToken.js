import db from "../config/db.js";

const VerificationToken = {
  // Create a new token
  create: async (userId, token, expiresAt) => {
    await db.query(
      "INSERT INTO password_reset_tokens (user_id, token, expires_at) VALUES ($1, $2, $3)",
      [userId, token, expiresAt]
    );
  },

  // Find a valid token
  findValidToken: async (userId, token) => {
    const result = await db.query(
      "SELECT * FROM password_reset_tokens WHERE user_id = $1 AND token = $2 AND used = FALSE AND expires_at > NOW()",
      [userId, token]
    );
    return result.rows[0]; // PostgreSQL returns { rows }
  },

  // Mark token as used
  markAsUsed: async (id) => {
    await db.query(
      "UPDATE password_reset_tokens SET used = TRUE WHERE id = $1",
      [id]
    );
  }
};

export default VerificationToken;
