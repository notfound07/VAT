import React, { useState, useEffect, useRef } from "react";
import "./slider.css";
import img1 from '../Assets/front2.jpeg';
import img2 from '../Assets/front1.jpg';

function CustomCarousel({ children }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideDone, setSlideDone] = useState(true);
  const [timeID, setTimeID] = useState(null);
  const startX = useRef(0);
  const containerRef = useRef(null);

  const slideNext = () => {
    setActiveIndex((val) => {
      if (val >= children.length - 1) {
        return 0;
      } else {
        return val + 1;
      }
    });
  };

  const slidePrev = () => {
    setActiveIndex((val) => {
      if (val <= 0) {
        return children.length - 1;
      } else {
        return val - 1;
      }
    });
  };

  useEffect(() => {
    if (slideDone) {
      setSlideDone(false);
      setTimeID(
        setTimeout(() => {
          setActiveIndex((val) => (val >= children.length - 1 ? 0 : val + 1));
          setSlideDone(true);
        }, 10000)
      );
    }
  }, [slideDone, children.length]);

  const AutoPlayStop = () => {
    if (timeID > 0) {
      clearTimeout(timeID);
      setSlideDone(false);
    }
  };

  const AutoPlayStart = () => {
    if (!slideDone) {
      setSlideDone(true);
    }
  };

  const onTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
    AutoPlayStop();
  };

  const onTouchMove = (e) => {
    const currentX = e.touches[0].clientX;
    const diffX = startX.current - currentX;

    if (Math.abs(diffX) > 30) {  // Adjust sensitivity here
      if (diffX > 0) {
        slideNext();
      } else {
        slidePrev();
      }
      startX.current = currentX; // Update startX for continuous sliding
    }
  };

  const onTouchEnd = () => {
    AutoPlayStart();
  };

  return (
    <div
      className="container__slider"
      ref={containerRef}
      onMouseEnter={AutoPlayStop}
      onMouseLeave={AutoPlayStart}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="slider__wrapper">
        {children.map((item, index) => (
          <div
            className={`slider__item ${activeIndex === index ? 'slide-active' : ''}`}
            key={index}
          >
            {item}
          </div>
        ))}
      </div>

      <div className="container__slider__links">
        {children.map((item, index) => (
          <button
            key={index}
            className={
              activeIndex === index
                ? "container__slider__links-small container__slider__links-small-active"
                : "container__slider__links-small"
            }
            onClick={(e) => {
              e.preventDefault();
              setActiveIndex(index);
            }}
          ></button>
        ))}
      </div>

      <button
        className="slider__btn-next"
        onClick={(e) => {
          e.preventDefault();
          slideNext();
        }}
      >
        <i className="fa-solid fa-greater-than"></i>
      </button>
      <button
        className="slider__btn-prev"
        onClick={(e) => {
          e.preventDefault();
          slidePrev();
        }}
      >
        <i className="fa-solid fa-less-than"></i>
      </button>
    </div>
  );
}

export const images = [
  {
    imgURL: img2,
    imgAlt: "img-1"
  },
  {
    imgURL: img1,
    imgAlt: "img-2"
  },
];

export default CustomCarousel;
