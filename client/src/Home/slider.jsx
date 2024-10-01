import React, { useState, useEffect, useRef } from "react";
import "./slider.css";
import img1 from '../Assets/front2.jpeg';
import img2 from '../Assets/front1.jpg';

function CustomCarousel({ children }) {
  const [activeIndex, setActiveIndex] = useState(0); // Current active index
  const [slideDone, setSlideDone] = useState(true);  // To handle auto-play
  const [timeID, setTimeID] = useState(null);        // Timer ID for auto-play
  const startPos = useRef(0);   // Track starting position
  const endPos = useRef(0);     // Track ending position
  const isDragging = useRef(false); // Track if dragging is occurring

  // Move to the next slide if not at the last one
  const slideNext = () => {
    setActiveIndex((val) => {
      if (val < children.length - 1) {
        return val + 1;
      }
      return 0; // Loop back to the first slide
    });
  };

  // Move to the previous slide if not at the first one
  const slidePrev = () => {
    setActiveIndex((val) => {
      if (val > 0) {
        return val - 1;
      }
      return children.length - 1; // Loop back to the last slide
    });
  };

  useEffect(() => {
    if (slideDone) {
      setSlideDone(false);
      setTimeID(
        setTimeout(() => {
          setActiveIndex((val) => (val < children.length - 1 ? val + 1 : 0)); // Auto-loop to the first slide after the last one
          setSlideDone(true);
        }, 5000) // Auto-play interval set to 5 seconds
      );
    }

    // Clean up the timeout on component unmount or dependencies change
    return () => {
      if (timeID) {
        clearTimeout(timeID);
      }
    };
  }, [slideDone, children.length]);

  const AutoPlayStop = () => {
    if (timeID) {
      clearTimeout(timeID);
      setSlideDone(false);
    }
  };

  const AutoPlayStart = () => {
    if (!slideDone) {
      setSlideDone(true);
    }
  };

  // Handle the start of drag/swipe
  const handleStart = (e) => {
    startPos.current = e.touches ? e.touches[0].clientX : e.clientX;
    isDragging.current = true; // Mark as dragging
  };

  // Handle the dragging/swiping motion
  const handleMove = (e) => {
    if (!isDragging.current) return; // If not dragging, return
    endPos.current = e.touches ? e.touches[0].clientX : e.clientX;
  };

  // Handle the end of drag/swipe
  const handleEnd = () => {
    if (!isDragging.current) return; // If no drag occurred, return
    const difference = startPos.current - endPos.current;

    // Swipe threshold: Avoid accidental tiny swipes
    const swipeThreshold = 50;

    if (difference > swipeThreshold) {
      // Swiped left (Next)
      slideNext();
    } else if (difference < -swipeThreshold) {
      // Swiped right (Previous)
      slidePrev();
    }
    isDragging.current = false; // Reset dragging state
  };

  // Prevent unwanted dragging on button clicks
  const handleClick = (e, index) => {
    e.preventDefault();
    setActiveIndex(index);
  };

  return (
    <div
      className="container__slider"
      onMouseEnter={AutoPlayStop}
      onMouseLeave={AutoPlayStart}
      onTouchStart={handleStart}
      onTouchMove={handleMove}
      onTouchEnd={handleEnd}
      onMouseDown={handleStart}
      onMouseMove={handleMove}
      onMouseUp={handleEnd}
    >
      {/* Slide Items */}
      {children.map((item, index) => (
        <div
          className={"slider__item slider__item-active-" + (activeIndex + 1)}
          key={index}
        >
          {item}
        </div>
      ))}

      {/* Navigation Dots */}
      <div className="container__slider__links">
        {children.map((item, index) => (
          <button
            key={index}
            className={
              activeIndex === index
                ? "container__slider__links-small container__slider__links-small-active"
                : "container__slider__links-small"
            }
            onClick={(e) => handleClick(e, index)}
          ></button>
        ))}
      </div>

      {/* Next and Previous Buttons */}
      <button
        className="slider__btn-next"
        onClick={(e) => {
          e.preventDefault();
          slideNext(); // Call slideNext but respect boundary conditions
        }}
        disabled={activeIndex === children.length - 1} // Disable button if on the last slide
      >
        <i className="fa-solid fa-greater-than"></i>
      </button>
      <button
        className="slider__btn-prev"
        onClick={(e) => {
          e.preventDefault();
          slidePrev(); // Call slidePrev but respect boundary conditions
        }}
        disabled={activeIndex === 0} // Disable button if on the first slide
      >
        <i className="fa-solid fa-less-than"></i>
      </button>
    </div>
  );
}

export const images = [
  {
    imgURL: img2,
    imgAlt: "img-1",
  },
  {
    imgURL: img1,
    imgAlt: "img-2",
  },
];

export default CustomCarousel;
