import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import habitRoutes from './src/routes/HabitRoutes.js'; // Must have .js

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(cors()); // Allows frontend to connect
app.use(express.json()); // Parses incoming JSON requests

// Routes
app.use('/api/habits', habitRoutes); // Main API endpoint

// Database Connection
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('MongoDB connected successfully.');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });