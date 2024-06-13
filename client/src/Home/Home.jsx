import './Home.css';
import React from 'react';
import Navbar from '../Nav-Foot/Navbar';
import Footer from '../Nav-Foot/Footer';
import { products } from '../Resources/Products';
import machine from '../Assets/machine.png';
import mission from '../Assets/mission.png';

  const filteredProducts = products.filter(product =>
    product.id === 1 || product.id === 6 || product.id===7
  );
  
function Home() {
  return (
    <div>
      <Navbar />
      <div className='main-image'>
        Image
      </div>
      <div className='product-display'>
        <div className="product-showcase">
          {filteredProducts.map((product, index) => (
            <div className="product-card" key={index}>
              <img src={product.image} alt={product.title} className="product-image" />
              <h3 className="product-title">{product.title}</h3>
              <button onClick={() => window.location.href = `/Details/${product.id}`} className="view-more-button">{product.button}</button>
            </div>
          ))}
        </div>
      </div>
      <div className='slogan-section' style={{ backgroundColor: 'lightgray' }}>
        <p className='slogan'>“We understand the value of asset and timeline”</p>
      </div>
      <div className="custom-showcase">
        <div className="display-info">
          <img src={machine} alt="machine" className='info-img' />
          <div className='desc'>
            <p className='desc-info'>
              We are offering Furnished Turned Components in all sizes, Threading, Drilling, Slotting, Milling etc.
            </p>
            <button className='desc-btn'>Call Us</button>
          </div>
        </div>
        <div className="display-info">
          <img src={mission} alt="mission" className='info-img' />
          <div className='desc'>
            <p className='desc-info'>
              A mission to associate ourselves with prestigious companies who have a good reputation like you.
            </p>
            <button className='desc-btn'>Call Us</button>
          </div>
        </div>
      </div>
      <div style={{ backgroundColor: 'gray', height: '15px' }}></div>
      <div className='heading-client'>
        <h1>Our Clients Trusted Us</h1>
        <div className='client-scroller'>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
