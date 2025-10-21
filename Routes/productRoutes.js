// routes/productRoutes.js
import express from "express";
import productController from "../Controller/productController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post(
  "/createProduct",
  authMiddleware,
  upload.single("logo"), // This handles the uploaded image
  productController.createProduct
);
// router.post("/createProduct", authMiddleware, productController.createProduct);
router.get("/getProductsByStore/store/:storeId", productController.getProductsByStore);
router.get("/getProductById/:id", productController.getProductById);
router.put("/updateProduct/:id", authMiddleware, productController.updateProduct);
router.put("/changeProductStatus/:id/status", authMiddleware, productController.changeProductStatus);
router.delete("/deleteProduct/:id", authMiddleware, productController.deleteProduct);

export default router;
