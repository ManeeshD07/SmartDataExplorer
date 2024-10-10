// frontend/src/components/TimeTrendChart.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

function TimeTrendChart() {
  const [lineData, setLineData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    axios.get('http://127.0.0.1:5000/time-trend', {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(response => {
      const data = response.data;
      const lineData = {
        labels: data.dates,  // These are the dates
        datasets: [{
          label: 'Purchases Over Time',
          data: data.purchases,  // These are the purchase counts
          fill: false,
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
          borderColor: 'rgba(255, 99, 132, 1)',
          tension: 0.1,
        }],
      };
      setLineData(lineData);
      setLoading(false);
    })
    .catch(error => {
      console.error("Error fetching time trend data:", error);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <h3>Time-Based Purchase Trend</h3>
      {loading ? <p>Loading...</p> : (
        <Line
          data={lineData}
          options={{
            responsive: true,
            plugins: {
              legend: { position: 'top' },
              title: { display: true, text: 'Purchase Trends Over Time' },
            },
          }}
        />
      )}
    </div>
  );
}

export default TimeTrendChart;
