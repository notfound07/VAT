import './Home.css';
import React, { useState, useEffect, useContext } from 'react';
import Navbar from '../Nav-Foot/Navbar';
import Footer from '../Nav-Foot/Footer';
import { RecoveryContext } from '../App';
import Workslider from './workslider';
import { Link, Element } from 'react-scroll';
import VLogo from '../Assets/V-Logo.png';
import mission from '../Assets/mission.png';
import machine from '../Assets/machine.png';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Buffer } from 'buffer';
import CustomCarousel, { images } from './slider';


const Home = () => {
  const { orders } = useContext(RecoveryContext);
  const [shuffledItems, setShuffledItems] = useState([]);

  const shuffleArray = (array) => {
    const shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  useEffect(() => {
    setShuffledItems(shuffleArray(orders).slice(0, 4));
  }, [orders]);

  return (
    <div className='home-page'>
      <Navbar />
      {/* CustomCarousel Slider Integration */}
      <div className="custom-carousel-section">
        <CustomCarousel>
          {images.map((image, index) => (
            <img key={index} src={image.imgURL} alt={image.imgAlt} />
          ))}
        </CustomCarousel>
      </div>

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

      <Element className='work-slider' name="work-slider">
        <Workslider />
      </Element>

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
