import React from 'react';
import { Button } from './Button';
import './Content_pic.css';
import barca from '../extras/IRImage1.jpeg';
import barca2 from '../extras/IRImage2.jpeg';
import bled from '../extras/IRImage3.jpeg';
import street from '../extras/IRimg5.jpeg';
import street2 from '../extras/IRimg6.jpeg';



function ContentPic() {
  return (
    <div className='content-container'>
    <h1>Can you see yourself here??</h1>
    <img src={barca} alt="barca"/>
    <img src={barca2} alt="barca2"/>
    <img src={bled} alt="bled"/>
    <img src={street} alt="street"/>
    <img src={street2} alt="street2"/>


    </div>
  );
}

export default ContentPic;

     // <video src='/videos/video-1.mp4' autoPlay loop muted />
