import React, { useContext, useState, useEffect } from 'react';
import Navbar from '../Nav-Foot/Navbar';
import Footer from '../Nav-Foot/Footer';
import './Shopping.css';
import { RecoveryContext } from '../App';
import { useNavigate } from 'react-router-dom';
import { Buffer } from 'buffer';
import logo from '../Assets/logo.png';
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS styles

const Shopping = () => {
    const { show, orders } = useContext(RecoveryContext);
    const [isLoading, setIsLoading] = useState(true); // Loading state
    const navigate = useNavigate();

    useEffect(() => {
        AOS.init({
            duration: 1000, // Animation duration
          });
        if (orders.length > 0) {
            setIsLoading(false); // Set loading to false when orders are available
        }
    }, [orders]);

    return (
        <div>
            <Navbar />
            <div className="gallery-container">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"></link>
                <div className="new-product" data-aos="fade-up">
                    {show && (
                        <>
                            <h1>Manufacturing Unit</h1>
                            <h4>Add New Manufacturing Item</h4>
                            <button className='art-add' onClick={() => navigate('/Add')}>
                                <i className="fa-solid fa-plus" aria-hidden="true"></i> Add
                            </button>
                        </>
                    )}
                </div>
                <div className='art-grid'>
                    {isLoading ? (
                        <div className="load-shop-shop">
                            <div className="loader-load-shop-shop">
                                <img src={logo} alt="Logo" />
                            </div>
                            <p>Loading...</p>
                        </div>
                    ) : (
                        <div className="art-showcase">
                            {orders.filter(item => !/Kiosks$/i.test(item.title))
                                .map((item) => (
                                    <div 
                                        className="art-card" 
                                        key={item._id} 
                                        onClick={() => window.location.href = item.title === "Kiosk" ? '/Kiosk' : `/Details/${item._id}`}
                                        data-aos="fade-up" // Add AOS animation here
                                    >
                                        <div className="art-image-wrapper">
                                            <img
                                                src={`data:${item.image.contentType};base64,${Buffer.from(item.image.data).toString('base64')}`}
                                                alt={item.title}
                                                className="art-image"
                                            />
                                            <div className="overlay">
                                                <button className="view-details-button">
                                                    {item.title === "Kiosk" ? "View All Products" : "View Details"}
                                                </button>
                                            </div>
                                        </div>
                                        <h3 className="art-title">{item.title}</h3>
                                    </div>
                                ))
                            }
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Shopping;
