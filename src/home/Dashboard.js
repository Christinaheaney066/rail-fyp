import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, db, logout } from "../home/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import HomeContent from '../components/HomeContent';
import ImageSlider from "../components/ImageSlider";
import styles from './Dashboard.modules.css';
import DashboardContent from './DashboardContent';
import TopTips from "./TopTips";

//homepage

function Dashboard() {
const slides  = [
  { src: "../extras/Image[3].jpeg", title: "barca", width: 3, height: 2 },
  { src: "../extras/Image[7].jpeg", title: "barca2", width: 3, height: 2 },
  { src: "../extras/Image[11].jpeg", title: "bled", width: 3, height: 2 },
  { src: "../extras/Image[19].jpeg", title: "street2", width: 4, height: 3 },
  { src: "../extras/Image[1].jpeg", title: "street", width: 4, height: 3 },
  { src: "../extras/Image[2].jpeg", title: "street4", width: 4, height: 3 },
  { src: "../extras/Image[4].jpeg", title: "street6", width: 3, height: 2 },
  { src: "../extras/Image[5].jpeg", title: "street27", width: 3, height: 2 },
  { src: "../extras/Image[6].jpeg", title: "street7", width: 3, height: 2 },
  { src: "../extras/Image[8].jpeg", title: "street9", width: 4, height: 3 },
  { src: "../extras/Image[9].jpeg", title: "street10", width: 4, height: 3 },
  { src: "../extras/Image[10].jpeg", title: "street11", width: 4, height: 3 },
  { src: "../extras/Image[12].jpeg", title: "street13", width: 4, height: 3 },
  { src: "../extras/Image[13].jpeg", title: "street14", width: 4, height: 3 },
  { src: "../extras/Image[14].jpeg", title: "street15", width: 4, height: 3 },
  { src: "../extras/Image[16].jpeg", title: "street18", width: 4, height: 3 },
  { src: "../extras/Image[17].jpeg", title: "street19", width: 4, height: 3 },
  { src: "../extras/Image[18].jpeg", title: "street21", width: 4, height: 3 },
  { src: "../extras/Image[20].jpeg", title: "street22", width: 4, height: 3 },
  { src: "../extras/Image[21].jpeg", title: "street23", width: 4, height: 3 },
  { src: "../extras/Image[22].jpeg", title: "street25", width: 4, height: 3 },
  { src: "../extras/Image[23].jpeg", title: "street26", width: 4, height:3},
  { src: "../extras/Image[24].jpeg", title: "street26", width: 4, height:3},
  { src: "../extras/Image[25].jpeg", title: "street26", width: 4, height:3},
  ];

 const containerStyles = {
     width: "500px",
     height: "280px",
     margin: "0 auto",
     display: "flex",

 };

 const imageStyles = {
   maxWidth: "100%",
   maxHeight: "100%",
   objectFit: "cover",
   margin: "5px",
 };

  return (
    <>
      <div className="HomeCheck">
        <HomeContent />
      </div>

       <div className="col">
          <div className="row">
            <div className="slider-content">
             <div className="slider-container">
             <ImageSlider slides={slides} />
           </div>
         </div>
        </div>

         <div className="row">
           <div className="card-container">
             <div className="card">
               <DashboardContent />
             </div>
             <div className="card">
               <TopTips />
             </div>
           </div>
         </div>
       </div>
     </>
  );
}
export default Dashboard