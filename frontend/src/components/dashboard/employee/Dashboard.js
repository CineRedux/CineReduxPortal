import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Skeleton } from "../../../components/ui/skeleton";
import { AlertCircle, CheckCircle, Edit, Trash2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../../../components/ui/alert";
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

  if (loading) {
    return (
      <div className="container mx-auto mt-8 px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">All Payments</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((num) => (
            <Card key={`loading-skeleton-${num}`} className="w-full">
              <CardHeader className="space-y-2">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-3/4" />
              </CardHeader>
              <CardContent className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto mt-8 px-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">All Payments</h1>
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
    </div>
  );
};

export default EmployeeDashboard;
