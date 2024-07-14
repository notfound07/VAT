import React, { useState, useContext } from 'react';
import Footer from '../Nav-Foot/Footer';
import Navbar from '../Nav-Foot/Navbar';
import axios from 'axios';
import { RecoveryContext } from '../App';
import './Contact.css';

function Contact() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { email, setEmail } = useContext(RecoveryContext);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/vat/contact", {
        firstName,
        lastName,
        email,
        phoneNumber,
        commentMessage: message
      });
      if (response.status === 201) {
        console.log("Feedback submitted successfully");
        console.log("Response Data", response.data);
      }
    } catch (err) {
      if (err.response) {
        console.log("Error Response Data", err.response.data);
      } else {
        console.log(err);
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="contact-container">
        <h1>Contact Us</h1>
        <div className="form-wrapper">
          <div className="contact-image">
            <div className="image-placeholder">Image or color</div>
          </div>
          <form className="contact-form" onSubmit={submitForm}>
            <div className="form-group-contact">
              <label>Full Name</label>
              <div className="name-fields">
                <input type="text" name='firstName' placeholder="First" onChange={(e) => setFirstName(e.target.value)} />
                <input type="text" name='lastName' placeholder="Last" onChange={(e) => setLastName(e.target.value)} />
              </div>
            </div>
            <div className="form-group-contact">
              <label>Email</label>
              <input type="email" name='email' onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-group-contact">
              <label>Mobile Number</label>
              <input type="tel" name='phoneNumber' onChange={(e) => setPhoneNumber(e.target.value)} />
            </div>
            <div className="form-group-contact">
              <label>Comment Message</label>
              <textarea name='commentMessage' onChange={(e) => setMessage(e.target.value)}></textarea>
            </div>
            <button className="submit-btn" type="submit">Submit</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Contact;
