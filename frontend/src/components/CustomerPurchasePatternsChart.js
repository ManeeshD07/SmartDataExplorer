// frontend/src/components/CustomerPurchasePatternsChart.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

function CustomerPurchasePatternsChart({ memberId }) {
  const [lineData, setLineData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    axios.get(`http://127.0.0.1:5000/purchase-patterns/${memberId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(response => {
      const data = response.data;
      const lineData = {
        labels: data.dates,  // These are the dates
        datasets: [{
          label: 'Purchases',
          data: data.purchases,  // These are the purchase counts
          fill: false,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          tension: 0.1,
        }],
      };
      setLineData(lineData);
      setLoading(false);
    })
    .catch(error => {
      console.error("Error fetching customer purchase patterns:", error);
      setLoading(false);
    });
  }, [memberId]);

  return (
    <div>
      <h3>Customer {memberId} Purchase Patterns</h3>
      {loading ? <p>Loading...</p> : (
        <Line
          data={lineData}
          options={{
            responsive: true,
            plugins: {
              legend: { position: 'top' },
              title: { display: true, text: `Purchase Patterns for Customer ${memberId}` },
            },
          }}
        />
      )}
    </div>
  );
}

export default CustomerPurchasePatternsChart;
