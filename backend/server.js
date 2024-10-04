const https = require('https');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
//const mongoose = require('mongoose');
//const connectDB = require('./config/db');
//const authRoutes = require('./routes/authRoutes');
//const paymentRoutes = require('./routes/paymentRoutes');
const dotenv = require('dotenv');


// SSL enforcement and server listening
const PORT = process.env.PORT || 3000;

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

app.get('/api/test', (req, res) => {
    res.status(200).json({ message: 'Server is running and SSL is functioning' });
    });

const server = https.createServer({
  key: fs.readFileSync('keys/privatekey.pem'),
  cert: fs.readFileSync('keys/certificate.pem')
}, app);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


