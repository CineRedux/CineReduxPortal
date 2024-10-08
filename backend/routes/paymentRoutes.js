// routes/paymentRoutes.js
import express from 'express';
import { createPayment, getPaymentsByUser } from '../controllers/paymentController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// POST /api/payments/create
router.post('/create', createPayment);

router.get('/' , authMiddleware, getPaymentsByUser);

export default router;
