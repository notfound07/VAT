import './Nav-Foot.css';
import logo from '../Assets/logo.png'; // Import the image
import { IoCall } from "react-icons/io5"
import { SlSocialInstagram } from "react-icons/sl";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import React from 'react';

function Footer() {
  return (
    <footer className="footer">
    <div className="footer-content">
      <div className="footer-section logo">
      <img className="footer-company-logo" src={logo} alt="" />
      </div>
      <div className="footer-section contact">
        <h2>GET IN TOUCH</h2>
        <p><i class="fa-solid fa-location-pin"></i>KH NO.-745 GALI NO.-12,SADDIQ NAGAR,GHAZIABAD,U.P.-201017(INDIA)</p>
        <p><IoCall />8800026077</p>
        <p><IoCall />999222303</p>
        <p><MdOutlineAlternateEmail />visionart.tech24@gmail.com</p>
      </div>
      <div className="footer-section social">
        <h2>Follow US</h2>
        <div className="social-icons">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <SlSocialInstagram />Instagram
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter />Twitter
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebook />Facebook
          </a>
        </div>
      </div>
    </div>
    <div className="footer-bottom">
      <p>© 2024. All Rights Reserved</p>
    </div>
  </footer>
  );
}

export default Footer;
