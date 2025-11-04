// routes/storeRoutes.js
import express from "express";
import storeController from "../Controller/storeController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";
const router = express.Router();

router.post(
  "/createStore",
  authMiddleware,
  upload.single("logo"),
  storeController.createStore
);
router.get("/getUserStores", authMiddleware, storeController.getUserStores);
router.get("/getAllStores", storeController.getAllStores);
router.put("/:id/suspend", authMiddleware, storeController.suspendStore);

export default router;


