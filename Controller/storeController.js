// controllers/storeController.js
import Store from "../model/store.js";
import slugify from "slugify";
const storeController = {
   createStore: async (req, res) => {
    try {
      const { store_name } = req.body;
      const userId = req.user.userId;

      const slug = slugify(store_name, { lower: true, strict: true });

      // If a logo file was uploaded, get its path
      let logo_url = null;
      if (req.file) {
        logo_url = req.file.path; // store the relative path to the file
      }

      const storeId = await Store.create(userId, store_name, slug, logo_url);

      res.status(201).json({
        message: "Store created",
        storeId,
        logo_url,
        slug,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  },




  getUserStores: async (req, res) => {
    try {
      const userId = req.user.userId;
      const stores = await Store.findAllByUser(userId);
      res.json(stores);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  },

  getAllStores: async (req, res) => {
    try {
      const stores = await Store.findAll();
      res.json(stores);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  },

  suspendStore: async (req, res) => {
    try {
      const { id } = req.params;
      await Store.updateStatus(id, "suspended");
      res.json({ message: "Store suspended" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
};

export default storeController;
