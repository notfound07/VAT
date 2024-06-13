import React, { useState, useEffect } from 'react'
import { products } from '../Resources/Products';
import {  useParams } from 'react-router-dom';
import './Details.css';
import Navbar from '../Nav-Foot/Navbar';
import Footer from '../Nav-Foot/Footer';
const Detail = () => {
  const { id } = useParams();
  const product = products.filter(p => p.id === parseInt(id));
  const [shuffledProducts, setShuffledProducts] = useState([])
  function shuffleArray(array) {
    let shuffledArray = array.slice(); // Create a copy of the array
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }
  useEffect(() => {
    setShuffledProducts(shuffleArray(products).slice(0, 3));
  }, []);
  return (
    <div className='detail-page'>
      <Navbar />
      <div className="detail-container">
        <div className="main-column">
          {product.map((art) => (
            <div className="art-item" key={art.id}>
              <img src={art.image} alt={art.title} className="art-image" />
              <h2 className="art-name">{art.title}</h2>
              <div className="purchase-options">
                <button className="buy-now">Buy Now</button>
                <button className="add-to-cart">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
        <div className="side-column">
          <h2>Suggestions</h2>
          <div className='suggestions-container'>
            {shuffledProducts.map((articles) => (
              <div className='suggestions' key={articles.id}>
                <img src={articles.image} className="sugg-img" alt={articles.title} />
                <h2 className='sugg-title'>{articles.title}</h2>
                <button className='sugg-btn'>{articles.button}</button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );

}

export default Detail