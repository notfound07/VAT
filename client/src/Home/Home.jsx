import './Home.css';
import React, { useState, useEffect } from 'react'
import Navbar from '../Nav-Foot/Navbar';
import Footer from '../Nav-Foot/Footer';
import { products } from '../Resources/Products';
import frontimg from '../Assets/front_img.jpeg';
import machine from '../Assets/machine.png';
import mission from '../Assets/mission.png';

const Home = () => {
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
    setShuffledProducts(shuffleArray(products).slice(0, 4));
  }, []);


  return (
    <div className='home-page'>
      <Navbar />
      <div className='main-image'>
        <img className='front-img' alt='' src={frontimg} />
      </div>
      <div className='product-display'>
        <div className="product-showcase">
          {shuffledProducts.map((product) => (
            <div className="product-card" onClick={() => window.location.href = `/Details/${product.id}`}>
              <div className="product-image">
                <img src={product.image} alt={product.title} />
              </div>
              <h3 className="product-title">{product.title}</h3>
            </div>
          ))}
        </div>
      </div>
      <div className='slogan-section' style={{ backgroundColor: 'lightgray' }}>
        <p className='slogan'>“We understand the value of asset and timeline”</p>
      </div>
      <div className="custom-showcase">
        <div className="display-info">
          <div className='info-img'>
            <img src={machine} alt="machine" />
          </div>
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
      <div className='heading-client' style={{ backgroundColor: 'lightgray' }}>
        <h2>Our Clients Trusted Us</h2>
        <div className='client-scroller'>
          Client scroller
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
