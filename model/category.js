// import db from "../config/db.js";

// class Category {
//   static async findAllByStoreId(storeId) {
//     const [rows] = await db.query(
//       "SELECT * FROM categories WHERE store_id = ?",
//       [storeId]
//     );
//     return rows;
//   }

//   static async findById(id) {
//     const [rows] = await db.query(
//       "SELECT * FROM categories WHERE id = ?",
//       [id]
//     );
//     return rows[0];
//   }

//   static async create(storeId, name) {
//     const [result] = await db.query(
//       "INSERT INTO categories (store_id, name) VALUES (?, ?)",
//       [storeId, name]
//     );
//     return result.insertId;
//   }

//   static async update(id, storeId, name) {
//     await db.query(
//       "UPDATE categories SET name = ? WHERE id = ? AND store_id = ?",
//       [name, id, storeId]
//     );
//   }

//   static async delete(id) {
//     await db.query(
//       "DELETE FROM categories WHERE id = ?",
//       [id]
//     );
//   }
// }

// export default Category;
