import './Home.css';
import React, { useState, useEffect, useContext } from 'react';
import Navbar from '../Nav-Foot/Navbar';
import Footer from '../Nav-Foot/Footer';
import { RecoveryContext } from '../App';
// import Workslider from './workslider';
// import { Link, Element } from 'react-scroll';
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
import objectiv1 from '../Assets/objectiv1.png';
import laser from '../Assets/LaserEtching.png';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Buffer } from 'buffer';
import CustomCarousel, { images } from './slider';


const Home = () => {
  const { orders } = useContext(RecoveryContext);
  const [shuffledItems, setShuffledItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  const shuffleArray = (array) => {
    const shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  useEffect(() => {
    if (orders.length) {
      setIsLoading(true);

      // Filter out the specific item you want to include in the shuffle (e.g., "Kiosk")
      const specificItem = orders.find(item => /Kiosks?$/i.test(item.title));

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
        {/* 
      <Element className='work-slider' name="work-slider">
        <Workslider />
      </Element> */}
        <div>
          <div className='center-slogan'>
            <div className='slogan'>
              <b className='slogan-company '>What We Do?</b>
            </div>
          </div>
          <div className='product-section'>
            <div className='product-info'>
              <img className="product-image" src={museum} alt="mission" />
              <p className='product-description'>
                Each of our products is custom-made in accordance with customer requirements and the collection of objects they want to display. Since all objects are made of different materials, they need different environments for optimum protection and preservation.<br />
                Our manufactured units provide standards for climate control, humidity control, light control, safety, and opening mechanisms. We incorporate these features with the best of design, style, form, and performance.<br />
                Our designs align with the exterior, interior, and intended use of the space. Based on these criteria, we filter through placement design, opening type, orientation, and mechanism of the display cases.<br />
                Airtightness and micro-environment management with free-standing as well as wall-mounted systems. Our designs include free-standing, wall-mounted, table, and modular exhibition display cases. All of these display cases are airtight, with micro-environment control and a tracker.
              </p>
            </div>

            <div className='display-attributes'>
              <div className='attribute-center'>
                <div className='attribute-info'>
                  <h2><span>Attributes</span> of our Display Cases</h2>
                  <ul>
                    <li className='attribute-list'>Controlled RH (relative humidity)</li>
                    <li className='attribute-list'>Light control</li>
                    <li className='attribute-list'>Positive air pressure</li>
                    <li className='attribute-list'>Minimum air exchange</li>
                    <li className='attribute-list'>Temperature control</li>
                    <li className='attribute-list'>Real-time data</li>
                  </ul>
                </div>
              </div>
              <img className="attribute-image" src={museum2} alt="mission" />
            </div>

            <div className='storage-cubicals'>
              <img className="storage-image" src={museum1} alt="mission" />
              <div className='storage-center'>
                <div className='storage-info'>
                  <h2>Our Storage Cubicals</h2>
                  <ul >
                    <li className='storage-list'>Controlled RH (relative humidity)</li>
                    <li className='storage-list'>Light control</li>
                    <li className='storage-list'>Positive air pressure</li>
                    <li className='storage-list'>Minimum air exchange</li>
                    <li className='storage-list'>Temperature control</li>
                    <li className='storage-list'>Real-time data</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div className='center-slogan'>
          <div className='slogan-cust'>
            <b className='slogan-company '>We Customize Your Design For Yourself</b>
          </div>
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
        <div>
          <div className='center-slogan'>
            <div class="slogan">
              <b class="slogan-company">About Company</b>
            </div>
          </div>
          <div className='services-section'>
            <div className='services-objective'>
              <h2>Objective</h2>
              <p className='objective-description'>
                Transforms our work culture to make things better and helps to engage long-lasting relationships.
                VisionaryArt aims to offer high quality and precision-turned components with all types of material
                at competitive prices to meet the market demand.
              </p>
              <div className='image-container'>
                <img className="image-objective" src={objectiv} alt="mission" />
              </div>
              <h3 className='quote'>
                “We understand the value of asset and timeline”
              </h3>
              <div className='image-container'>
                <img className="image-objective" src={objectiv1} alt="mission" />
              </div>
            </div>
            <div className='services-technology'>
              <h2>Building Technology</h2>
              <div className='image-wrapper'>
                <img src={laser} alt="mission" />
              </div>
              <p className='technology-description'>
                We emphasize Smart Work rather than hard work. <br />
                Our experienced and skilled labor assist by utilizing their potential. <br />
                Quality machines also play an equally important role in this complete format.
              </p>
              <h3 className='technology-quote'>
                Crafting Excellence, Building Tomorrow
              </h3>
            </div>
          </div>
        </div>
        <div className="slogan_client">Clients Corner</div>
        <div className='client-header'>
          <div className='client-item'>
            <img className="client-img" src={VLogo2} alt="Client Logo" />
          </div>
          <div className='client-item' onClick={() => window.location.href = 'https://vishalaakshiconsultants.com/'}>
            <img className="client-img" src={VLogo} alt="Client Logo" />
          </div>
          <div className='client-item'>
            <img className="client-img" src={VLogo3} alt="Client Logo" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
