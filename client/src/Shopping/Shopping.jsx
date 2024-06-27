import React, { useContext } from 'react'
import Navbar from '../Nav-Foot/Navbar'
import Footer from '../Nav-Foot/Footer'
import './Shopping.css'
import { CartContext } from '../Resources/CartContext';
import { RecoveryContext } from '../App';
import { useNavigate } from 'react-router-dom';

const Shopping = ({ products }) => {
    const { addToCart } = useContext(CartContext);
    const { show } = useContext(RecoveryContext);
    const navigate=useNavigate();
    return (
        <div>
            <Navbar />
            <div className="gallery-container">
            <div className="new-product">
            {show?(<button onClick={()=>{navigate('/Add')}}>Add</button>):('')}
            </div>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"></link>
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
        }}><i class="fa-solid fa-cart-plus"></i> {art.button2}</button>
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