import './Home.css';
import React from 'react';
import Navbar from '../Nav-Foot/Navbar';
import Footer from '../Nav-Foot/Footer';
import { products } from '../Resources/Products';
import machine from '../Assets/machine.png'; // Import the image
import mission from '../Assets/mission.png'; // Import the image

function Home() {
  return (
    <div>
        <Navbar/>
       <section>
        image
       </section>
       <section className='product-display'>
       <div className="product-showcase">
       {products.map((product, index) => (
        <div className="product-card" key={index}>
          <img src={product.image} alt={product.title} className="product-image" />
          <h3 className="product-title">{product.title}</h3>
          <button className="view-more-button">{product.button}</button>
        </div>
      ))}
    </div>
       </section>
       <section style={{backgroundColor:'lightgray'}}>
        <p className='slogan'>“We understand the value of asset and timeline”</p>
       </section>
       <section >
       <div className="custom-showcase">
        <div className='display-info'>
       <img src={machine} alt='machine' className='info-img' />
       <div className='desc'>
        <p className='desc-info'>We are offering Furnished Turned Components in all sizes, Threading, Drilling, Slotting, Milling etc.
        </p>
        <button className='desc-btn'>Call Us</button>
       </div>
        </div>
        <div className='display-info'>
       <img src={mission} alt='machine' className='info-img'/>
       <div className='desc'>
        <p className='desc-info'>A mission to associate ourselves with prestigious companies who has good reputation like you.
        </p>
        <button className='desc-btn'>Call Us</button>
       </div>
        </div>
        </div>
       </section>
       <section style={{backgroundColor:'gray', height:15}}></section>
       <section style={{backgroundColor:'lightgray'}}>
        <h1 className='heading-client'>Our Client Trusted Us</h1>
        yaha ek scroller bnana h
       </section>
        <Footer/>
    </div>
  );
}

export default Home;
