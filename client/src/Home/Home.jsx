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
      setIsLoading(true); // Set loading to true
      setShuffledItems(shuffleArray(orders).slice(0, 4));
      setIsLoading(false); // Set loading to false once items are set
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
            ))
          )}
        </div>
      </div>
      {/* 
      <Element className='work-slider' name="work-slider">
        <Workslider />
      </Element> */}
      <div>
        <div className='slogan-section'>
          <p className='slogan'>What we do?</p>
        </div>
        <div className='whatwedo'>
          <div className='whatwedotwo'>
            <img className="whatwedomu" src={museum} alt="mission" />
            <h2>Attributes of our Display cases</h2>
            <li className='desc-list'>Controlled RH (relative humidity)</li>
            <li className='desc-list'>Light control</li>
            <li className='desc-list'>Positive air pressure</li>
            <li className='desc-list'>Minimum air exchange</li>
            <li className='desc-list'>Temperature control</li>
            <li className='desc-list'>Real time data</li>
          </div>
          <p className='desc-info'>Each of our product is custom made in accordance with the customer requirement the collection and objects that they want to display since all the objects are made for different material, the need different environments for optimum protection and preservation
            Our manufactured units provide standards for climate control, humidity control light control, safety, opening mechanism. We try to incorporate these features with the best of design, style, form and performance.
            Our designs are in accordance with the exterior, interior and the usage of the space. According to that criterion we filter through placement design, opening type, orientation and mechanism of the display cases.
            Airtightness and micro environment management with Free standing as well as wall  mounted systems.
            Our designs include free standing, wall mounted, table, modular exhibition display cases. All of these display cases are airtight and with a microenvironment control and a microenvironment tracker</p>
          <div className='whatwedotwo'>
            <h2>Our Storage Cubicals</h2>
            <li className='desc-list'>Controlled RH (relative humidity)</li>
            <li className='desc-list'>Light control</li>
            <li className='desc-list'>Positive air pressure</li>
            <li className='desc-list'>Minimum air exchange</li>
            <li className='desc-list'>Temperature control</li>
            <li className='desc-list'>Real time data</li>
            <img className="whatwedomu" src={museum1} alt="mission" />
          </div>
        </div>
      </div>
      <div>
        <div className="slogan_client">
          About Company
        </div>
        <div className='whatwedo2'>
          <div className='whatwedotwo2'>
            <h2>Objective</h2>
            <p className='desc-list'>Tansforms our work culture to
              make things better and helps to
              engage long lasting relationship.
              VisionaryArt.aims to offer high
              quality and precision turned
              components with all types of
              material at competitive price to
              meet the market demand. </p>
            <div className='whatwedotwoob'>
              <img className="whatwedomuob" src={objectiv} alt="mission" />
            </div>
            <h3 className='desc-list'>“We understand the
              value of asset and
              timeline”</h3>
            <div className='whatwedotwoob'>
              <img className="whatwedomuob" src={objectiv1} alt="mission" />
            </div>
            <h3 className='desc-list'>Examples of Machine</h3>
          </div>
          <div className='whatwedotwo2'>
            <h2>Building
              Technology</h2>
            <p className='desc-whatwedo'>We emphasize on Smart Work rather than hard work.<br />
              Our Experienced and Skilled Labor assist by utilizing their potential.<br />
              Quality Machines also plays equally important role in this complete format.</p>
            <div className='whatwedotwoob'>
              <img className="whatwedomulaser" src={laser} alt="mission" />
            </div>
            <h3 className='desc-whatwedo'>Crafting
              Excellence, Building
              Tomorrow</h3>
          </div>
        </div>
      </div>

      <div className='slogan-section'>
        <p className='slogan'>WE CUSTOMIZE YOUR DESIGN FOR YOURSELF</p>
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
      <div className="slogan_client">
        Clients Corner
      </div>
      <div className='heading-client'>
        <div className='client-logo'>
          <img className="logo-img1" src={VLogo2} alt="Client Logo" />
        </div>
        <div className='client-logo1' onClick={() => window.location.href = 'https://vishalaakshiconsultants.com/'}>
          <img className="logo-img1" src={VLogo} alt="Client Logo" />
        </div>
        <div className='client-logo'>
          <img className="logo-img1" src={VLogo3} alt="Client Logo" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
