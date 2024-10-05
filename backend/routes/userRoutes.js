import express from 'express';
import { registerUser, loginUser } from '../controllers/userController.js';
import { body } from 'express-validator';

const router = express.Router();

// Register Route with input validation
router.post('/register', [
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], registerUser);

// Login Route
router.post('/login', [
    body('email').isEmail(),
    body('password').exists(),
], loginUser);

export default router;
