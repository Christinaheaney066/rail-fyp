import { useAuthState } from "react-firebase-hooks/auth";
import {Link, useNavigate } from "react-router-dom";
//import "../home/Dashboard.css";
import { auth, db, logout } from "../home/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import "./RouteContent.css";
import HeroRoute from '../extras/cityScape.jpeg';

function RouteContent() {
  return (
    <div className='route-container'>
      <img src={HeroRoute} alt="Route Hero" className='routeHero-image' />
      <div className='routeHero-text'>
        <h1>Find Your Route</h1>
      </div>
    </div>
  );
}

export default RouteContent;