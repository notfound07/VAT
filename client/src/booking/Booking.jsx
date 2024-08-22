import React from 'react'
import Navbar from '../nav-foot/Navbar';
import Footer from '../nav-foot/Footer';
import './Booking.css';
import Sagar from '../assets/Sagar.webp';
import Sandoz from '../assets/Sandoz.webp';
import Aslam from '../assets/Aslam.webp';
import Bukhara from '../assets/Bukhara.webp';
import Gulati from '../assets/Gulati.webp';
import Karims from '../assets/Karims.webp';
import Rajinder from '../assets/Rajinder.webp';
import Varq from '../assets/Varq.webp';
import {Link} from 'react-router-dom';

function Booking() {
  return (
    <div>
      <Navbar />
      <p className='heading'>Restaurants Booking</p>
      <div className='fix'>
      <div class="hotel-container">
        <div class="main-container">
          <div class="poster-container">
            <div><img src={Sagar} alt="" class="poster" /></div>
          </div>
          <div class="booking-container">
            <div class="booking__content">
              <h4 class="booking__hotel-name">Sagar Ratna</h4>
              <p class="booking__hotel-details">
                Most preferred destination for South Indian cuisines across the country
              </p>
              <Link to="/SagarRatna/1/DefenceColony"><button class="booking__buy-btn">Book now</button></Link>
            </div>
          </div>
        </div>
        <div class="main-container">
          <div class="poster-container">
            <div><img src={Sandoz} alt="" class="poster" /></div>
          </div>
          <div class="booking-container">
            <div class="booking__content">
              <h4 class="booking__hotel-name">Sandoz</h4>
              <p class="booking__hotel-details">
                Sandoz Cafe, is a culinary haven offering a delightful fusion of Indian and Mughlai cuisines
              </p>
              <Link to="/Sandoz/2/ConnaughtPlace"><button class="booking__buy-btn">Book now</button></Link>
            </div>
          </div>
        </div>
        <div class="main-container">
          <div class="poster-container">
            <div><img src={Aslam} alt="" class="poster" /></div>
          </div>
          <div class="booking-container">
            <div class="booking__content">
              <h4 class="booking__hotel-name">Aslam Chicken</h4>
              <p class="booking__hotel-details">
                This place is a hidden gem that makes the best Mughlai and Biryani dishes. The dishes are really spicy and full of butter.
              </p>
              <Link to="/AslamChicken/6/ChandniChowk"><button class="booking__buy-btn">Book now</button></Link>
            </div>
          </div>
        </div>
        <div class="main-container">
          <div class="poster-container">
            <div><img src={Varq} alt="" class="poster" /></div>
          </div>
          <div class="booking-container">
            <div class="booking__content">
              <h4 class="booking__hotel-name">Varq</h4>
              <p class="booking__hotel-details">
                Varq is one the most cherished outlets for Indian fine dining in the capital.
              </p>
              <Link to="/Varq/7/TajMahal"><button class="booking__buy-btn">Book now</button></Link>
            </div>
          </div>
        </div>
      </div>
      <br></br>
      <div class="hotel-container">
        <div class="main-container">
          <div class="poster-container">
            <div><img src={Karims} alt="" class="poster" /></div>
          </div>
          <div class="booking-container">
            <div class="booking__content">
              <h4 class="booking__hotel-name">Karim's</h4>
              <p class="booking__hotel-details">
                Busting Mughlai joint popular during Ramadan, with wide-ranging non-veg options & no-frills seating.
              </p>
              <Link to="/Karim/5/GreenPark"><button class="booking__buy-btn">Book now</button></Link>
            </div>
          </div>
        </div>
        <div class="main-container">
          <div class="poster-container">
            <div><img src={Gulati} alt="" class="poster" /></div>
          </div>
          <div class="booking-container">
            <div class="booking__content">
              <h4 class="booking__hotel-name">Gulati</h4>
              <p class="booking__hotel-details">
              Gulati has been serving 'Buffet Lunch' since early 2000.Buffet changes every day and offers a new experience to the taste buds on a daily basis 
              </p>
              <Link to="/Gulati/8/Pandara"><button class="booking__buy-btn">Book now</button></Link>
            </div>
          </div>
        </div>
        <div class="main-container">
          <div class="poster-container">
            <div><img src={Bukhara} alt="" class="poster" /></div>
          </div>
          <div class="booking-container">
            <div class="booking__content">
              <h4 class="booking__hotel-name">Bukhara</h4>
              <p class="booking__hotel-details">
                Legendary place with a history of serving selected food of the north west Frontier province
              </p>
              <Link to="/Bukhara/3/ITCMaurya"><button class="booking__buy-btn">Book now</button></Link>
            </div>
          </div>
        </div>
        <div class="main-container">
          <div class="poster-container">
            <div><img src={Rajinder} alt="" class="poster" /></div>
          </div>
          <div class="booking-container">
            <div class="booking__content">
              <h4 class="booking__hotel-name">Rajinder Da Dhaba</h4>
              <p class="booking__hotel-details">
                Traditional dhaba cuisine gets a makeover at this modern dining venue with funky wall art.
              </p>
              <Link to="/RajinderDaDhaba/4/Safdarjung"><button class="booking__buy-btn">Book now</button></Link>
            </div>
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
}

export default Booking;