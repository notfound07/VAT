import React, { useState } from "react";
import Slider from "react-slick";
import { Card } from "react-bootstrap";
import first from '../Assets/slide1.mp4';
import second from '../Assets/slide2.mp4';
import third from '../Assets/slide3.mp4';
import fourth from '../Assets/slide4.mp4';
import fifth from '../Assets/slide5.mp4';
import sixth from '../Assets/slide6.mp4';
import seventh from '../Assets/slide7.mp4';
import eighth from '../Assets/slide8.mp4';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./workslider.css";

const ProductCard = ({ src, isVideo }) => (
    <Card className="product-card">
        {isVideo ? (
            <video className="product-media" autoPlay loop muted>
                <source src={src} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        ) : (
            <Card.Img variant="top" src={src} className="product-media" />
        )}
    </Card>
);


const WorkSlider = () => {
    const [slides] = useState([
        { src: eighth, isVideo: true },
        { src: second, isVideo: true },
        { src: third, isVideo: true },
        { src: fourth, isVideo: true },
        { src: fifth, isVideo: true },
        { src: sixth, isVideo: true },
        { src: seventh, isVideo: true },
        { src: first, isVideo: true },
    ]);

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div>
            <div className="work-heading">
                <p>Our Work</p>
            </div>
            <Slider {...settings}>
                {slides.map((slide, index) => (
                    <div key={index} className="slide-item">
                        <ProductCard src={slide.src} isVideo={slide.isVideo} />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default WorkSlider;
