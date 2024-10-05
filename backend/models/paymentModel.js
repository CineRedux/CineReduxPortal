import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  provider: {
    type: String,
    required: true,
  },
  beneficiaryName: {
    type: String,
    required: true,
  },
  beneficiaryAccountNumber: {
    type: String,
    required: true,
  },
  swiftCode: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;
