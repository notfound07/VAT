import React, { useState, useEffect, useContext, useRef } from 'react';
import { products } from '../Resources/Products';
import { useParams } from 'react-router-dom';
import './Details.css';
import Navbar from '../Nav-Foot/Navbar';
import Footer from '../Nav-Foot/Footer';
import { CartContext } from '../Resources/CartContext';

const Detail = () => {
  const { id } = useParams();
  const productId = parseInt(id);
  const product = products.find(p => p.id === productId);
  const [shuffledProducts, setShuffledProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

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

  const [boxInitialTop, setBoxInitialTop] = useState(0);
  const [isFixed, setIsFixed] = useState(false);
  const [footerTop, setFooterTop] = useState(0);
  const artItemRef = useRef(null);
  const footerRef = useRef(null);

  useEffect(() => {
    const imageElement = document.querySelector('.art-item');
    const footerElement = document.querySelector('.footer');

    if (imageElement) {
      setBoxInitialTop(imageElement.offsetTop);
    }

    if (footerElement) {
      setFooterTop(footerElement.offsetTop);
    }

    const handleScroll = () => {
      const scrollY = window.pageYOffset;

      if (scrollY >= boxInitialTop && scrollY + artItemRef.current.clientHeight <= footerTop) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [boxInitialTop, footerTop]);

  return (
    <div className='detail-page'>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"></link>
      <Navbar />
      <div className="detail-container">
        <div className="main-column">
          <div ref={artItemRef} className={`art-item ${isFixed ? 'fixed' : ''}`} key={product.id}>
            <div className='art-img-btn'>
              <div className='art-image-detail'>
                <img src={product.image} alt={product.title} />
              </div>
              <div className="art-cart-buy-btn">
                <button className="buy-now-btn">Buy Now <i className="fa-solid fa-right-long"></i></button>
                <button className="add-to-cart-btn" onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product);
                }}><i className="fa-solid fa-cart-plus"></i> Add to Cart</button>
              </div>
            </div>
          </div>
          <div className="art-item-placeholder" style={{ height: isFixed ? artItemRef.current.clientHeight + 'px' : '0' }} />
          <div ref={footerRef}></div>
        </div>
        <div className='art-details-text'>
          <div className="art-name">{product.title}</div>
          <h2 className="art-price">{product.price}</h2>
          <h3>Description</h3>
          <div className="art-description">{product.description}</div>
        </div>
        <div className="side-column">
          <div className='suggestions-container'>
            <h2>Suggestions</h2>
            {shuffledProducts.map((articles) => (
              <div className='suggestions' key={articles.id} onClick={() => window.location.href = `/Details/${articles.id}`}>
                <img src={articles.image} className="sugg-img" alt={articles.title} />
                <h2 className='sugg-title'>{articles.title}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div ref={footerRef}>
        <Footer />
      </div>
    </div>
  );
};

export default Detail;
