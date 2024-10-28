import '../styles/Dashboard.css';
import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
// import './Dashboard.css';

// Register components with ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Placeholder data for charts
const lineChartData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Sales',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: true,
      backgroundColor: 'rgba(75,192,192,0.2)',
      borderColor: 'rgba(75,192,192,1)',
    },
  ],
};

const barChartData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Reviews',
      data: [12, 19, 3, 5, 2, 3, 9],
      backgroundColor: 'rgba(54, 162, 235, 0.6)',
    },
  ],
};

function Dashboard() {
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>LOGO</h2>
        <nav>
          <ul>
            <li>Dashboard</li>
            <li>Analytics</li>
            <li>Inventory</li>
            <li>Enquiries</li>
            <li>Calender</li>
          </ul>
          <h3>Products</h3>
          <ul>
            <li>Add Product</li>
            <li>View Products</li>
          </ul>
          <h3>Misc</h3>
          <ul>
            <li>Notices</li>
            <li>Controls</li>
            <li>Settings</li>
          </ul>
        </nav>
      </aside>
      <main className="main-content">
        <header className="header">
          <h2>Good afternoon, Joe!</h2>
          <button className="view-logs-button">View Logs</button>
        </header>
        <section className="stats">
          <div className="stat-item">237 <span>Products Sold</span></div>
          <div className="stat-item">177 <span>Product Reviews</span></div>
          <div className="stat-item">31 <span>New Enquiries</span></div>
          <div className="stat-item">1,653 <span>Product Views</span></div>
        </section>
        <section className="charts">
          <div className="chart-container">
            <h3>Recent Sales</h3>
            <Line data={lineChartData} options={{ responsive: true }} />
          </div>
          <div className="chart-container">
            <h3>Recent Reviews</h3>
            <Bar data={barChartData} options={{ responsive: true }} />
          </div>
          <div className="transaction-container">
            <h3>Recent Transactions</h3>
            <ul>
              <li>Trent Murphy - $25.00</li>
              <li>Joseph Brent - $74.99</li>
              <li>Jacob Bator - $14.95</li>
              <li>Alex Mason - $44.99</li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
