import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';
import logo from '../Assets/logo.png';
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS styles

const Dashboard = () => {
  const [allCont, setCont] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseURL =
    window.location.hostname === "localhost"
      ? "http://localhost:3001/vat"
      : `${window.location.protocol}//visionaryarttech.com/vat`;

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const response = await axios.get(`${baseURL}/getAllcontacts`);
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
  }, [baseURL]);

  useEffect(() => {
    AOS.init({ // Initialize AOS
      duration: 1000, // Animation duration
      once: true, // Animation should happen only once
    });
  }, []);

  if (loading) {
    return (
      <div className="load">
        <div className="loader-load">
          <img src={logo} alt="Logo" />
        </div>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <div className="dashboard-frame">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" />
        <div className="dashboard-nav" onClick={() => window.location.href = '/'}>
          <img className="company-dashboard-logo" src={logo} alt="Company Logo" />
          <p className='dashboard-title'>Dashboard</p>
        </div>
      </div>
      <div className="dashboard-main">
        <div className='dashboard-details' data-aos="fade-down">Customer Order Details</div>
        <div className='dashboard-cards'>
          {allCont.map((value) => (
            <div className="dashboard-card" key={value._id} data-aos="fade-up">
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
