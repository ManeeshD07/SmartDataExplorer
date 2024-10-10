// frontend/src/components/PurchaseFrequencyChart.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

function PurchaseFrequencyChart() {
  const [barData, setBarData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    
    axios.get('http://127.0.0.1:5000/purchase-frequency', {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(response => {
      const data = response.data;
      const barData = {
        labels: data.items,  // These will be the items
        datasets: [{
          label: 'Frequency of Purchases',
          data: data.counts,  // These will be the counts
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        }]
      };
      setBarData(barData);
      setLoading(false);
    })
    .catch(error => {
      console.error("Error fetching purchase frequency data:", error);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <h3>Top 10 Items by Purchase Frequency</h3>
      {loading ? <p>Loading...</p> : (
        <Bar
          data={barData}
          options={{
            responsive: true,
            plugins: {
              legend: { position: 'top' },
              title: { display: true, text: 'Purchase Frequency' },
            },
          }}
        />
      )}
    </div>
  );
}

export default PurchaseFrequencyChart;
