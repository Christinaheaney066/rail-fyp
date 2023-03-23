import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {Link, useNavigate } from "react-router-dom";
//import "../home/Dashboard.css";
import { auth, db, logout } from "../home/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import styles from './Dashboard.modules.css';


function DashboardContent() {
  const cities = [
    { name: "Paris",  description: "The City of Love is known for its iconic Eiffel Tower and vibrant art scene." },
    { name: "Rome",  description: "The Eternal City boasts ancient ruins, historic landmarks, and world-class cuisine." },
    { name: "Berlin",  description: "The German capital is rich in history and offers a thriving modern art scene." },
    { name: "Barcelona", description: "Famous for its unique architecture, this vibrant city offers beautiful beaches and lively nightlife." },
  ];

  return (
    <div className="top-cities">
      <h2>Top Cities for Interrail Europe</h2>
      <div className="city-cards">
        {cities.map((city, index) => (
          <div className="city-card" key={index}>
            <h3>{city.name}</h3>
            <p>{city.description}</p>
                  </div>
                ))}
              </div>
            </div>
            );
            }
            export default DashboardContent;