import React from 'react'
import PropTypes from 'prop-types'
import { AlertCircle, CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Skeleton } from "../ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"

const PaymentCard = ({ payment }) => (
  <Card className="w-full bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
    <CardHeader>
      <CardTitle className="flex items-center justify-between">
        <span className="text-lg font-semibold text-blue-600">{payment.amount} {payment.currency}</span>
        <CheckCircle className="h-5 w-5 text-green-500" />
      </CardTitle>
    </CardHeader>
    <CardContent>
      <dl className="space-y-2 text-sm">
        {[
          { label: 'Provider', value: payment.provider },
          { label: 'Beneficiary', value: payment.beneficiaryName },
          { label: 'Account', value: payment.beneficiaryAccountNumber },
          { label: 'SWIFT', value: payment.swiftCode },
          { label: 'Date', value: new Date(payment.createdAt).toLocaleString() },
        ].map(({ label, value }) => (
          <div key={label} className="flex justify-between">
            <dt className="font-medium text-gray-500">{label}:</dt>
            <dd className="text-gray-700">{value}</dd>
          </div>
        ))}
      </dl>
    </CardContent>
  </Card>
)

PaymentCard.propTypes = {
  payment: PropTypes.shape({
    amount: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    provider: PropTypes.string.isRequired,
    beneficiaryName: PropTypes.string.isRequired,
    beneficiaryAccountNumber: PropTypes.string.isRequired,
    swiftCode: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
}

const SkeletonCard = () => (
  <Card className="w-full">
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
)

export default function PaymentsList({ payments = [], loading, error }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }, (_, index) => (
          <SkeletonCard key={`skeleton-${index}`} />
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
        <PaymentCard key={payment._id} payment={payment} />
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