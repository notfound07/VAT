import React, { useContext,useEffect, useState } from 'react'
import Navbar from '../Nav-Foot/Navbar'
import Footer from '../Nav-Foot/Footer'
import './Shopping.css'
import axios from 'axios'
import { CartContext } from '../Resources/CartContext';
import { RecoveryContext } from '../App';
import { useNavigate } from 'react-router-dom';

const Shopping = ({ products }) => {
    const { addToCart } = useContext(CartContext);
    const { show } = useContext(RecoveryContext);
    const [order,setOrder]=useState();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchAllResponses = async () => {
          try {
            const response = await axios.get("http://localhost:3001/vat/getAllProducts");
            if (response.status === 200) {
              // Return the array of feedback responses
              setOrder(response.data);
              localStorage.setItem('AllOrder', JSON.stringify(response.data));
            }
          } catch (error) {
            console.error("Error fetching All responses:", error);
          }
        };
        const cachedRecords = localStorage.getItem('AllOrder');
        if (cachedRecords) {
          // If cached records exist, parse and set them into state
          setOrder(JSON.parse(cachedRecords));
        } else {
          // If no cached records, fetch them
          fetchAllResponses();
        }
        const interval = setInterval(() => {
          fetchAllResponses()
        }, 1000)
        return () => clearInterval(interval)
      }, [])
    return (
        <div>
            <Navbar />
            <div className="gallery-container">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"></link>
                <div className="new-product">
                    {show ? (<h1>Shop</h1>) : ('')}
                    {show ? (<h4>Add New collection of art in shop</h4>) : ('')}
                    {show ? (<button className='art-btn-cart' onClick={() => { navigate('/Add') }}><i class="fa-solid fa-plus"></i> Add</button>) : ('')}
                </div>
                <div className="art-grid">
                    {products.map((art) => (
                        <div className="art-card" onClick={() => window.location.href = `/Details/${art.id}`}>
                            <div className="art-image">
                                <img src={art.image} alt="Art" />
                            </div>
                            <div className="art-details">
                                <h4 className='art-title'>{art.title}</h4>
                                <div className='all-btn'>
                                    <button className='art-btn-cart' onClick={(e) => {
                                        e.stopPropagation();
                                        addToCart(art);
                                    }}><i className="fa-solid fa-cart-plus"></i> Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Shopping