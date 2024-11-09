import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: 'User not found, authorization denied' });
        }
        req.user = { id: user._id, role: user.role }
        next();
    } catch (err) {
        console.log(err);
        res.status(401).json({ message: 'Token is not valid' });
    }
};
