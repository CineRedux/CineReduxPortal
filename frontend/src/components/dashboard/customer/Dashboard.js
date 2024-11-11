import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Skeleton } from "../../../components/ui/skeleton"
import { AlertCircle, CheckCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "../../../components/ui/alert"
import api from '../../../axiosConfig'

export default function CustomerDashboard() {
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchPayments()
  }, [])

  const fetchPayments = async () => {
    const token = sessionStorage.getItem('token')
    try {
      const response = await api.get('/api/payments/user', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      setPayments(response.data.payments)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto mt-8 px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Your Payments</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, index) => (
            <Card key={index} className="w-full">
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
    )
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
    )
  }

  return (
    <div className="container mx-auto mt-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Your Payments</h1>
      {payments.length === 0 ? (
        <p className="text-center text-gray-600">No payments available</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {payments.map((payment) => (
            <Card key={payment._id} className="w-full bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-blue-600">{payment.amount} {payment.currency}</span>
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
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
