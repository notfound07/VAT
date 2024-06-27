import React, { useState, useEffect, useContext } from 'react';
import { products } from '../Resources/Products';
import { useParams } from 'react-router-dom';
import { RecoveryContext } from '../App';
import './Details.css';
import { CartContext } from '../Resources/CartContext';
import Navbar from '../Nav-Foot/Navbar';
import Footer from '../Nav-Foot/Footer';

const Detail = () => {
  const { id } = useParams();
  const productId = parseInt(id);
  const product = products.find(p => p.id === productId);
  const [shuffledProducts, setShuffledProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const { addToCart } = useContext(CartContext);
  const { show } = useContext(RecoveryContext);
  function shuffleArray(array) {
    let shuffledArray = array.slice(); // Create a copy of the array
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }

  useEffect(() => {
    const filteredProducts = products.filter(p => p.id !== productId); // Exclude the current product
    setShuffledProducts(shuffleArray(filteredProducts).slice(0, 3));
  }, [productId]);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className='detail-page'>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"></link>
      <Navbar />
      <div className="detail-container">
        <div className="main-column">
          <div className="art-item" key={product.id}>
            <div className='art-img-btn'>
              <div className='art-image-detail'>
                <img src={product.image} alt={product.title} />
              </div>
              <div className="art-cart-buy-btn">
                <button className="buy-now-btn" onClick={() => window.location.href = `/Payment`}>Buy Now <i className="fa-solid fa-right-long"></i></button>
                <button className="add-to-cart-btn" onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product);
                }}><i className="fa-solid fa-cart-plus"></i> Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
        <div className='art-details-text'>
          <div className="art-name">{product.title}</div>
          <h3>Description</h3>
          {show?(<button onClick={handleEditClick}> {isEditing ? 'Save' : 'Edit'}</button>):('')}
          <textarea rows='20' value={product.description} 
        readOnly={!isEditing}
        className={`art-description ${!isEditing ? 'readonly' : ''}`}/>
        </div>
        <div className="side-column">
          <h2>Suggestions</h2>
          <div className='suggestions-container'>
            {shuffledProducts.map((articles) => (
              <div className='suggestions' key={articles.id} onClick={() => window.location.href = `/Details/${articles.id}`}>
                <img src={articles.image} alt={articles.title} />
                <h2 className='sugg-title'>{articles.title}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Detail;
