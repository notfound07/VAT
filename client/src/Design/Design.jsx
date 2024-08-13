import React, { Component } from 'react';
import Navbar from '../Nav-Foot/Navbar';
import Footer from '../Nav-Foot/Footer';
import './Design.css';
import design from '../Assets/Design.jpg';

class Design extends Component {
  state = {
    backgroundImage: `url(${design})`,
    backgroundPosition: '0% 0%',
    backgroundSize: '100%',
  };

  handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    this.setState({
      backgroundPosition: `${x}% ${y}%`,
      backgroundSize: '200%', // Adjust zoom level
    });
  };
  

  handleMouseLeave = () => {
    this.setState({
      backgroundPosition: '0% 0%',
      backgroundSize: '100%', // Reset zoom level
    });
  };

  render() {
    return (
      <div>
        <Navbar />
        <div className='design-page'>
          <div
            className='design-container'
            onMouseMove={this.handleMouseMove}
            onMouseLeave={this.handleMouseLeave}
            style={{
              backgroundImage: this.state.backgroundImage,
              backgroundPosition: this.state.backgroundPosition,
              backgroundSize: this.state.backgroundSize,
            }}
          >
            <img src={design} alt="design" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Design;
