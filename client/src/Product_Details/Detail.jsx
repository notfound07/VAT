import React, { useState, useEffect } from 'react'
import { products } from '../Resources/Products';
import { useParams } from 'react-router-dom';
import './Details.css';
import Navbar from '../Nav-Foot/Navbar';
import Footer from '../Nav-Foot/Footer';

const Detail = () => {
  const { id } = useParams();
  const productId = parseInt(id);
  const product = products.filter(p => p.id === productId);
  const [shuffledProducts, setShuffledProducts] = useState([]);

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

  return (
    <div className='detail-page'>
      <Navbar />
      <div className="detail-container">
        <div className="main-column">
          {product.map((art) => (
            <div className="art-item" key={art.id}>
              <div className='art-image-detail'>
                <img src={art.image} alt={art.title} />
              </div>
              <div className='art-details-text-btn'>
                <h2 className="art-name">{art.title}</h2>
                <button className="buy-now-btn">Buy Now</button>
                <button className="add-to-cart-btn">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
        <div className="side-column">
          <h2>Suggestions</h2>
          <div className='suggestions-container' >
            {shuffledProducts.map((articles) => (
              <div className='suggestions' key={articles.id} onClick={() => window.location.href = `/Details/${articles.id}`}>
                <img src={articles.image} className="sugg-img" alt={articles.title} />
                <h2 className='sugg-title'>{articles.title}</h2>
                {/* <button className='sugg-btn' onClick={() => window.location.href = `/Details/${articles.id}`}>{articles.button}</button> */}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Detail;
