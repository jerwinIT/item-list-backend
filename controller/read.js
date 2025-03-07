import express from 'express';
import {getItems} from "../models/queries.js";

const app = express();

app.get("/controller/create.js", (req, res) => {
    // User Device Data
    console.log(req.rawHeaders);
    
    // Server Response
    res.json(getItems());
    console.log(getItems());
})