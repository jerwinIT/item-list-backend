import express from "express";
import { addItem } from "../models/queries.js";

const router = express.Router();

router.post("/items", async (req, res) => {
  try {
    const { item_name, description, quantity } = req.body;
    const newItem = await addItem(item_name, description, quantity);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
