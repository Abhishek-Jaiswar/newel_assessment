import { Link } from 'react-router-dom';
import '../styles/auth.css';
import { useState } from 'react';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  console.log(username);


  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div className='container'>
      <div className='auth-form'>
        <div className='form-header'>
          <h1>Create your account</h1>
          <p className='text-center'>Please fill in the details below to create your account.</p>
        </div>
        <form>
          <div>
            <div className='input-group'>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className='input-bx'
                placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <p className='error'>*validation</p>
            </div>

            <div className='input-group'>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className='input-bx'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className='error'>*validation</p>
            </div>

            <div className='input-group'>
              <label htmlFor="password">Contact</label>
              <input
                type="tel"
                name="contact"
                id="contact"
                className="input-bx"
                placeholder="Contact"
                pattern="[0-9]{10}"
                maxLength={10}
                value={contact}
                onChange={(e) => setContact(e.target.value)} />
              <p className='error'>*validation</p>
            </div>

            <div className='input-group'>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className='input-bx'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className='error'>*validation</p>
            </div>

          </div>
          <button
            className='action-btn'
            onClick={handleSubmit}
            disabled={!username || !email || !contact || !password}
          >
            Register
          </button>
          <p className='error'>*validation</p>
          <p className='text-center'>Already have an account? <Link to={'/'}>Login</Link></p>

        </form>
      </div>
    </div>
  )
}

export default Register