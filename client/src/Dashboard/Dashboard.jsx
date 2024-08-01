import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css'
import logo from '../Assets/logo.png';
const Dashboard = () => {
  // const [items, setItems] = useState([]);
  const [allCont,setCont]=useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchItems = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:3001/vat/allBooking');
  //       if (response.status === 200) {
  //         const data = response.data[0]?.items;
  //         if (Array.isArray(data)) {
  //           setItems(data);
  //         } else {
  //           throw new Error('Unexpected response structure');
  //         }
  //       }
  //       setLoading(false);
  //     } catch (error) {
  //       console.error('Error fetching all responses:', error);
  //       setError(error);
  //       setLoading(false);
  //     }
  //   };
  //   fetchItems();
  // }, []);

  useEffect(()=>{
    const fetchAll=async()=>{
      try {
        const response=await axios.get('http://localhost:3001/vat/getAllcontacts');
        if(response.status===200){
          setCont(response.data)
          setLoading(false)
        }
      } catch (error) {
        console.error('Error fetching all responses:', error);
      }
    }
    fetchAll()
  },[])


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    // <div id="items-container">
    //   {items.length > 0 ? (
    //     items.map(item => (
    //       <div key={item._id} className="item">
    //         <h2>{item.title}</h2>
    //         <p>{item.description}</p>
    //       </div>
    //     ))
    //   ) : (
    //     <p>No items available</p>
    //   )}
    // </div>
    <div>
    <div className="dashboard-frame">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"></link>
                <div className="dashboard-nav" onClick={() => window.location.href = '/Home'}>
                    <img className="company-dashboard-logo" src={logo} alt="" />
                    <p className='dashboard-title'>Dashboard</p>
                </div>
                </div>
      {
        allCont.map((value)=>(
          <div key={value._id}>
            <h1>{value.firstName}</h1>
            <p>{value.email}</p>
            <p>{value.phoneNumber}</p>
            <p>{value.commentMessage}</p>
          </div>
        ))}
    </div>
  );
};

export default Dashboard;
