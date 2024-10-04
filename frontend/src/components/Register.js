import React, { useState } from 'react';
import axios from 'axios';
import './styles/App.css';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: '',
    idNumber: '',
    accountNumber: '',
    password: ''
  });
  const [error, setError] = useState('');


  const regex = {
    fullName: /^[A-Za-z\s]{2,50}$/,
    idNumber: /^\d{13}$/,
    accountNumber: /^\d{10,12}$/,
    password: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+[\]{};':"\\|,.<>\/?`~-]{8,}$/
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
      const response = await axios.post('/api/auth/register', form, { https: true });
      if (response.data.success) {
        navigate('/login');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Full Name:
          <input type="text" name="fullName" value={form.fullName} onChange={handleChange} required />
        </label>
        <label>
          ID Number:
          <input type="text" name="idNumber" value={form.idNumber} onChange={handleChange} required />
        </label>
        <label>
          Account Number:
          <input type="text" name="accountNumber" value={form.accountNumber} onChange={handleChange} required />
        </label>
        <label>
          Password:
          <input type="password" name="password" value={form.password} onChange={handleChange} required />
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
