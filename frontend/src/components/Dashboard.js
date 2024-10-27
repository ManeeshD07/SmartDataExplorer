// frontend/src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,     // Import the Category scale (used for the x-axis)
  LinearScale,      // Import the Linear scale (used for the y-axis)
  PointElement,
  LineElement,
  BarElement,
  ArcElement,       // Required for Pie charts
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useFetchEVSalesData } from '../hooks/useFetchEVSalesData';

// Register the components to Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);


function Dashboard() {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const {chartData, loading, error} = useFetchEVSalesData();

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

  if (loading) {
    return <div>Loading Data...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  // useEffect(() => {
  //   fetchProtected();
  //   // eslint-disable-next-line
  // }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      
      <div className="graphs-container">
        {chartData && (
          <>
            <Line data={chartData.lineChartData} options={{ responsive: true, plugins: { legend: { position: 'top' }}}} />
            <Bar data={chartData.barChartData} options={{ responsive: true, plugins: { legend: { position: 'top' }}}} />
            <Pie data={chartData.pieChartData} options={{ responsive: true, plugins: { legend: { position: 'top' }}}} />
          </>
        )}
      </div>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;
