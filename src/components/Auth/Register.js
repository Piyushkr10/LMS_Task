import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../api/api';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'Student' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', form);
      navigate('/login');
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        {error && <p className="error">{error}</p>}
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <select name="role" onChange={handleChange}>
          <option value="Student">Student</option>
          <option value="Admin">Admin</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
