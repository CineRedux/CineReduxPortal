// routes/paymentRoutes.js
import express from 'express';
import { createPayment } from '../controllers/paymentController.js';

const router = express.Router();

// POST /api/payments/create
router.post('/create', createPayment);

export default router;
