import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace this with a real API call
    login({ email, role: 'user' });
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login to Quick Desk</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="login-input"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="login-input"
        />
        <button
          type="submit"
          className="login-button"
        >
          Login
        </button>
      </form>
      <div className="login-bottom">
        <p>
          Don't have an account?{' '}
          <Link to="/register" className="login-link">
            Register
          </Link>
        </p>
        <p>
          <Link to="/forgot-password" className="login-forgot">
            Forgot Password?
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
