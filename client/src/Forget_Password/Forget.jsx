import './Forget.css';
import React from 'react';
import logo from '../Assets/logo.png'; // Import the image

function Forget() {
  return (
    <div class="forget-container">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"></link>
      <div className="fr-container">
        <div className="middel">
          <img className="forget-company-logo" src={logo} alt="" />
          <h2>Recover Account</h2>
          <div className="forget-form-group ">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email"/>
          </div>
          <button className="rec-btn" type="submit" onClick={() => window.location.href = '/Recover'}>Recover <i class="fa-solid fa-right-long"></i></button>
        </div>
      </div>
    </div>
  );
}

export default Forget;
