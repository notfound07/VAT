import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';
import logo from '../Assets/logo.png';

const Dashboard = () => {
  const [allCont, setCont] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_API_URL
    : 'http://localhost:3001'; 

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const response = await axios.get(`${apiUrl}/vat/getAllcontacts`);
        if (response.status === 200) {
          setCont(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching all responses:', error);
        setError(error);
        setLoading(false);
      }
    };
    fetchAll();
  }, [apiUrl]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <div className="dashboard-frame">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" />
        <div className="dashboard-nav" onClick={() => window.location.href = '/Home'}>
          <img className="company-dashboard-logo" src={logo} alt="Company Logo" />
          <p className='dashboard-title'>Dashboard</p>
        </div>
      </div>
      <div className="dashboard-main">
        <div className='dashboard-details'>Customer Order Details</div>
        <div className='dashboard-cards'>
          {allCont.map((value) => (
            <div className="dashboard-card" key={value._id}>
              <h1>{value.firstName}</h1>
              <p>{value.email}</p>
              <p>{value.phoneNumber}</p>
              <p>{value.commentMessage}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
