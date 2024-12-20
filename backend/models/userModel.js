import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// Define User Schema
const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    fullName: { type: String, required: true },
    idNumber: { type: String, required: true },
    accountNumber: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
});

// Password hashing before saving the user
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to compare passwords during login
userSchema.methods.comparePassword = async function (inputPassword) {
    return await bcrypt.compare(inputPassword, this.password);
};

export default mongoose.model('User', userSchema);
