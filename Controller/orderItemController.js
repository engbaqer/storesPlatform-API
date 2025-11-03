import OrderItem from "../model/orderItem.js";

const orderItemController = {
createOrderItem: async (req, res) => {
  try {
    const { store_id, product_id, quantity, unit_price, phone_number } = req.body;

    const id = await OrderItem.create(
      store_id,
      product_id,
      quantity,
      unit_price,
      phone_number
    );

    res.status(201).json({ message: "Order item created", id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
},

  getAllOrderItems: async (req, res) => {
    try {
      const items = await OrderItem.findAll();
      res.json(items);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  },

  getOrderItemsByStore: async (req, res) => {
    try {
      const  storeId  = req.params.id;
      const items = await OrderItem.findByStore(storeId);
      res.json(items);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  },

  getOrderItemById: async (req, res) => {
    try {
      const { id } = req.params;
      const item = await OrderItem.findById(id);
      if (!item) return res.status(404).json({ message: "Item not found" });
      res.json(item);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  },

  updateOrderItem: async (req, res) => {
    try {
      const { id } = req.params;
      await OrderItem.update(id, req.body);
      res.json({ message: "Order item updated" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  },

  deleteOrderItem: async (req, res) => {
    try {
      const { id } = req.params;
      await OrderItem.delete(id);
      res.json({ message: "Order item deleted" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  },
  changeOrderItemStatus: async (req, res) => {
  try {
    const { id } = req.params;

    // Get current order item
    const item = await OrderItem.findById(id);
    if (!item) {
      return res.status(404).json({ message: "Order item not found" });
    }

    // Toggle between 1 and 2
    const newStatus = item.status_of_orders === 1 ? 2 : 1;

    await OrderItem.updateStatus(id, newStatus);

    res.json({
      message: `Order item status changed to ${newStatus}`,
      newStatus,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
},
};

export default orderItemController;
