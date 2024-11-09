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

export const getPayments = async (req, res) => {
  try {
    
    if (req.user.role !== 'employee') {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    const payments = await Payment.find();
    if (!payments) {
      return res.status(404).json({ success: false, message: 'No payments found' });
    }

    res.status(200).json({ success: true, payments });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching payments', error: err });
  }
}

export const getPaymentsByUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const payments = await Payment.find({ userId });

    if (!payments) {
      return res.status(404).json({ success: false, message: 'No payments found for this user' });
    }

    res.status(200).json({ success: true, payments });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching payments', error: err });
  }
};
