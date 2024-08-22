import React, { Component } from 'react';
import Navbar from '../Nav-Foot/Navbar';
import Footer from '../Nav-Foot/Footer';
import './Design.css';
import design from '../Assets/Cnc0.jpg';
import design1 from '../Assets/Cnc1.jpg';
import design2 from '../Assets/Cnc2.jpg';
import design3 from '../Assets/Cnc3.jpg';
import design4 from '../Assets/Cnc4.jpg';
import design5 from '../Assets/Cnc5.jpg';

class Design extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zoomedImageId: null,
      zoomPosition: { x: 0, y: 0 },
    };
  }

  handleDoubleClick = (event, id) => {
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left; // X-coordinate relative to the image
    const y = event.clientY - rect.top; // Y-coordinate relative to the image

    this.setState((prevState) => ({
      zoomedImageId: prevState.zoomedImageId === id ? null : id,
      zoomPosition: { x, y }
    }));
  };

  render() {
    const { zoomedImageId, zoomPosition } = this.state;

    return (
      <div>
        <Navbar />
        <div className="design-page">
          <div className='overlay-design'>
            <h1>Cnc Pannel, Frame & Design Drawing</h1>
            {[
              { src: design5, id: 'design5' },
              { src: design, id: 'design' },
              { src: design1, id: 'design1' },
              { src: design2, id: 'design2' },
              { src: design3, id: 'design3' },
              { src: design4, id: 'design4' },
            ].map((image) => (
              <div
                key={image.id}
                className="design-container"
                onDoubleClick={(event) => this.handleDoubleClick(event, image.id)}
              >
                <img
                  src={image.src}
                  alt="design"
                  className={zoomedImageId === image.id ? 'zoomed' : ''}
                  style={{
                    transformOrigin: `${zoomPosition.x}px ${zoomPosition.y}px`,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Design;
