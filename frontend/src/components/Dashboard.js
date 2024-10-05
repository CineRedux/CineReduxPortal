import React, { useState } from 'react';
import api from '../axiosConfig'; // Import your configured axios instance

function Dashboard() {
  const [payment, setPayment] = useState({
    amount: '',
    currency: 'ZAR',
    provider: 'SWIFT',
    payeeAccount: '',
    swiftCode: ''
  });
  const [message, setMessage] = useState('');

  const currencies = ['ZAR', 'USD', 'EUR', 'GBP', 'AUD'];

  const regex = {
    amount: /^\d+(\.\d{1,2})?$/,
    currency: /^[A-Z]{3}$/,
    payeeAccount: /^\d{10,12}$/,
    swiftCode: /^[A-Z]{6}[A-Z0-9]{2,5}$/
  };

  const handleChange = (e) => {
    setPayment({ ...payment, [e.target.name]: e.target.value });
  };

  const validate = () => {
    for (let key in payment) {
      if (!regex[key].test(payment[key])) {
        setMessage(`Invalid ${key}`);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!validate()) return;

    try {
      const response = await api.post('/api/payments/create', payment); // Use api instance
      if (response.data.success) {
        setMessage('Payment initiated successfully');
        setPayment({
          amount: '',
          currency: 'ZAR',
          provider: 'SWIFT',
          payeeAccount: '',
          swiftCode: ''
        });
      }
    } catch (err) {
      setMessage(err.response?.data?.message || 'Payment failed');
    }
  };

  return (
    <div className="form-container">
      <h2>Make a Payment</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Amount:
          <input type="text" name="amount" value={payment.amount} onChange={handleChange} required />
        </label>
        <label>
          Currency:
          <select name="currency" value={payment.currency} onChange={handleChange} required>
            {currencies.map((currency) => (
              <option key={currency} value={currency}>{currency}</option>
            ))}
          </select>
        </label>
        <label>
          Provider:
          <select name="provider" value={payment.provider} onChange={handleChange} required>
            <option value="SWIFT">SWIFT</option>
          </select>
        </label>
        <label>
          Payee Account:
          <input type="text" name="payeeAccount" value={payment.payeeAccount} onChange={handleChange} required />
        </label>
        <label>
          SWIFT Code:
          <input type="text" name="swiftCode" value={payment.swiftCode} onChange={handleChange} required />
        </label>
        <button type="submit">Pay Now</button>
      </form>
    </div>
  );
}

export default Dashboard;
