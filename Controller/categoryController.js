// import Category from "../model/category.js";

// const categoryController = {
//   // GET /api/categories
//   getAll: async (req, res) => {
//     try {
//       const storeId = req.user.storeId; // ✅ comes from token!

//       // Fetch only categories for this store
//       const categories = await Category.findAllByStoreId(storeId);

//       res.json(categories);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Server Error" });
//     }
//   },

//   // GET /api/categories/:id
//   getById: async (req, res) => {
//     try {
//       const id = req.params.id;
//       const category = await Category.findById(id);
// console.log(category)
//       if (!category || category.store_id !== req.user.storeId) {
//         return res.status(404).json({ message: "Category not found" });
//       }

//       res.json(category);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Server Error" });
//     }
//   },

//   // POST /api/categories
//   create: async (req, res) => {
//     try {
//       const storeId = req.user.storeId;
//       const { name } = req.body;

//       if (!name) {
//         return res.status(400).json({ message: "Name is required" });
//       }

//       const categoryId = await Category.create(storeId, name);

//       res.status(201).json({ id: categoryId, store_id: storeId, name });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Server Error" });
//     }
//   },

//   // PUT /api/categories/:id
//   update: async (req, res) => {
//     try {
//       const id = req.params.id;
//       const { name } = req.body;

//       const existingCategory = await Category.findById(id);
//       if (!existingCategory || existingCategory.store_id !== req.user.storeId) {
//         return res.status(404).json({ message: "Category not found" });
//       }

//       if (!name) {
//         return res.status(400).json({ message: "Name is required" });
//       }

//       await Category.update(id, req.user.storeId, name);

//       res.json({ message: "Category updated successfully" });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Server Error" });
//     }
//   },

//   // DELETE /api/categories/:id
//   delete: async (req, res) => {
//     try {
//       const id = req.params.id;

//       const existingCategory = await Category.findById(id);
//       if (!existingCategory || existingCategory.store_id !== req.user.storeId) {
//         return res.status(404).json({ message: "Category not found" });
//       }

//       await Category.delete(id);

//       res.json({ message: "Category deleted successfully" });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Server Error" });
//     }
//   }
// };

// export default categoryController;
