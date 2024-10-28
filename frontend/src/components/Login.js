// frontend/src/components/Login.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css'

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/login', {
        username,
        password,
      });
      localStorage.setItem('access_token', response.data.access_token);
      setMessage('Login successful');
      navigate('/dashboard');
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.msg);
      } else {
        setMessage('Login failed');
      }
    }
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div className='auth-page'>
      <div className="container">
      <div className="card">
        <h2 className="title">Login</h2>
        {message && <p className="message">{message}</p>}
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            placeholder="email address"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="input"
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input"
          />
          <button type="submit" className="button">Login</button>
        </form>
        <p className="signUp" onClick={handleRegister}>Sign Up</p>
      </div>
    </div>
    </div>
  );
}

export default Login;
