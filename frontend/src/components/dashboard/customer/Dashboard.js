import React from 'react';
import { usePayments } from '../../../hooks/usePayments';
import DashboardLayout from '../DashboardLayout';
import PaymentsList from '../../payments/PaymentsList';

const CustomerDashboard = () => {
  const { payments, loading, error } = usePayments('/api/payments/user');

  return (
    <DashboardLayout title="Your Payments" loading={loading} error={error}>
      <PaymentsList payments={payments} />
    </DashboardLayout>
  );
};

export default CustomerDashboard;