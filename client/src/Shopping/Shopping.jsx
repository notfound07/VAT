import React,{useContext} from 'react'
import Navbar from '../Nav-Foot/Navbar'
import Footer from '../Nav-Foot/Footer'
import './Shopping.css'
import { CartContext } from '../Resources/CartContext'
// import { products } from '../Resources/Products';
import { Link } from 'react-router-dom';

const Shopping = ({products}) => {
    const { addToCart } = useContext(CartContext);

  return (
    <div>
        <Navbar/>
        <div className="gallery-container">
            <div className="filter">
                <h3>Filter</h3>
                <label>
                    <input type="checkbox" /> Low Price
                </label>
                <label>
                    <input type="checkbox" /> High Price
                </label>
            </div>
            <div className="art-grid">
                {products.map((art) => (
                    <div className="art-card" key={art.id}>
                        <div className="art-image">
                            <img src={art.image} alt="Art" className='art-img'/>
                        </div>
                        <div className="art-details">
                            <h4 className='art-title'>{art.title}</h4>
                            <div className='all-btn'>
                            <Link to={`/Details/${art.id}`} className='art-btn' >{art.button}</Link>
                            <button className='art-btn'  onClick={() => addToCart(art)} style={{backgroundColor:"red"}}>{art.button2}</button>
                        </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default Shopping