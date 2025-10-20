import db from "../config/db.js";

const Store = {
  // Create a new store
  create: async (userId, storeName, slug, logoUrl) => {
    const result = await db.query(
      `INSERT INTO stores (user_id, store_name, slug, logo_url)
       VALUES ($1, $2, $3, $4)
       RETURNING id`,
      [userId, storeName, slug, logoUrl]
    );
    return result.rows[0].id;
  },

  // Find all stores by user
  findAllByUser: async (userId) => {
    const result = await db.query(
      `SELECT * FROM stores WHERE user_id = $1`,
      [userId]
    );
    return result.rows;
  },

  // Find a store by ID
  findById: async (id) => {
    const result = await db.query(
      `SELECT * FROM stores WHERE id = $1`,
      [id]
    );
    return result.rows[0] || null;
  },

  // Update store status
  updateStatus: async (id, status) => {
    await db.query(
      `UPDATE stores SET status = $1 WHERE id = $2`,
      [status, id]
    );
  },

  // Dynamically update any fields
  update: async (id, fields) => {
    const keys = Object.keys(fields);
    if (keys.length === 0) return;

    const values = Object.values(fields);
    const sets = keys.map((key, i) => `${key} = $${i + 1}`).join(", ");
    values.push(id);

    const query = `UPDATE stores SET ${sets} WHERE id = $${keys.length + 1}`;
    await db.query(query, values);
  },

  // Delete a store
  delete: async (id) => {
    await db.query(`DELETE FROM stores WHERE id = $1`, [id]);
  },
};

export default Store;
