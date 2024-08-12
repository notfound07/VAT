import React from 'react'
import Navbar from '../Nav-Foot/Navbar';
import Footer from '../Nav-Foot/Footer';
import './Design.css';
import design from '../Assets/Design.jpg';

const Design = () => {
  return (
    <div >
      <Navbar />
      <div className='design-page'>
        <div className='design-container'>
          <img src= {design} alt="design"/>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Design