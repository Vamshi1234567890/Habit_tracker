import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import habitRoutes from './src/routes/HabitRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// CORS CONFIG
const allowedOrigin = process.env.ALLOWED_ORIGIN || "https://habittracker9.netlify.app/";

app.use(cors({
    origin: allowedOrigin,
    credentials: true,
}));

// Middleware
app.use(express.json());

// Routes
app.use('/api/habits', habitRoutes);

// Database Connection
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000,
})
    .then(() => {
        console.log('MongoDB connected successfully.');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });
