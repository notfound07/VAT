import Footer from '../Nav-Foot/Footer';
import Navbar from '../Nav-Foot/Navbar';
import './Contact.css';

function Contact() {
  return (
    <div>
      <Navbar />
      <div className="contact-container">
        <h1>Contact Us</h1>
        <div className="form-wrapper">
          <div className="contact-image">
            <div className="image-placeholder">Image or color</div>
          </div>
          <form className="contact-form">
            <div className="form-group">
              <label>Full Name</label>
              <div className="name-fields">
                <input type="text" placeholder="First" />
                <input type="text" placeholder="Last" />
              </div>
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" />
            </div>
            <div className="form-group">
              <label>Mobile Number</label>
              <input type="tel" />
            </div>
            <div className="form-group">
              <label>Comment Message</label>
              <textarea></textarea>
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
