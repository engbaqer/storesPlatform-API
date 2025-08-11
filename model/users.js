// models/userModel.js
import db from '../config/db.js';
const user ={
  async create(name, email, passwordHash, role = 'merchant') {
    const [result] = await db.query(
      'INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)',
      [name, email, passwordHash, role]
    );
    return result.insertId;
  },

  async findByEmail(email) {
    const [rows] = await db.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    return rows[0];
  }
};
export default user
 


