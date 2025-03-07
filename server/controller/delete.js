import express from "express";
import { deleteItem } from "../models/queries.js";

const router = express.Router();

router.delete("/items/:id", async (req, res) => {
  try {
    const item_id = parseInt(req.params.id);
    await deleteItem(item_id);
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
