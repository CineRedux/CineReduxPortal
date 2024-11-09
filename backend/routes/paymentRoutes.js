// routes/paymentRoutes.js
import express from 'express';
import { createPayment, getPayments, getPaymentsByUser } from '../controllers/paymentController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// POST /api/payments/create
router.post('/create', createPayment);

router.get('/user' , authMiddleware, getPaymentsByUser);
router.get('/all', authMiddleware, getPayments)

export default router;
