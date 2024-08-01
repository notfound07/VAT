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
import Workslider from './workslider';
import VLogo from '../Assets/V-Logo.png';
import { Link, Element } from 'react-scroll';

const Home = () => {
  const { orders } = useContext(RecoveryContext);
  const [shuffledItems, setShuffledItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Shuffle orders to display random items
  const shuffleArray = (array) => {
    const shuffledArray = array.slice(); // Create a copy of the array
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  // Update shuffled items when orders change
  useEffect(() => {
    setShuffledItems(shuffleArray(orders).slice(0, 4));
  }, [orders]);

  // Handle key navigation for the slider
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight') {
        handleNext();
      } else if (event.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Autoplay feature for slider
  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNext();
    }, 20000); // Change slide every 10 seconds

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

  const renderMedia = (item) => {
    if (item.type === 'image') {
      return <img src={item.src} alt={item.alt} />;
    } else if (item.type === 'video') {
      return (
        <video autoPlay loop muted>
          <source src={item.src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    }
    return null;
  };

  const handlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div className='home-page'>
      <Navbar />
      <div className='slider' {...handlers}>
        <div className="slider-container" style={{ transform: `translateX(${-100 * currentIndex}%)` }}>
          {mediaItems.map((item, index) => (
            <div key={index} className={`slide ${currentIndex === index ? 'active' : ''}`}>
              {renderMedia(item)}
            </div>
          ))}
        </div>
        <div className='headline-container'>
          <p>This is a overview of our work!</p>
          <Link to="work-slider" smooth={true} duration={500}>
            <h3>Check out more....<i className="fa-solid fa-chevron-right"></i></h3>
          </Link>
        </div>
        <div className="dot-container">
          {mediaItems.map((_, index) => (
            <div
              key={index}
              className={`dot ${currentIndex === index ? 'active' : ''}`}
              onClick={() => handleDotClick(index)}
              aria-label={`Go to slide ${index + 1}`}
              role="button"
              tabIndex={0}
              onKeyPress={() => handleDotClick(index)}
            />
          ))}
        </div>
      </div>

      {/* Enhanced item Display */}
      <div className='item-display'>
        <div className="item-showcase">
          {shuffledItems.map((item) => (
            <div
              className="item-card"
              key={item._id}
              onClick={() => window.location.href = `/Details/${item._id}`}
              role="button"
              tabIndex={0}
              onKeyPress={() => window.location.href = `/Details/${item._id}`}
            >
              <div className="item-image-wrapper">
                <img
                  src={`data:${item.image.contentType};base64,${Buffer.from(item.image.data).toString('base64')}`}
                  alt={item.title}
                  className="item-image"
                />
                <div className="overlay">
                  <button className="view-details-button">View Details</button>
                </div>
              </div>
              <h3 className="item-title">{item.title}</h3>
            </div>
          ))}
        </div>
      </div>
      {/* End of Enhanced item Display */}

      {/* New Section Below */}
      <Element name="work-slider">
        <div className='back-color'>
          <Workslider />
        </div>
      </Element>
      {/* End of New Section */}

      <div className='slogan-section'>
        <p className='slogan'>“We understand the value of asset and timeline”</p>
      </div>
      <div className="custom-showcase">
        <div className="display-info">
          <div className='info-img'>
            <img src={machine} alt="Machine" />
          </div>
          <div className='desc'>
            <p className='desc-info'>
              We are offering Furnished Turned Components in all sizes, Threading, Drilling, Slotting, Milling etc.
            </p>
            <button className="desc-btn">Learn More</button>
          </div>
        </div>
        <div className="display-info">
          <div className='info-img'>
            <img src={mission} alt="Mission" />
          </div>
          <div className='desc'>
            <p className='desc-info'>
              A mission to associate ourselves with prestigious companies who have a good reputation like you.
            </p>
            <button className="desc-btn">Discover</button>
          </div>
        </div>
      </div>
      <div className="slogan">
        <p>Our Clients Trusted Us</p>
      </div>
      <div className='heading-client'>
        <div className='client-logo' onClick={() => window.location.href = 'https://vishalaakshiconsultants.com/'}>
          <img src={VLogo} alt="Client Logo" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
