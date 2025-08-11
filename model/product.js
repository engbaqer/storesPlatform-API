// models/product.js
import db from "../config/db.js";

const Product = {
  create: async (storeId, name, description, price, stockQty, sku, imageUrl) => {
    const [result] = await db.query(
      `INSERT INTO products
        (store_id, name, description, price, stock_qty, sku, image_url)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [storeId, name, description, price, stockQty, sku, imageUrl]
    );
    return result.insertId;
  },

  findAllByStore: async (storeId) => {
    const [rows] = await db.query(
      `SELECT * FROM products WHERE store_id = ?`,
      [storeId]
    );
    return rows;
  },

  findById: async (id) => {
    const [rows] = await db.query(
      `SELECT * FROM products WHERE id = ?`,
      [id]
    );
    return rows[0] || null;
  },

  updateStatus: async (id, status) => {
    await db.query(
      `UPDATE products SET status = ? WHERE id = ?`,
      [status, id]
    );
  },

  update: async (id, fields) => {
    const updates = [];
    const values = [];

    for (let key in fields) {
      updates.push(`${key} = ?`);
      values.push(fields[key]);
    }

    values.push(id);

    await db.query(
      `UPDATE products SET ${updates.join(", ")} WHERE id = ?`,
      values
    );
  },

  delete: async (id) => {
    await db.query(`DELETE FROM products WHERE id = ?`, [id]);
  }
};

export default Product;
