// models/store.js
import db from "../config/db.js";

const Store = {
  create: async (userId, storeName, slug, logoUrl) => {
    const [result] = await db.query(
      `INSERT INTO stores (user_id, store_name, slug, logo_url) 
       VALUES (?, ?, ?, ?)`,
      [userId, storeName, slug, logoUrl]
    );
    return result.insertId;
  },

  findAllByUser: async (userId) => {
    const [rows] = await db.query(
      `SELECT * FROM stores WHERE user_id = ?`,
      [userId]
    );
    return rows;
  },

  findById: async (id) => {
    const [rows] = await db.query(
      `SELECT * FROM stores WHERE id = ?`,
      [id]
    );
    return rows[0] || null;
  },

  updateStatus: async (id, status) => {
    await db.query(
      `UPDATE stores SET status = ? WHERE id = ?`,
      [status, id]
    );
  }
};

export default Store;
