// models/verificationToken.js
import db from "../config/db.js"

const VerificationToken = {
  create: async (userId, token, expiresAt) => {
    await db.query(
      "INSERT INTO password_reset_tokens (user_id, token, expires_at) VALUES (?, ?, ?)",
      [userId, token, expiresAt]
    );
  },

  findValidToken: async (userId, token) => {
    const [rows] = await db.query(
      "SELECT * FROM password_reset_tokens WHERE user_id = ? AND token = ? AND used = FALSE AND expires_at > NOW()",
      [userId, token]
    );
    return rows[0];

  },

  markAsUsed: async (id) => {
    await db.query(
      "UPDATE password_reset_tokens SET used = TRUE WHERE id = ?",
      [id]
    );
  }

};

export default VerificationToken;
