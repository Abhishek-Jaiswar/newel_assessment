import { Link } from 'react-router-dom';
import '../styles/auth.css';
import { useState } from 'react';
import axios from '../libs/axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [globalError, setGlobalError] = useState('');
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!username.trim()) newErrors.username = 'Username is required';
    if (!email.trim()) newErrors.email = 'Email is required';

    // email regex format validation
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Invalid email format';

    if (!contact.trim()) newErrors.contact = 'Contact is required';
    // contact regex format validation
    else if (!/^\d{10}$/.test(contact)) newErrors.contact = 'Contact must be a 10-digit number';

    if (!password.trim()) newErrors.password = 'Password is required';
    // password length validation
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters long';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post('/users/register', {
        username,
        email,
        contact,
        password,
      }, { withCredentials: true });

      if (response.status === 201) {
        navigate('/');
      } else {
        setGlobalError('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setGlobalError(
        error.response?.data?.message || 'An unexpected error occurred.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='container'>
      <div className='auth-form'>
        <div className='form-header'>
          <h1>Create your account</h1>
          <p className='text-center'>Please fill in the details below to create your account.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='input-group'>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className='input-bx'
              placeholder='Username'
              value={username}
              onChange={(e) => {
                setUsername(e.target.value)
                setErrors({ ...errors, username: '' })
              }}
            />
            {errors.username && <p className='error'>{errors.username}</p>}
          </div>

          <div className='input-group'>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className='input-bx'
              placeholder='Email'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setErrors({ ...errors, email: '' })
              }}
            />
            {errors.email && <p className='error'>{errors.email}</p>}
          </div>

          <div className='input-group'>
            <label htmlFor="contact">Contact</label>
            <input
              type="tel"
              id="contact"
              className="input-bx"
              placeholder="Contact"
              pattern="[0-9]{10}"
              maxLength={10}
              value={contact}
              onChange={(e) => {
                setContact(e.target.value)
                setErrors({ ...errors, contact: '' })
              }}
            />
            {errors.contact && <p className='error'>{errors.contact}</p>}
          </div>

          <div className='input-group'>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className='input-bx'
              placeholder='Password'
              value={password}
              onChange={(e) => { 
                setPassword(e.target.value)
                setErrors({ ...errors, password: '' })
              }}
            />
            {errors.password && <p className='error'>{errors.password}</p>}
          </div>


          <button
            type="submit"
            className='action-btn'
            // Disable if any field is empty
            disabled={loading}
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>

          {globalError && <p className='error'>{globalError}</p>}
          <p className='text-center'>Already have an account? <Link to={'/'}>Login</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Register;
