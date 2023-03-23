import React from 'react';
import { useState } from "react";
import styles from './Imageslider.css';

const ImageSlider = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1 ;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

const slideStylesWidthBackground = {
  backgroundImage: `url(${slides[currentIndex].src})`,
  backgroundPosition: 'left center',
  backgroundSize: '50% auto',
  title: `${slides[currentIndex].title}`
};
const slideStyles = {
  width: "600px",
  height: "600px",
  borderRadius: "10px",
  backgroundSize: "cover",
  backgroundPosition: "center",
};
  return (
    <div className={styles.slider}>
      <div>
        <div onClick={goToPrevious} className={styles.leftArrow}>
          ❰
        </div>
        <div onClick={goToNext} className={styles.rightArrow}>
          ❱
        </div>
      </div>
    <div style={{ ...slideStyles, ...slideStylesWidthBackground }}>
      <div className = "image-mover"  style={{padding: "0 20%"}}>
        <img src={require('../extras/Image['+currentIndex+'].jpeg')} title={slideStylesWidthBackground.title} style={{ width: "800px", height: "800px",  float: "left"  }}/>
      </div>
      </div>
      <div className={styles.dotsContainer}>
       {slides.map((slide, slideIndex) => (
       <div
                   className={styles.dot}
                   key={slideIndex}
                   onClick={() => goToSlide(slideIndex)}
                 >
                   ●
                 </div>
               ))}
             </div>
           </div>
         );
       };

export default ImageSlider;
