import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Skeleton } from "../ui/skeleton"
import { AlertCircle, CheckCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
import PropTypes from 'prop-types'

export default function PaymentsList({ payments = [], loading, error }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((num) => (
          <Card key={`skeleton-${num}`} className="w-full">
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
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  if (!payments || payments.length === 0) {
    return <p className="text-center text-gray-600">No payments available</p>
  }

  return (
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
  )
}

PaymentsList.propTypes = {
  payments: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      currency: PropTypes.string.isRequired,
      provider: PropTypes.string.isRequired,
      beneficiaryName: PropTypes.string.isRequired,
      beneficiaryAccountNumber: PropTypes.string.isRequired,
      swiftCode: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
    })
  ),
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
}

PaymentsList.defaultProps = {
  payments: [],
  error: null,
} 