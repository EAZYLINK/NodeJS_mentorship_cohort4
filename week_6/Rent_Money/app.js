import express from 'express';
import dotenv from 'dotenv';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import { connectDB } from './config/db.js';
dotenv.config();

const PORT = process.env.PORT || 3000;
const DB_URL = process.env.MONGODB_URI;
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to Rent Money API!' });
})




app.use(notFound);
app.use(errorHandler);

app.listen(PORT, async() => {
    await connectDB(DB_URL);
    console.log(`Server is running at http://localhost:${PORT}.`);
});