import express from 'express';
import readRouter from './read.js';
import createRouter from './create.js';
import updateRouter from './update.js';
import deleteRouter from './delete.js';
import cors from 'cors';

const app = express();
const port = 3005;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// Use the routers
app.use('/api', readRouter);
app.use('/api', createRouter);
app.use('/api', updateRouter);
app.use('/api', deleteRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 