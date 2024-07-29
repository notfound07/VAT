import './Home.css';
import React, { useState, useEffect, useContext } from 'react';
import Navbar from '../Nav-Foot/Navbar';
import Footer from '../Nav-Foot/Footer';
import machine from '../Assets/machine.png';
import mission from '../Assets/mission.png';
import { RecoveryContext } from '../App';
import { Buffer } from 'buffer';
import { mediaItems } from './mediaData';
import { useSwipeable } from 'react-swipeable';

const Home = () => {
  const { orders } = useContext(RecoveryContext);
  const [shuffledProducts, setShuffledProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchTimeout, setTouchTimeout] = useState(null);

  function shuffleArray(array) {
    let shuffledArray = array.slice(); // Create a copy of the array
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }

  useEffect(() => {
    setShuffledProducts(shuffleArray(orders).slice(0, 4));
  }, [orders]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight') {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % mediaItems.length);
      } else if (event.key === 'ArrowLeft') {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + mediaItems.length) % mediaItems.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % mediaItems.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(intervalId);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % mediaItems.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + mediaItems.length) % mediaItems.length);
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  const handleTouchStart = (event) => {
    setTouchStartX(event.touches[0].clientX);
    setTouchTimeout(setTimeout(() => {
      // Hold detected
    }, 500)); // Hold detection time
  };

  const handleTouchMove = (event) => {
    if (touchStartX === null) return;
    const touchCurrentX = event.touches[0].clientX;
    if (Math.abs(touchCurrentX - touchStartX) > 50) {
      if (touchCurrentX - touchStartX > 0) {
        handlePrev();
      } else {
        handleNext();
      }
      setTouchStartX(null); // Reset touch start
      clearTimeout(touchTimeout); // Clear hold detection
    }
  };

  const handleTouchEnd = () => {
    setTouchStartX(null);
    clearTimeout(touchTimeout); // Clear hold detection
  };

  const renderMedia = (item) => {
    if (item.type === 'image') {
      return <img src={item.src} alt={item.alt} />;
    } else if (item.type === 'video') {
      return (
        <video controls>
          <source src={item.src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    }
    return null;
  };

  // const handlers=()=> useSwipeable({
  //   onSwipedLeft: () => handleNext(),
  //   onSwipedRight: () => handlePrev(),
  //   preventDefaultTouchmoveEvent: true,
  //   trackMouse: true
  // });

  return (
    <div className='home-page'>
      <Navbar />
      <div className='slider'
      //  {...handlers} 
       onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
        <div className="slider-container">
          {mediaItems.map((item, index) => (
            <div
              key={index}
              className={`slide ${currentIndex === index ? 'active' : ''}`}
              style={{ transform: `translateX(${-100 * currentIndex}%)` }}
            >
              {renderMedia(item)}
            </div>
          ))}
        </div>
        <div className="dot-container">
          {mediaItems.map((_, index) => (
            <div
              key={index}
              className={`dot ${currentIndex === index ? 'active' : ''}`}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>
        <div className="keys">Use left and right keys to navigate</div>
      </div>
      <div className='product-display'>
        <div className="product-showcase">
          {shuffledProducts.map((product) => (
            <div
              className="product-card"
              key={product.id}
              onClick={() => window.location.href = `/Details/${product._id}`}
            >
              <div className="product-image">
                <img
                  src={`data:${product.image.contentType};base64,${Buffer.from(product.image.data).toString('base64')}`}
                  alt={product.title}
                />
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
          </div>
        </div>
        <div className="display-info">
          <img src={mission} alt="mission" className='info-img' />
          <div className='desc'>
            <p className='desc-info'>
              A mission to associate ourselves with prestigious companies who have a good reputation like you.
            </p>
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
};

export default Home;
