import React, { useEffect, useState } from 'react';
import api from '../../../axiosConfig';

const CustomerDashboard = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      const token = sessionStorage.getItem('token'); // Assuming the token is stored in sessionStorage
      try {
        const response = await api.get('/api/payments/user', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (!response.status === 200) {
          throw new Error('Failed to fetch payments');
        }

        setPayments(response.data.payments);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  if (loading) {
    return <p>Loading payments...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div style={styles.dashboardContainer}>
      <h1 style={styles.title}>Payments</h1>
      {payments.length === 0 ? (
        <p>No payments available</p>
      ) : (
        <div style={styles.paymentList}>
          {payments.map((payment) => (
            <div key={payment._id} style={styles.paymentCard}>
              <p style={styles.paymentField}><strong>Amount:</strong> {payment.amount} {payment.currency}</p>
              <p style={styles.paymentField}><strong>Provider:</strong> {payment.provider}</p>
              <p style={styles.paymentField}><strong>Beneficiary Name:</strong> {payment.beneficiaryName}</p>
              <p style={styles.paymentField}><strong>Beneficiary Account:</strong> {payment.beneficiaryAccountNumber}</p>
              <p style={styles.paymentField}><strong>SWIFT Code:</strong> {payment.swiftCode}</p>
              <p style={styles.paymentField}><strong>Date:</strong> {new Date(payment.createdAt).toLocaleString()}</p>
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
};

export default CustomerDashboard;
