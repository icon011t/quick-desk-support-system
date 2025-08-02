import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      await axios.post('http://localhost:5000/api/auth/register', form);
      navigate('/login');
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Create an Account</h2>

      <form onSubmit={handleSubmit} className="register-form">
        {errorMsg && <div className="register-error">{errorMsg}</div>}

        <label className="register-label">Full Name</label>
        <input
          name="name"
          className="register-input"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter your name"
          required
        />

        <label className="register-label">Email</label>
        <input
          name="email"
          type="email"
          className="register-input"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />

        <label className="register-label">Password</label>
        <input
          name="password"
          type="password"
          className="register-input"
          value={form.password}
          onChange={handleChange}
          placeholder="Create a password"
          required
        />

        <button type="submit" className="register-button">
          Register
        </button>
      </form>

      <div className="register-info">
        Already have an account?{' '}
        <Link to="/login" className="register-link">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Register;
