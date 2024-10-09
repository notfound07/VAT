import './Home.css';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Nav-Foot/Navbar';
import Footer from '../Nav-Foot/Footer';
import { RecoveryContext } from '../App';
import VLogo from '../Assets/V-Logo.png';
import VLogo2 from '../Assets/V-Logo2.jpg';
import VLogo3 from '../Assets/V-Logo3.png';
import mission from '../Assets/mission.png';
import machine from '../Assets/machine.png';
import logo from '../Assets/logo.png';
import museum from '../Assets/MuseumDisplay.jpeg';
import museum1 from '../Assets/MuseumDisplay1.jpeg';
import museum2 from '../Assets/MuseumDisplay2.png';
import objectiv from '../Assets/objectiv0.png';
import laser from '../Assets/LaserEtching.png';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Buffer } from 'buffer';
import CustomCarousel, { images } from './slider';
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS CSS

const Home = () => {
  const { orders } = useContext(RecoveryContext);
  const [shuffledItems, setShuffledItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  const shuffleArray = (array) => {
    const shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      offset: 100, // Offset (in px) from the original trigger point
    });
    if (orders.length > 0) {
      setIsLoading(false); // Set loading to false when orders are available
    }
  }, [orders]);


  useEffect(() => {
    if (orders.length) {
      setIsLoading(true);

      // Filter out the specific item you want to include in the shuffle (e.g., "Kiosk")
      const specificItem = orders.find(item => /Kiosk?$/i.test(item.title));

      // Filter out the other items
      const filteredOrders = orders.filter(item => !/Kiosks?$/i.test(item.title));

      // Combine the specific item with the other items
      const combinedOrders = specificItem ? [specificItem, ...filteredOrders] : filteredOrders;

      // Shuffle the combined list
      const shuffledItems = shuffleArray(combinedOrders).slice(0, 4); // Adjust the slice value if needed

      // Set the shuffled items to state
      setShuffledItems(shuffledItems);

      setIsLoading(false);
    }

    AOS.init({
      duration: 1000, // Animation duration
    });
  }, [orders]);

  return (
    <div className='home-page'>
      <Navbar />
      {/* CustomCarousel Slider Integration */}
      <div className="custom-carousel-section" data-aos="fade-down">
        <CustomCarousel>
          {images.map((image, index) => (
            <img key={index} src={image.imgURL} alt={image.imgAlt} />
          ))}
        </CustomCarousel>
      </div>
      <div className='home-page-pad'>
        <div className='item-display'>
          <div className="item-showcase">
            {isLoading ? (
              <div className="load">
                <div className="loader-load">
                  <img src={logo} alt="Logo" />
                </div>
                <p>Loading...</p>
              </div>
            ) : (
              shuffledItems.map((item) => (
                <div
                  className="item-card"
                  key={item._id}
                  onClick={() => window.location.href = item.title === "Kiosk" ? '/Kiosk' : `/Details/${item._id}`}
                  role="button"
                  tabIndex={0}
                  onKeyPress={() => window.location.href = item.title === "Kiosk" ? '/Kiosk' : `/Details/${item._id}`}
                  data-aos="fade-up" // AOS animation
                  data-aos-duration="1000" // Animation duration
                >
                  <div className="item-image-wrapper">
                    <img
                      src={`data:${item.image.contentType};base64,${Buffer.from(item.image.data).toString('base64')}`}
                      alt={item.title}
                      className="item-image"
                    />
                    <div className="overlay">
                      <button className="view-details-button">
                        {item.title === "Kiosk" ? "View All Products" : "View Details"}
                      </button>
                    </div>
                  </div>
                  <h3 className="item-title">{item.title}</h3>
                </div>
              ))
            )}
          </div>
        </div>

        <div>
          <div className='center-slogan' data-aos="fade-up">
            <div className='slogan'>
              <b className='slogan-company '>What We Do?</b>
            </div>
          </div>
          <div className='display-attributes'>
            <img className="attribute-image" src={museum2} alt="mission" data-aos="fade-right" />
            <div className='attribute-info' data-aos="fade-left">
              <h2>Custom Display Cases for Preservation</h2>
              <ul className='attribute-list'>
                <li>Tailored Solutions</li>
                <li>Material Preservation</li>
                <li>Environmental Control</li>
                <li>Safety & Accessibility</li>
                <li>Design Harmony</li>
                <li>Airtight Management</li>
              </ul>
            </div>
          </div>
          <div className='display-attributes'>
            <div className='attribute-info-reverse' data-aos="fade-right">
              <h2>Key Features of Our Display Cases</h2>
              <ul className='attribute-list-list'>
                <li>Humidity Control</li>
                <li>Light Management</li>
                <li>Pressure Maintenance</li>
                <li>Minimal Air Exchange</li>
                <li>Temperature Control</li>
                <li>Real-Time Monitoring</li>
              </ul>
            </div>
            <img className="attribute-image" src={museum1} alt="mission" data-aos="fade-left" />
          </div>
          <div className='display-attributes'>
            <img className="attribute-image" src={museum} alt="mission" data-aos="fade-right" />
            <div className='attribute-info' data-aos="fade-left">
              <h2>Advanced Features of Storage Cubicals</h2>
              <ul className='attribute-list'>
                <li>Humidity Regulation</li>
                <li>Light Control</li>
                <li>Positive Pressure</li>
                <li>Low Air Exchange</li>
                <li>Temperature Control</li>
                <li>Continuous Data Logging</li>
              </ul>
            </div>
          </div>
        </div>

        <div className='center-slogan' data-aos="fade-up">
          <div className='slogan-cust'>
            <b className='slogan-company'>We Customize Your Design For Yourself</b>
          </div>
        </div>
        <div className="custom-showcase">
          <div className="info-container" data-aos="zoom-in">
            <img className="info-img" src={machine} alt="Machine" />
            <p className="desc-info">
              We are offering Furnished Turned Components in all sizes, Threading, Drilling, Slotting, Milling etc.
            </p>
            <button className='info-button' onClick={() => { window.scrollTo(0, 0); navigate('/Contact'); }}><i className="fa-solid fa-arrow-right"></i></button>
          </div>

          <div className="info-container" data-aos="zoom-in">
            <img className="info-img" src={mission} alt="Mission" />
            <p className="desc-info">
              A mission to associate ourselves with prestigious companies who have a good reputation like you.
            </p>
            <button className='info-button' onClick={() => { window.scrollTo(0, 0); navigate('/Design'); }}><i className="fa-solid fa-arrow-right"></i></button>
          </div>
        </div>

        <div className='center-slogan' data-aos="fade-up">
          <div className="slogan">
            <b className="slogan-company">About Company</b>
          </div>
        </div>
        <div className='services-section'>
          <div className='services-objective' data-aos="fade-right">
            <b>Objective</b>
            <div className="image-objective">
              <img src={objectiv} alt="mission" />
            </div>
            <h3 className='quote'>
              “We understand the value of asset and timeline”
            </h3>
            <p className='objective-description'>
              Transforms our work culture to make things better and helps to engage long-lasting relationships. VisionaryArt aims to offer high quality and precision-turned components with all types of material at competitive prices to meet the market demand.
            </p>
          </div>
          <div className='services-technology' data-aos="fade-left">
            <b>Building Technology</b>
            <div className="image-objective">
              <img src={laser} alt="mission" />
            </div>
            <h3 className='technology-quote'>
              Crafting Excellence, Building Tomorrow
            </h3>
            <p className='technology-description'>
              We emphasize Smart Work rather than hard work. Our experienced and skilled labor assist by utilizing their potential. Quality machines also play an equally important role in this complete format.
            </p>
          </div>
        </div>

        <div className="slogan_client" data-aos="fade-up">Clients Corner</div>
        <div className='client-header'>
          <div className='client-item' data-aos="fade-up" data-aos-delay="100">
            <img className="client-img" src={VLogo2} alt="Client Logo" />
          </div>
          <div className='client-item' onClick={() => window.location.href = 'https://vishalaakshiconsultants.com/'} data-aos="fade-up" data-aos-delay="200">
            <img className="client-img" src={VLogo} alt="Client Logo" />
          </div>
          <div className='client-item' data-aos="fade-up" data-aos-delay="300">
            <img className="client-img" src={VLogo3} alt="Client Logo" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
