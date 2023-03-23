import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {Link, useNavigate } from "react-router-dom";
//import "../home/Dashboard.css";
import { auth, db, logout } from "../home/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import styles from './Dashboard.modules.css';

function TopTips() {
  const tips = [
   { title: "Plan Your Itinerary", description: "Outline your travel plans and prioritize the cities and attractions you want to visit." },
     { title: "Book Accommodations Early", description: "Secure your accommodations well in advance to ensure availability and better deals." },
        { title: "Pack Light", description: "Travel with only the essentials to make it easier to move between destinations." },
            { title: "Utilize Public Transportation", description: "Take advantage of Europe's excellent public transportation to save money and time." },
              ];

  return (
    <div className="travel-tips">
      <h2>Travel Tips for Interrail Europe</h2>
      <div className="tip-cards">
        {tips.map((tip, index) => (
          <div className="tip-card" key={index}>
            <h3>{tip.title}</h3>
            <p>{tip.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default TopTips;