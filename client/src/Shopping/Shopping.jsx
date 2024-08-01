import React, { useContext } from 'react';
import Navbar from '../Nav-Foot/Navbar';
import Footer from '../Nav-Foot/Footer';
import './Shopping.css';
import { CartContext } from '../Resources/CartContext';
import { RecoveryContext } from '../App';
import { useNavigate } from 'react-router-dom';
import { Buffer } from 'buffer';

const Shopping = () => {
    // const { addToCart } = useContext(CartContext);
    const { show, orders } = useContext(RecoveryContext);
    const navigate = useNavigate();

    return (
        <div>
            <Navbar />
            <div className="gallery-container">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"></link>
                <div className="new-product">
                    {show && (
                        <>
                            <h1>Shop</h1>
                            <h4>Add New collection of art in shop</h4>
                            <button className='art-btn-cart' onClick={() => navigate('/Add')}>
                                <i className="fa-solid fa-plus" aria-hidden="true"></i> Add
                            </button>
                        </>
                    )}
                </div>
                <div className='art-grid'>
    <div className="art-showcase">
        {orders.map((item) => (
            <div
                className="art-card"
                key={item._id}
                onClick={() => window.location.href = `/Details/${item._id}`}
                role="button"
                tabIndex={0}
                onKeyPress={() => window.location.href = `/Details/${item._id}`}
            >
                <div className="art-image-wrapper">
                    <img
                        src={`data:${item.image.contentType};base64,${Buffer.from(item.image.data).toString('base64')}`}
                        alt={item.title}
                        className="art-image"
                    />
                    <div className="overlay">
                        <button className="view-details-button">View Details</button>
                    </div>
                </div>
                <h3 className="art-title">{item.title}</h3>
            </div>
        ))}
    </div>
</div>

            </div>
            <Footer />
        </div>
    );
}

export default Shopping;
