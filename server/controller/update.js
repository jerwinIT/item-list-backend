import express from "express";
import { updateItem } from "../models/queries.js";

const router = express.Router();

router.put("/items/:id", async (req, res) => {
  try {
    const item_id = parseInt(req.params.id);
    const { item_name, description, quantity } = req.body;
    const updatedItem = await updateItem(item_id, item_name, description, quantity);
    if (updatedItem) {
      res.json(updatedItem);
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
