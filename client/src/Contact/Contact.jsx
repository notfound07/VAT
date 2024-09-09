import React, { useState, useContext, useEffect } from 'react';
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
  const [isSubmitted, setIsSubmitted] = useState(false); // Success popup visibility
  const [loginRequired, setLoginRequired] = useState(false); // Login popup visibility

  const baseURL =
    window.location.hostname === "localhost"
      ? "http://localhost:3001/vat"
      : `${window.location.protocol}//visionaryarttech.com/vat`;

  const validateForm = () => {
    if (!firstName) {
      window.alert("First name is required.");
      return false;
    }
    if (!lastName) {
      window.alert("Last name is required.");
      return false;
    }
    if (!phoneNumber) {
      window.alert("Phone number is required.");
      return false;
    }
    if (!message) {
      window.alert("Message is required.");
      return false;
    }
    return true;
  };

  const submitForm = async (e) => {
    e.preventDefault();

    // Check if user is logged in by checking if email exists
    if (!email) {
      setLoginRequired(true); // Show login required popup
      return;
    }

    // Validate form fields
    if (!validateForm()) return; // If validation fails, don't submit the form

    const payload = {
      firstName,
      lastName,
      email,
      phoneNumber,
      commentMessage: message,
    };

    try {
      const response = await axios.post(`${baseURL}/contact`, payload);
      if (response.status === 201) {
        setIsSubmitted(true); // Show success popup
        document.body.style.overflow = 'hidden'; // Disable scroll
        // Clear all fields except email
        setFirstName("");
        setLastName("");
        setPhoneNumber("");
        setMessage("");
        console.log("Response Data", response.data);
      }
    } catch (err) {
      if (err.response) {
        window.alert("Failed to submit feedback. Please try again.");
        console.log("Error Response Data", err.response.data);
      } else {
        window.alert("An error occurred. Please try again.");
        console.log(err);
      }
    }
  };

  useEffect(() => {
    // Retrieve the email from localStorage
    const storedEmail = localStorage.getItem("LoggedUser");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, [setEmail]);

  const closePopup = () => {
    setIsSubmitted(false); // Close the success popup
    setLoginRequired(false); // Close the login required popup
    document.body.style.overflow = 'auto'; // Enable scroll
  };

  return (
    <div>
      <Navbar />
      <div className="contact-container">
        <h1>Contact Us</h1>
        <div className="form-wrapper">
          <div className="contact-image"></div>
          <form className="contact-form" onSubmit={submitForm}>
            <div className="form-group-contact">
              <label className="contact_label">Full Name</label>
              <div className="name-fields">
                <input
                  type="text"
                  name="firstName"
                  value={firstName} // Bind value to state
                  placeholder="First"
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  type="text"
                  name="lastName"
                  value={lastName} // Bind value to state
                  placeholder="Last"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            <div className="form-group-contact">
              <label className="contact_label">Email</label>
              <input value={email} disabled />
            </div>
            <div className="form-group-contact">
              <label className="contact_label">Mobile Number</label>
              <input
                name="phoneNumber"
                value={phoneNumber} // Bind value to state
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="form-group-contact">
              <label className="contact_label">Comment Message</label>
              <textarea
                name="commentMessage"
                value={message} // Bind value to state
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>
            <button className="submit-btn" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>

      {/* Success Popup */}
      {isSubmitted && (
        <div className="popup">
          <div className="popup-content">
            <h2>Success</h2>
            <p>Your message has been submitted!</p>
            <button className="popup-close-btn" onClick={closePopup}>
              OK
            </button>
          </div>
        </div>
      )}

      {/* Login Required Popup */}
      {loginRequired && (
        <div className="popup">
          <div className="popup-content">
            <h2>Login Required</h2>
            <p>You need to be logged in to submit feedback.</p>
            <button className="popup-close-btn" onClick={closePopup}>
              OK
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Contact;
