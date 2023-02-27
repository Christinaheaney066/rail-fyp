import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {Link, useNavigate } from "react-router-dom";
//import "../home/Dashboard.css";
import { auth, db, logout } from "../home/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import Footer from '../components/Footer';
import HomeContent from '../components/HomeContent'
import Content_pic from '../components/Content_pic'




//homepage

function Dashboard() {


  return (
  <>
      <div className="HomeCheck">
    <div className="HomeContent__container">
      <HomeContent />
     </div>
     </div>
           <div className="ContentCheck">
         <div className="ContentPic__container">
           <Content_pic />
          </div>
          </div>


    <div className="FooterCheck">
     <div className="FooterDash__container">
       <Footer />
      </div>
      </div>


</>
        );



}




export default Dashboard;