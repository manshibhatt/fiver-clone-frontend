import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "./Slide.scss";

const Slide = ({ children, slidesToShow = 3, arrowsScroll = 1 }) => {
  const settings = {
    slidesToShow,
    slidesToScroll: arrowsScroll,
    infinite: true,
    dots: true,
    arrows: true,
    autoplay: false,
    speed: 500,
  };

  return (
    <div className="slide" style={{"margin-left": "10px"}}>
      <div className="container">
        <Slider {...settings}>
          {children}
        </Slider>
      </div>
    </div>
  );
};

export default Slide;
