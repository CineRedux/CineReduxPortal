import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
// Register user
// export const registerUser = async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     const { email, fullName, idNumber, accountNumber, password } = req.body;

//     try {
//         const username = email;
        
//         const existingUser = await User.findOne({ username });
//         if (existingUser) {
//             return res.status(400).json({ message: 'User already exists' });
//         }


//         const newUser = new User({ email, fullName, idNumber, accountNumber, username, password });
//         await newUser.save();

//         res.status(201).json({ message: 'User registered successfully!', username });
//     } catch (err) {
//         res.status(500).json({ error: 'Registration failed', err });
//     }
// };

// Login user
export const loginUser = async (req, res) => {
    const { username, accountNumber, password, role } = req.body;

    try {
        const user = await User.findOne({ username, accountNumber, role });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message : "Success", token });
    } catch (err) {
        res.status(500).json({ error: 'Login failed' });
    }
};
