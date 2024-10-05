import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles/Login.css';

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '',
    accountNumber: '',
    password: ''
  });
  const [error, setError] = useState('');


  const regex = {
    username: /^[A-Za-z0-9_]{3,30}$/,
    accountNumber: /^\d{10,12}$/,
    password: /^.{8,}$/
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    for (let key in form) {
      if (!regex[key].test(form[key])) {
        setError(`Invalid ${key}`);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validate()) return;

    try {
      const response = await axios.post('/api/auth/login', form, { https: true });
      if (response.data.success) {
        // Store token or session info as needed
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" name="username" value={form.username} onChange={handleChange} required />
        </label>
        <label>
          Account Number:
          <input type="text" name="accountNumber" value={form.accountNumber} onChange={handleChange} required />
        </label>
        <label>
          Password:
          <input type="password" name="password" value={form.password} onChange={handleChange} required />
        </label>
        <button type="submit">Login</button>
      </form>
      <p className="register-link" onClick={() => navigate('/register')}>
          Don't have an account? <span>Create one</span>
      </p>
    </div>
  );
}

export default Login;
