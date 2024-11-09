import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './App.css'; 

import Home from './components/Home';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Payment from './components/payments/Payment';
import CustomerDashboard from './components/dashboard/customer/Dashboard';
import EmployeeDashboard from './components/dashboard/employee/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';  

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setRole(decoded.role);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    // Clear sessionStorage and set login state to false
    sessionStorage.removeItem('token');
    setIsLoggedIn(false);
    setRole(null);
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav>
            <ClickableH1 isLoggedIn={isLoggedIn} handleLogout={handleLogout} role={role} />
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route 
              path="/dashboard/customer/dashboard" 
              element={
                <ProtectedRoute>
                  <CustomerDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/employee/dashboard" 
              element={
                <ProtectedRoute>
                  <EmployeeDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/payment" 
              element={
                <ProtectedRoute>
                  <Payment />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>

        <footer>
          <p>&copy; {new Date().getFullYear()} CineRedux. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}
function ClickableH1({ isLoggedIn, handleLogout, role }) {
  const navigate = useNavigate();
  const handleClick = () => {
    if (isLoggedIn) {
      let path = `/dashboard/${role}/dashboard`;
      navigate(path);
    } else {
      navigate('/');
    }
  };
  const location = useLocation();

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <h1 onClick={handleClick} style={{ cursor: 'pointer', userSelect: 'none' }}>
        CineRedux Customer Portal
      </h1>
      {isLoggedIn && (
        <div>
          {location.pathname !== '/payment' && (
            <button onClick={() => navigate('/payment')} style={{ cursor: 'pointer', marginRight: '10px' }}>
              Payment
            </button>
          )}
          <button onClick={handleLogout} style={{ cursor: 'pointer' }}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
