import express from 'express';
import { getItems } from "../models/queries.js";

const router = express.Router();  // Use Router instead of new app

router.get("/items", async (req, res) => {

    // Server Response
    const items = await getItems();
    res.send(items);
    console.log(items);
});

export default router;
