import React, { useContext } from 'react'
import Navbar from '../Nav-Foot/Navbar';
import Footer from '../Nav-Foot/Footer';
import { RecoveryContext } from '../App';
import { Buffer } from 'buffer';
import './Shopping.css';


const Kiosk = () => {
    const { orders } = useContext(RecoveryContext);
    return (
        <div>
            <Navbar />
            <div className="gallery-container">
                <div className='art-grid'>
                    <div className="art-showcase">
                        {orders.filter(item => /Kiosks$/i.test(item.title))
                            .map((item) =>
                            (
                                <div
                                    className="art-card"
                                    key={item._id} onClick={() => window.location.href = item.title === "Kiosk" ? '/Kiosk' : `/Details/${item._id}`}
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
                            )
                            )}
                    </div>
                </div>
            </div>
            <Footer />
        </div >
    )
}

export default Kiosk