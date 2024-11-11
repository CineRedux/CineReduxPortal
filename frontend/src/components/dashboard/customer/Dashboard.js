import { useEffect, useState } from 'react'
import PaymentsList from '../../payments/PaymentsList'
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

  return (
    <div className="container mx-auto mt-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Your Payments</h1>
      <PaymentsList 
        payments={payments}
        loading={loading}
        error={error}
      />
    </div>
  )
}
