import express from 'express';
import readRouter from './read.js';
import createRouter from './create.js';
import updateRouter from './update.js';
import deleteRouter from './delete.js';

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Use the routers
app.use('/api', readRouter);
app.use('/api', createRouter);
app.use('/api', updateRouter);
app.use('/api', deleteRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 