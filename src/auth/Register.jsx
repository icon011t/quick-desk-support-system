import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace with real registration logic
    alert(`Registered ${form.name} with email: ${form.email}`);
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Create an account</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
          className="register-input"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="register-input"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="register-input"
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
