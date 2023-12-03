import React, { useEffect, useState } from 'react';
import '../slideShow.css'; // Import your CSS file

import img1 from '../images/as-marvels_42247_carrossel.jpg';
import img2 from '../images/jogos-vorazes-a-cantiga-dos-passaros-e-das-serpentes_28791_carrossel-sm.jpg';
import img3 from '../images/napoleao_45809_carrossel-sm.jpg';

const Slideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const preloadImages = () => {
      const imagesToPreload = [img1, img2, img3];
      imagesToPreload.forEach((imageSrc) => {
        const img = new Image();
        img.src = imageSrc;
      });
    };

    //preloadImages();

    const slides = document.getElementsByClassName("mySlides");

    const showSlides = () => {
      if (!slides || slides.length === 0) {
        return;
      }

      for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }

      setCurrentSlide((prevSlide) => (prevSlide + 1 >= slides.length ? 0 : prevSlide + 1));

      slides[currentSlide].style.display = "block";
    };

    const intervalId = setInterval(showSlides, 5000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, [currentSlide]);

  const plusSlides = (n) => {
    const slides = document.getElementsByClassName("mySlides");

    if (!slides || slides.length === 0) {
      return;
    }

    setCurrentSlide((prevSlide) => {
      let newSlide = prevSlide + n;
      if (newSlide < 0) {
        return slides.length - 1;
      } else if (newSlide >= slides.length) {
        return 0;
      } else {
        return newSlide;
      }
    });
  };

  const currentSlideHandler = (n) => {
    setCurrentSlide(n);
  };



  return (
    <div className="slideshow-container">
      {/* Slide 1 */}
      <div className="mySlides fade">
        {/* Your image */}
        <img src={img1} style={{ width: '100%' }} alt="Slide 1" />
        {/* Your caption */}
        <div className="text"></div>
      </div>

      {/* Slide 2 */}
      <div className="mySlides fade">
        {/* Your image */}
        <img src={img2} style={{ width: '100%' }} alt="Slide 2" />
        {/* Your caption */}
        <div className="text"></div>
      </div>

      {/* Slide 3 */}
      <div className="mySlides fade">
        {/* Your image */}
        <img src={img3} style={{ width: '100%' }} alt="Slide 3" />
        {/* Your caption */}
       <div className="text"></div>
      </div>

      <a className="prev" onClick={() => plusSlides(-1)}>
        &#10094;
      </a>
      <a className="next" onClick={() => plusSlides(1)}>
        &#10095;
      </a>

      <div style={{ textAlign: 'center' }}>
        {/* Your dots go here */}
        <span className="dot" onClick={() => currentSlideHandler(0)}></span>
        <span className="dot" onClick={() => currentSlideHandler(1)}></span>
        <span className="dot" onClick={() => currentSlideHandler(2)}></span>
      </div>
    </div>
  );
};

export default Slideshow;