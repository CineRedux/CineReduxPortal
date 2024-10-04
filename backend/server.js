const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
//const mongoose = require('mongoose');
//const connectDB = require('./config/db');
//const authRoutes = require('./routes/authRoutes');
//const paymentRoutes = require('./routes/paymentRoutes');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Database connection
//connectDB();

// Routes
//app.use('/api/auth', authRoutes);
//app.use('/api/payments', paymentRoutes);

// SSL enforcement and server listening
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
