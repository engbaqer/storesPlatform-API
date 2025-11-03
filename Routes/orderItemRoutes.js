import express from "express";
import orderItemController from "../Controller/orderItemController.js";

const router = express.Router();

router.get("/getOrderItemsByStore/:id", orderItemController.getOrderItemsByStore);
router.get("/getById/:id", orderItemController.getOrderItemById);
router.post("/create", orderItemController.createOrderItem);
router.put("/update/:id", orderItemController.updateOrderItem);
router.delete("/delete/:id", orderItemController.deleteOrderItem);
router.put("/changeOrderItemStatus/:id", orderItemController.changeOrderItemStatus);

export default router;

