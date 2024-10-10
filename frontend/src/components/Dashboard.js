// frontend/src/components/Dashboard.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const fetchProtected = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get('http://127.0.0.1:5000/protected', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage(`Hello, ${response.data.logged_in_as}!`);
    } catch (error) {
      setMessage('Failed to fetch protected data');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    navigate('/login');
  };

  useEffect(() => {
    fetchProtected();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <p>{message}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;
