// controllers/productController.js
import Product from "..//model/product.js";

const productController = {
 createProduct: async (req, res) => {
  try {
    const {
      store_id,
      name,
      description,
      price,
      stock_qty,
      sku
    } = req.body;

    let image_url = null;
    if (req.file) {
      image_url = req.file.path; // store the relative path to the file
    }

    const productId = await Product.create(
      store_id,
      name,
      description,
      price,
      stock_qty,
      sku,
      image_url
    );

    res.status(201).json({
      message: "Product created",
      productId
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
},


  getProductsByStore: async (req, res) => {
    try {
      const { storeId } = req.params;
      const products = await Product.findAllByStore(storeId);
      res.json(products);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  },

  getProductById: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const fields = req.body;
      await Product.update(id, fields);
      res.json({ message: "Product updated" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;
      await Product.delete(id);
      res.json({ message: "Product deleted" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  },

  changeProductStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      await Product.updateStatus(id, status);
      res.json({ message: "Product status updated" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
};

export default productController;
