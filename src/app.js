const express = require('express');
const mongoose = require('mongoose');
const articleRoutes = require('./routes/articleRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middlewares/errorHandler');
require('dotenv').config();

const app = express();

app.use(express.json());

app.use('/api', articleRoutes);
app.use('/api', userRoutes);
app.use('/api/auth', authRoutes);

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
