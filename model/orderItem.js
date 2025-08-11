import db from "../config/db.js";

const OrderItem = {
  create: async (store_id, product_id, quantity, unit_price) => {
    const [result] = await db.query(
      "INSERT INTO order_items (store_id, product_id, quantity, unit_price) VALUES (?, ?, ?, ?)",
      [store_id, product_id, quantity, unit_price]
    );
    return result.insertId;
  },

  findAll: async () => {
    const [rows] = await db.query("SELECT * FROM order_items");
    return rows;
  },

  findByStore: async (store_id) => {
    
    const [rows] = await db.query(
      "SELECT * FROM order_items WHERE store_id = ?",
      [store_id]
    );
    return rows;
  },

  findById: async (id) => {
    const [rows] = await db.query("SELECT * FROM order_items WHERE id = ?", [
      id,
    ]);
    return rows[0];
  },

  update: async (id, fields) => {
    const sets = Object.keys(fields)
      .map((key) => `${key} = ?`)
      .join(", ");
    const values = Object.values(fields);
    values.push(id);
    await db.query(`UPDATE order_items SET ${sets} WHERE id = ?`, values);
  },

  delete: async (id) => {
    await db.query("DELETE FROM order_items WHERE id = ?", [id]);
  },
};

export default OrderItem;
