import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import https from 'https';
import fs from 'fs';
import helmet from 'helmet';


// SSL enforcement and server listening
const PORT = process.env.PORT || 5001;

dotenv.config();

const app = express();

// Middleware for JSON
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

app.use(helmet());

// Content Security Policy
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"], 
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"], // Allow scripts from the same server and from https://cdn.jsdelivr.net
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
    },
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI_ATLAS || process.env.MONGO_URI_LOCAL , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('MongoDB connected');

        // Use the user routes
        app.use('/api/users', userRoutes);
        app.use('/api/payments', paymentRoutes);
        const server = https.createServer({
            key: fs.readFileSync('keys/privatekey.pem'),
            cert: fs.readFileSync('keys/certificate.pem')
          }, app);
          
          server.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
          });
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });
