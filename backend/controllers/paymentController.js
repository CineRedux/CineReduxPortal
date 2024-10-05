import Payment from '../models/paymentModel.js';

export const createPayment = async (req, res) => {
  try {
    const { userId, amount, currency, provider, beneficiaryName, beneficiaryAccountNumber, swiftCode } = req.body;

    // Validate input
    if (!userId || !amount || !currency || !provider || !beneficiaryName || !beneficiaryAccountNumber || !swiftCode) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // Create new payment
    const payment = new Payment({
      userId,
      amount,
      currency,
      provider,
      beneficiaryName,
      beneficiaryAccountNumber,
      swiftCode
    });

    await payment.save();

    res.status(201).json({ success: true, message: 'Payment initiated successfully', payment });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Payment failed', "error" : err });
  }
};
