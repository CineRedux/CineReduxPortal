import React, { useState } from 'react';
import api from '../axiosConfig';
import './styles/App.css';
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '', 
    fullName: '',
    idNumber: '',
    accountNumber: '',
    password: ''
  });
  const [error, setError] = useState('');

  const regex = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    fullName: /^[A-Za-z\s]{2,50}$/,
    idNumber: /^\d{13}$/,
    accountNumber: /^\d{10,12}$/,
    password: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/
  };

  const handleChange = (e) => {
    const sanitizedValue = DOMPurify.sanitize(e.target.value);
    setForm({ ...form, [e.target.name]: sanitizedValue });
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
      const response = await api.post('/api/users/register', form, { https: true });
      if (response.status === 201) {
        navigate('/login');
      }
    } catch (err) {
      setError(`Registration failed, ${err.response.data.message}`);
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Email: {/* Add email label */}
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </label>
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
      <p className="register-link" onClick={() => navigate('/login')}>
          Already have an account? <span>Login in!</span>
      </p>
    </div>
  );
}

export default Register;
