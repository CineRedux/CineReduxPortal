import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css'; 

import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Payment from './components/Payment';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav>
            <ClickableH1 />
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Payment" element={<Payment />} />
          </Routes>
        </main>

        <footer>
          <p>&copy; {new Date().getFullYear()} CineRedux. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

function ClickableH1() {
  const navigate = useNavigate();

  return (
    <h1 onClick={() => navigate('/')} style={{ cursor: 'pointer', userSelect: 'none' }}>
      CineRedux Customer Portal
    </h1>
  );
}
export default App;
