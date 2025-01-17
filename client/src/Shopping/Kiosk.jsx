import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../Nav-Foot/Navbar';
import Footer from '../Nav-Foot/Footer';
import { RecoveryContext } from '../App';
import { Buffer } from 'buffer';
import './Shopping.css';
import logo from '../Assets/logo.png';
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS CSS

const Kiosk = () => {
    const { orders } = useContext(RecoveryContext);
    const [isLoading, setIsLoading] = useState(true); // Loading state

    useEffect(() => {
        // Initialize AOS
        AOS.init({
            duration: 1000, // Animation duration
        });
        
        // Set loading to false when orders are available
        if (orders.length > 0) {
            setIsLoading(false); 
        }
    }, [orders]);

    return (
        <div>
            <Navbar />
            <div className="gallery-container">
                <div className='art-grid'>
                    {isLoading ? (
                        <div className="load-shop">
                            <div className="loader-load-shop">
                                <img src={logo} alt="Logo" />
                            </div>
                            <p>Loading...</p>
                        </div>
                    ) : (
                        <div className="art-showcase">
                            {orders.filter(item => /Kiosks$/i.test(item.title))
                                .map((item) => (
                                    <div
                                        className="art-card"
                                        key={item._id} 
                                        onClick={() => window.location.href = item.title === "Kiosk" ? '/Kiosk' : `/Details/${item._id}`}
                                        data-aos="fade-up" // AOS animation
                                        data-aos-duration="1000" // Animation duration
                                    >
                                        <div className="art-image-wrapper">
                                            <img
                                                src={`data:${item.image.contentType};base64,${Buffer.from(item.image.data).toString('base64')}`}
                                                alt={item.title}
                                                className="art-image"
                                            />
                                            <div className="overlay">
                                                <button className="view-details-button" onClick={() => window.location.href = `/Details/${item._id}`}>View Details</button>
                                            </div>
                                        </div>
                                        <h3 className="art-title">{item.title}</h3>
                                    </div>
                                ))}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Kiosk;
