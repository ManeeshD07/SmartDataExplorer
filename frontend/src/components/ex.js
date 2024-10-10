// frontend/src/components/Dashboard.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Import Chart.js and react-chartjs-2 components
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

// Register necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard() {
  const [chartData, setChartData] = useState(null); // Initialize as null
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const token = localStorage.getItem('access_token');

        if (!token) {
          throw new Error('No access token found. Please log in.');
        }

        const response = await axios.get('http://127.0.0.1:5000/chart-data', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Assuming response.data has { labels: [...], values: [...] }
        const { labels, values } = response.data;

        // Validate response data
        if (!labels || !values || labels.length !== values.length) {
          throw new Error('Invalid data format from server.');
        }

        const data = {
          labels: labels,
          datasets: [
            {
              label: 'Sales Distribution',
              data: values,
              backgroundColor: [
                'rgba(255, 99, 132, 0.6)',   // Red
                'rgba(54, 162, 235, 0.6)',   // Blue
                'rgba(255, 206, 86, 0.6)',   // Yellow
                'rgba(75, 192, 192, 0.6)',   // Green
                'rgba(153, 102, 255, 0.6)',  // Purple
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',     // Red
                'rgba(54, 162, 235, 1)',     // Blue
                'rgba(255, 206, 86, 1)',     // Yellow
                'rgba(75, 192, 192, 1)',     // Green
                'rgba(153, 102, 255, 1)',    // Purple
              ],
              borderWidth: 1,
            },
          ],
        };

        setChartData(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching chart data:', err);
        setError(err.message || 'An error occurred while fetching chart data.');
        setLoading(false);
      }
    };

    fetchChartData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    navigate('/login');
  };

  // Define chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top', // Position of the legend
      },
      title: {
        display: true,
        text: 'Sales Distribution by Category',
        font: {
          size: 18,
        },
      },
    },
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
      <h2>Dashboard</h2>

      {loading && <p>Loading chart...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {chartData && <Pie data={chartData} options={options} />}

      <button
        onClick={handleLogout}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#ff4d4d',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
