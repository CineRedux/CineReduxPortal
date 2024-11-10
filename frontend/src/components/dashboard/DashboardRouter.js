import React from 'react';
import { Navigate } from 'react-router-dom';
import CustomerDashboard from './customer/Dashboard';
import EmployeeDashboard from './employee/Dashboard';

const DashboardRouter = () => {
  const userRole = sessionStorage.getItem('userRole');

  if (!userRole) {
    return <Navigate to="/login" replace />;
  }

  switch (userRole) {
    case 'customer':
      return <CustomerDashboard />;
    case 'employee':
      return <EmployeeDashboard />;
    default:
      return <Navigate to="/login" replace />;
  }
};

export default DashboardRouter; 