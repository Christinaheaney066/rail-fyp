import React from 'react';
import '../home/App.css';
import { Button } from './Button';
import './HomeContent.css';

import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {Link, useNavigate } from "react-router-dom";
//import "../home/Dashboard.css";
import { auth, db, logout } from "../home/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

function HomeContent() {
  const [user] = useAuthState(auth);
  const [name, setName] = useState('');
  useEffect(() => {
      const fetchUserName = async () => {
        try {
          const q = query(collection(db, 'users'), where('uid', '==', user?.uid));
          const doc = await getDocs(q);
          const data = doc.docs[0].data();
          setName(data.name);
        } catch (err) {
          console.error(err);
          alert('An error occurred while fetching user data');
        }
      };
       if (user) {
            fetchUserName();
          }
        }, [user]);

  return (
    <div className='home-container'>
      <h1>INTERRAIL AWAITS</h1>
      {name ? <h2>Welcome back, {name}!</h2> : null}
      <p>Now get Started</p>
    </div>
  );
}

export default HomeContent;