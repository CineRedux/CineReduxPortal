import React, { useState } from 'react';
import { usePayments } from '../../../hooks/usePayments';
import DashboardLayout from '../DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { CheckCircle, Edit, Trash2 } from "lucide-react";
import api from '../../../axiosConfig';

const EmployeeDashboard = () => {
  const { payments, loading, error, fetchPayments } = usePayments('/api/payments/all');
  const [editingPayment, setEditingPayment] = useState(null);
  const [updateError, setUpdateError] = useState(null);

  const currencies = ['ZAR', 'USD', 'EUR', 'GBP', 'AUD'];

  const regex = {
    amount: /^\d+(\.\d{1,2})?$/,
    currency: /^[A-Z]{3}$/,
    beneficiaryName: /^[a-zA-Z\s]+$/,
    beneficiaryAccountNumber: /^\d{10,12}$/,
    swiftCode: /^[A-Z]{6}[A-Z0-9]{2,5}$/
  };

  const handleEdit = (payment) => {
    setEditingPayment({ ...payment });
  };

  const handleUpdate = async () => {
    for (let key in regex) {
      if (regex[key] && !regex[key].test(editingPayment[key])) {
        setUpdateError(`Invalid ${key}`);
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
      setUpdateError(null);
      fetchPayments();
    } catch (err) {
      setUpdateError(err.response?.data?.message || 'Update failed');
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
      setUpdateError(err.message);
    }
  };

  const handleChange = (e) => {
    setEditingPayment({
      ...editingPayment,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <DashboardLayout title="All Payments" loading={loading} error={error}>
      {updateError && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {updateError}
        </div>
      )}
      {payments.length === 0 ? (
        <p className="text-center text-gray-600">No payments available</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {payments.map((payment) => (
            <Card key={payment._id} className="w-full bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              {editingPayment && editingPayment._id === payment._id ? (
                <CardContent className="space-y-4 p-6">
                  <div className="space-y-3">
                    <label className="block">
                      <span className="text-gray-700">Amount:</span>
                      <input
                        type="text"
                        name="amount"
                        value={editingPayment.amount}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                    </label>
                    <label className="block">
                      <span className="text-gray-700">Currency:</span>
                      <select
                        name="currency"
                        value={editingPayment.currency}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      >
                        {currencies.map((currency) => (
                          <option key={currency} value={currency}>{currency}</option>
                        ))}
                      </select>
                    </label>
                    <label className="block">
                      <span className="text-gray-700">Provider:</span>
                      <select
                        name="provider"
                        value={editingPayment.provider}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      >
                        <option value="SWIFT">SWIFT</option>
                      </select>
                    </label>
                    <label className="block">
                      <span className="text-gray-700">Beneficiary Name:</span>
                      <input
                        type="text"
                        name="beneficiaryName"
                        value={editingPayment.beneficiaryName}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                    </label>
                    <label className="block">
                      <span className="text-gray-700">Beneficiary Account Number:</span>
                      <input
                        type="text"
                        name="beneficiaryAccountNumber"
                        value={editingPayment.beneficiaryAccountNumber}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                    </label>
                    <label className="block">
                      <span className="text-gray-700">SWIFT Code:</span>
                      <input
                        type="text"
                        name="swiftCode"
                        value={editingPayment.swiftCode}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                    </label>
                    <div className="flex justify-end space-x-2 mt-4">
                      <button
                        onClick={handleUpdate}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingPayment(null)}
                        className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </CardContent>
              ) : (
                <>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-blue-600">
                        {payment.amount} {payment.currency}
                      </span>
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <dl className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <dt className="font-medium text-gray-500">Provider:</dt>
                        <dd className="text-gray-700">{payment.provider}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="font-medium text-gray-500">Beneficiary:</dt>
                        <dd className="text-gray-700">{payment.beneficiaryName}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="font-medium text-gray-500">Account:</dt>
                        <dd className="text-gray-700">{payment.beneficiaryAccountNumber}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="font-medium text-gray-500">SWIFT:</dt>
                        <dd className="text-gray-700">{payment.swiftCode}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="font-medium text-gray-500">Date:</dt>
                        <dd className="text-gray-700">{new Date(payment.createdAt).toLocaleString()}</dd>
                      </div>
                    </dl>
                    <div className="flex justify-end space-x-2 mt-4">
                      <button
                        onClick={() => handleEdit(payment)}
                        className="p-2 text-blue-600 hover:text-blue-800 bg-white border-2 border-blue-600 rounded-md hover:bg-blue-50 transition-colors duration-200"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(payment._id)}
                        className="p-2 text-red-600 hover:text-red-800 bg-white border-2 border-red-600 rounded-md hover:bg-red-50 transition-colors duration-200"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </CardContent>
                </>
              )}
            </Card>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default EmployeeDashboard;