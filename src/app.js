const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const articleRoutes = require('./routes/articleRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middlewares/errorHandler');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());

// Configure CORS
const allowedOrigins = [
    'http://localhost:3000', // Local development
    'https://your-production-domain.com' // Production
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));

// Routes
app.use('/api', articleRoutes);
app.use('/api', userRoutes);
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use(errorHandler);

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

connectDB();

module.exports = app;
