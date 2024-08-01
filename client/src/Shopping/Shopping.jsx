import React, { useContext, } from 'react'
import Navbar from '../Nav-Foot/Navbar'
import Footer from '../Nav-Foot/Footer'
import './Shopping.css'
// import { CartContext } from '../Resources/CartContext';
import { RecoveryContext } from '../App';
import { useNavigate } from 'react-router-dom';
import { Buffer } from 'buffer'
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
                    {show ? (<h1>Shop</h1>) : ('')}
                    {show ? (<h4>Add New collection of art in shop</h4>) : ('')}
                    {show ? (<button className='art-btn-cart' onClick={() => { navigate('/Add') }}><i class="fa-solid fa-plus"></i> Add</button>) : ('')}
                </div>
                <div className='art-grid'>
                    {orders.map((item) => (
                        <div className='art-card' key={item._id}>
                            <div onClick={() => window.location.href = `/Details/${item._id}`}>
                                <div className='art-image' >
                                    <img src={`data:${item.image.contentType};base64,${Buffer.from(item.image.data).toString('base64')}`} alt={item.title} />
                                </div>
                                <div className="art-details">
                                    <h4 className='art-title'>{item.title}</h4>
                                    {/* <button className='art-btn-cart' onClick={(e) => {
                                        e.stopPropagation();
                                        addToCart(item);}}
                                    ><i className="fa-solid fa-cart-plus"></i> Add to Cart</button> */}
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