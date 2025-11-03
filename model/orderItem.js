import db from "../config/db.js";

const OrderItem = {
  // Create a new order item
 create: async (store_id, product_id, quantity, unit_price, phone_number) => {
    const result = await db.query(
      `INSERT INTO order_items (store_id, product_id, quantity, unit_price, phone_number)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id`,
      [store_id, product_id, quantity, unit_price, phone_number]
    );
    return result.rows[0].id;
  },

  // Get all order items
  findAll: async () => {
    const result = await db.query("SELECT * FROM order_items");
    return result.rows;
  },
  

  // Get order items by store
findByStore: async (store_id) => {
  try {
    const result = await db.query(
      `
      SELECT
        oi.id, 
        oi.product_id,
        oi.quantity,
        oi.unit_price,
        oi.store_id,
        oi.status_of_orders,
        oi.phone_number,
        p.name,
        p.description,
        p.price,
        p.stock_qty,
        p.sku,
        p.image_url,
        p.status
      FROM order_items oi
      INNER JOIN products p 
        ON oi.product_id = p.id
      WHERE p.store_id = $1
      `,
      [store_id]
    );
    return result.rows;
  } catch (error) {
    console.error("Database query error:", error);
    throw new Error("Server error");
  }
},




  // Get order item by ID
  findById: async (id) => {
    const result = await db.query(
      "SELECT * FROM order_items WHERE id = $1",
      [id]
    );
    return result.rows[0] || null;
  },

  // Update order item dynamically
  update: async (id, fields) => {
    const keys = Object.keys(fields);
    const values = Object.values(fields);
    const sets = keys.map((key, i) => `${key} = $${i + 1}`).join(", ");
    values.push(id); // last parameter is id
    const query = `UPDATE order_items SET ${sets} WHERE id = $${keys.length + 1}`;
    await db.query(query, values);
  },
   updateStatus: async (id, status_of_orders) => {
    await db.query(
      `UPDATE order_items SET status_of_orders = $1 WHERE id = $2`,
      [status_of_orders, id]
    );
  },

  // Delete order item
  delete: async (id) => {
    await db.query("DELETE FROM order_items WHERE id = $1", [id]);
  },
};

export default OrderItem;
 