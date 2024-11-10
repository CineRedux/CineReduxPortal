// routes/paymentRoutes.js
import express from 'express';
import verifyToken from '../middlewares/authMiddleware.js';
import { 
  createPayment, 
  getPayments, 
  getPaymentsByUser, 
  updatePayment, 
  deletePayment 
} from '../controllers/paymentController.js';

const router = express.Router();

router.post('/', verifyToken, createPayment);
router.get('/user', verifyToken, getPaymentsByUser);
router.get('/all', verifyToken, getPayments);
router.put('/:id', verifyToken, updatePayment);
router.delete('/:id', verifyToken, deletePayment);

export default router;
