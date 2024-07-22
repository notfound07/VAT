import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:3001/vat/allBooking');
        if (response.status === 200) {
          // Extract items from the first object in the response array
          const data = response.data[0]?.items;
          if (Array.isArray(data)) {
            setItems(data);
          } else {
            throw new Error('Unexpected response structure');
          }
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching all responses:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div id="items-container">
      {items.length > 0 ? (
        items.map(item => (
          <div key={item._id} className="item">
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </div>
        ))
      ) : (
        <p>No items available</p>
      )}
    </div>
  );
};

export default Dashboard;
