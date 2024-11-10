import React, { useEffect, useState } from 'react';
import api from '../../../axiosConfig';

const EmployeeDashboard = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingPayment, setEditingPayment] = useState(null);

  const currencies = ['ZAR', 'USD', 'EUR', 'GBP', 'AUD'];

  const regex = {
    amount: /^\d+(\.\d{1,2})?$/,
    currency: /^[A-Z]{3}$/,
    beneficiaryName: /^[a-zA-Z\s]+$/,
    beneficiaryAccountNumber: /^\d{10,12}$/,
    swiftCode: /^[A-Z]{6}[A-Z0-9]{2,5}$/
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    const token = sessionStorage.getItem('token');
    try {
      const response = await api.get('/api/payments/all', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setPayments(response.data.payments);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (payment) => {
    setEditingPayment({ ...payment });
  };

  const handleUpdate = async () => {
    for (let key in regex) {
      if (regex[key] && !regex[key].test(editingPayment[key])) {
        setError(`Invalid ${key}`);
        return;
      }
    }

    const token = sessionStorage.getItem('token');
    try {
      await api.put(`/api/payments/${editingPayment._id}`, editingPayment, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setEditingPayment(null);
      setError(null);
      fetchPayments();
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
    }
  };

  const handleDelete = async (paymentId) => {
    if (!window.confirm('Are you sure you want to delete this payment?')) return;
    
    const token = sessionStorage.getItem('token');
    try {
      await api.delete(`/api/payments/${paymentId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      fetchPayments();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleChange = (e) => {
    setEditingPayment({
      ...editingPayment,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) return <p>Loading payments...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={styles.dashboardContainer}>
      <h1 style={styles.title}>All Payments</h1>
      {payments.length === 0 ? (
        <p>No payments available</p>
      ) : (
        <div style={styles.paymentList}>
          {payments.map((payment) => (
            <div key={payment._id} style={styles.paymentCard}>
              {editingPayment && editingPayment._id === payment._id ? (
                <div style={styles.editForm}>
                  <label style={styles.label}>
                    Amount:
                    <input
                      type="text"
                      name="amount"
                      value={editingPayment.amount}
                      onChange={handleChange}
                      style={styles.input}
                      required
                    />
                  </label>
                  <label style={styles.label}>
                    Currency:
                    <select
                      name="currency"
                      value={editingPayment.currency}
                      onChange={handleChange}
                      style={styles.input}
                      required
                    >
                      {currencies.map((currency) => (
                        <option key={currency} value={currency}>{currency}</option>
                      ))}
                    </select>
                  </label>
                  <label style={styles.label}>
                    Provider:
                    <select
                      name="provider"
                      value={editingPayment.provider}
                      onChange={handleChange}
                      style={styles.input}
                      required
                    >
                      <option value="SWIFT">SWIFT</option>
                    </select>
                  </label>
                  <label style={styles.label}>
                    Beneficiary Name:
                    <input
                      type="text"
                      name="beneficiaryName"
                      value={editingPayment.beneficiaryName}
                      onChange={handleChange}
                      style={styles.input}
                      required
                    />
                  </label>
                  <label style={styles.label}>
                    Beneficiary Account Number:
                    <input
                      type="text"
                      name="beneficiaryAccountNumber"
                      value={editingPayment.beneficiaryAccountNumber}
                      onChange={handleChange}
                      style={styles.input}
                      required
                    />
                  </label>
                  <label style={styles.label}>
                    SWIFT Code:
                    <input
                      type="text"
                      name="swiftCode"
                      value={editingPayment.swiftCode}
                      onChange={handleChange}
                      style={styles.input}
                      required
                    />
                  </label>
                  <div style={styles.buttonContainer}>
                    <button onClick={handleUpdate} style={styles.saveButton}>Save</button>
                    <button onClick={() => setEditingPayment(null)} style={styles.cancelButton}>Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <p style={styles.paymentField}><strong>Amount:</strong> {payment.amount} {payment.currency}</p>
                  <p style={styles.paymentField}><strong>Provider:</strong> {payment.provider}</p>
                  <p style={styles.paymentField}><strong>Beneficiary Name:</strong> {payment.beneficiaryName}</p>
                  <p style={styles.paymentField}><strong>Beneficiary Account:</strong> {payment.beneficiaryAccountNumber}</p>
                  <p style={styles.paymentField}><strong>SWIFT Code:</strong> {payment.swiftCode}</p>
                  <p style={styles.paymentField}><strong>Date:</strong> {new Date(payment.createdAt).toLocaleString()}</p>
                  <div style={styles.buttonContainer}>
                    <button onClick={() => handleEdit(payment)} style={styles.editButton}>Edit</button>
                    <button onClick={() => handleDelete(payment._id)} style={styles.deleteButton}>Delete</button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  dashboardContainer: {
    textAlign: 'center',
    marginTop: '50px',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '20px',
  },
  paymentList: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '20px',
  },
  paymentCard: {
    backgroundColor: '#f9f9f9',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '300px',
    textAlign: 'left',
  },
  paymentField: {
    margin: '10px 0',
    fontSize: '1.1rem',
  },
  input: {
    width: '100%',
    padding: '8px',
    margin: '5px 0',
    borderRadius: '4px',
    border: '1px solid #ddd',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '10px',
  },
  editButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  deleteButton: {
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  cancelButton: {
    backgroundColor: '#808080',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  editForm: {
    padding: '10px',
  },
  label: {
    display: 'block',
    marginBottom: '10px',
    fontSize: '1rem',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '8px',
    margin: '5px 0',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '1rem',
  },
};

export default EmployeeDashboard;
