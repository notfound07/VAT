import './Footer.css';
import logo from '../Assets/logo.png'; // Import the image
import { IoCall } from "react-icons/io5";
import linkedin from '../Assets/linkedin.png';
import facebook from '../Assets/facebook.png';
import twitter from '../Assets/twitter.png';
import instagram from '../Assets/instagram.png';
import { MdOutlineAlternateEmail } from "react-icons/md";
import React from 'react';
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-background">
        <img src={logo} alt="Background" className="footer-background-image" />
        <div className="footer-overlay"></div>
      </div>
      <div className="footer-content">
        <div className="footer-section-contact">
          <h2>GET IN TOUCH</h2>
        </div>
        <div className="footer-section-contact">
          <div className="footer-section-text">
            <div className='align-icon-text'>
              <i className="fa-solid fa-location-pin"></i>
              <p>
                KH NO.-745 GALI NO.-12, SADDIQ<br />
                <span>NAGAR, GHAZIABAD, U.P.-201017 (INDIA)</span>
              </p>
            </div>
            <div className='align-icon-text'>
              <IoCall />
              <p className='number'>+91 8800026077</p>
            </div>
            <div className='align-icon-text'>
              <IoCall />
              <p className='number'>+91 9999222303</p>
            </div>
            <div className='align-icon-text'>
              <MdOutlineAlternateEmail />
              <p>visionart.tech24@gmail.com</p>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>VisualArtTechnologies © 2024. All Rights Reserved</p>
          <div className="footer-section-social">
            <div className="social-icons">
              <a href='https://www.instagram.com/visionaryart.tech24/?hl=en' target="_blank" rel="noopener noreferrer" className="foot-button"><img className="footer-logo" alt="Instagram" src={instagram} /></a>
              <a href='https://www.facebook.com/' target="_blank" rel="noopener noreferrer" className="foot-button"><img className="footer-logo" alt="Facebook" src={facebook} /></a>
              <a href='https://x.com/technologies08' target="_blank" rel="noopener noreferrer" className="foot-button"><img className="footer-logo" alt="Twitter" src={twitter} /></a>
              <a href='https://www.linkedin.com/in/visionary-artttechnology-a47b49320/' target="_blank" rel="noopener noreferrer" className="foot-button"><img className="footer-logo" alt="Linkedin" src={linkedin} /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
