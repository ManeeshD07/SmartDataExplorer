import { useState, useEffect } from 'react';
import axios from 'axios';

// Custom hook for fetching and processing EV sales data
export const useFetchEVSalesData = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEvSalesData = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get('http://127.0.0.1:5000/api/ev_sales', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      console.log("Fetched EV Sales Data", response.data)

      processChartData(response.data); // Process and set chart data
    } catch (err) {
        console.error("Error fetching EV sales data", err)
        setError('Failed to fetch EV sales data');
    } finally {
      setLoading(false);
    }
  };

  const processChartData = (data) => {
    // Create labels and values from the item counts data
    const labels = data.map(item => item.itemDescription);
    const values = data.map(item => item.Count);  

    // Prepare chart data for Line, Bar, and Pie charts
    // Prepare chart data for Line, Bar, and Pie charts
    const processedChartData = {
        lineChartData: {
          labels: labels,
          datasets: [{
            label: 'Item Sales by Description',
            data: values,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
          }]
        },
        barChartData: {
          labels: labels,
          datasets: [{
            label: 'Item Sales by Description',
            data: values,
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
          }]
        },
        pieChartData: {
          labels: labels,
          datasets: [{
            data: values,
            backgroundColor: [
              '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'
            ],
          }]
        }
      };

    setChartData(processedChartData);
  };

  useEffect(() => {
    fetchEvSalesData();
  }, []);

  return { chartData, loading, error };
};
