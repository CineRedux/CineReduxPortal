import { Router } from 'express';
import { body } from 'express-validator';
import { loginUser } from '../controllers/userController.js';
import { registerUser } from '../controllers/userController.js';

const router = Router();

// Register Route with input validation
router.post('/register', [
    body('email').isEmail().withMessage('Enter a valid email'),
    body('fullName').isLength({ min: 1 }).withMessage('Full name is required'),
    body('idNumber').isLength({ min: 1 }).withMessage('ID number is required'),
    body('accountNumber').isLength({ min: 1 }).withMessage('Account number is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('role').isIn(['customer', 'employee']).exists().withMessage('Role is required'),
], registerUser);

// Login Route with input validation
router.post('/login', [
    body('username').isLength({ min: 1 }).withMessage('Username is required'),
    body('accountNumber').isLength({ min: 1 }).withMessage('Account number is required'),
    body('password').exists().withMessage('Password is required'),
    body('role').isIn(['customer', 'employee']).exists().withMessage('Role is required'),
], loginUser);

export default router;
