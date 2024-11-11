import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import api from '../../axiosConfig';

export default function Payments() {
  const navigate = useNavigate();
  const [payment, setPayment] = useState({
    amount: '',
    currency: 'ZAR',
    provider: 'SWIFT',
    beneficiaryName: '',
    beneficiaryAccountNumber: '',
    swiftCode: ''
  });
  const [message, setMessage] = useState(null);

  const currencies = ['ZAR', 'USD', 'EUR', 'GBP', 'AUD'];

  const regex = {
    amount: /^\d+(\.\d{1,2})?$/,
    currency: /^[A-Z]{3}$/,
    beneficiaryName: /^[a-zA-Z\s]+$/,
    beneficiaryAccountNumber: /^\d{10,12}$/,
    swiftCode: /^[A-Z]{6}[A-Z0-9]{2,5}$/
  };

  const handleChange = (e) => {
    setPayment({ ...payment, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name, value) => {
    setPayment({ ...payment, [name]: value });
  };

  const validate = () => {
    for (let key in payment) {
      if (regex[key] && !regex[key].test(payment[key])) {
        setMessage({ type: 'error', text: `Invalid ${key}` });
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!validate()) return;

    try {
      const token = sessionStorage.getItem('token');
      const decoded = jwtDecode(token);
      const userId = decoded.id;
      const paymentData = { ...payment, userId };

      const response = await api.post('/api/payments', paymentData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
      
      if (response.data.success) {
        setMessage({ type: 'success', text: 'Payment initiated successfully!' });
        setPayment({
          amount: '',
          currency: 'ZAR', 
          provider: 'SWIFT',
          beneficiaryName: '',
          beneficiaryAccountNumber: '',
          swiftCode: ''
        });
        setTimeout(() => {
          navigate('/dashboard');
        }, 2500);
      }
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Payment failed' });
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-blue-600">Make a Payment</CardTitle>
        <CardDescription className="text-center text-gray-600">Enter payment details below</CardDescription>
      </CardHeader>
      <CardContent>
        {message && (
          <Alert variant={message.type === 'error' ? "destructive" : "default"} className="mb-6">
            {message.type === 'error' ? <AlertCircle className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
            <AlertTitle>{message.type === 'error' ? 'Error' : 'Success'}</AlertTitle>
            <AlertDescription>{message.text}</AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input id="amount" name="amount" value={payment.amount} onChange={handleChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="currency">Currency</Label>
            <Select 
              name="currency" 
              defaultValue="ZAR"
              onValueChange={(value) => handleSelectChange('currency', value)}
            >
              <SelectTrigger className="bg-white text-black border border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                <SelectValue defaultValue="ZAR" className="text-black">
                  {payment.currency}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="bg-white shadow-lg">
                {currencies.map((currency) => (
                  <SelectItem key={currency} value={currency} className="text-black">
                    {currency}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="provider">Provider</Label>
            <Select 
              name="provider" 
              defaultValue="SWIFT"
              onValueChange={(value) => handleSelectChange('provider', value)}
            >
              <SelectTrigger className="bg-white text-black border border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                <SelectValue defaultValue="SWIFT" className="text-black">
                  {payment.provider}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="bg-white shadow-lg">
                <SelectItem value="SWIFT" className="text-black">SWIFT</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="beneficiaryName">Beneficiary Name</Label>
            <Input id="beneficiaryName" name="beneficiaryName" value={payment.beneficiaryName} onChange={handleChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="beneficiaryAccountNumber">Beneficiary Account Number</Label>
            <Input id="beneficiaryAccountNumber" name="beneficiaryAccountNumber" value={payment.beneficiaryAccountNumber} onChange={handleChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="swiftCode">SWIFT Code</Label>
            <Input id="swiftCode" name="swiftCode" value={payment.swiftCode} onChange={handleChange} required />
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" onClick={handleSubmit}>Pay Now</Button>
      </CardFooter>
    </Card>
  );
}
