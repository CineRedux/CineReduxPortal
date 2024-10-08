import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './App.css'; 

import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Payment from './components/Payment';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';  

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    // Clear sessionStorage and set login state to false
    sessionStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav>
            <ClickableH1 isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
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
function ClickableH1({ isLoggedIn, handleLogout }) {
  const navigate = useNavigate();
  const handleClick = () => {
    if (isLoggedIn) {
      navigate('/dashboard');
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
