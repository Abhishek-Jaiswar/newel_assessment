import '../styles/auth.css';
import { useState } from 'react';
import axios from '../libs/axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [identifier, setIdentifier] = useState(''); // email or contact
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [globalError, setGlobalError] = useState('');
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!identifier.trim()) newErrors.identifier = 'Email or contact is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier) && !/^\d{10}$/.test(identifier)) {
      newErrors.identifier = 'Enter valid email or 10-digit contact number';
    }

    if (!password.trim()) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters long';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      setErrors({});
      setGlobalError('');

      const payload = {
        password,
      };

      // Dynamically assign either email or contact
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier)) {
        payload.email = identifier;
      } else {
        payload.contact = identifier;
      }

      const response = await axios.post('/users/login', payload, {
        withCredentials: true,
      });

      if (response.status === 200) {
        navigate('/list');
      } else {
        setGlobalError('Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setGlobalError(error.response?.data?.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div className="auth-form">
        <div className="form-header">
          <h1>Welcome Back!</h1>
          <p className="text-center">
            Please fill in the details below to log in to your account.
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="identifier">Email / Contact</label>
            <input
              type="text"
              className="input-bx"
              placeholder="email or contact"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
            />
            {errors.identifier && <p className="error">{errors.identifier}</p>}
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="input-bx"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>

          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Wait a sec...' : 'Login'}
          </button>

          {globalError && <p className="error text-center">{globalError}</p>}

          <p className="text-center">
            Don't have an account? <a href="/register">Create one</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
