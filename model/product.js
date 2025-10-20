import db from "../config/db.js";

const Product = {
  // Create a new product
  create: async (storeId, name, description, price, stockQty, sku, imageUrl) => {
    const result = await db.query(
      `INSERT INTO products
        (store_id, name, description, price, stock_qty, sku, image_url)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id`,
      [storeId, name, description, price, stockQty, sku, imageUrl]
    );
    return result.rows[0].id;
  },

  // Find all products for a store
  findAllByStore: async (storeId) => {
    const result = await db.query(
      `SELECT * FROM products WHERE store_id = $1`,
      [storeId]
    );
    return result.rows;
  },

  // Find product by ID
  findById: async (id) => {
    const result = await db.query(
      `SELECT * FROM products WHERE id = $1`,
      [id]
    );
    return result.rows[0] || null;
  },

  // Update product status
  updateStatus: async (id, status) => {
    await db.query(
      `UPDATE products SET status = $1 WHERE id = $2`,
      [status, id]
    );
  },

  // Update product fields dynamically
  update: async (id, fields) => {
    const updates = [];
    const values = [];

    let i = 1;
    for (let key in fields) {
      updates.push(`${key} = $${i}`);
      values.push(fields[key]);
      i++;
    }

    values.push(id); // last value is ID
    const query = `UPDATE products SET ${updates.join(", ")} WHERE id = $${i}`;

    await db.query(query, values);
  },

  // Delete product
  delete: async (id) => {
    await db.query(
      `DELETE FROM products WHERE id = $1`,
      [id]
    );
  }
};

export default Product;
