import './Footer.css';
import { Button } from './Button';
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {Link, useNavigate } from "react-router-dom";
//import "../home/Dashboard.css";
import { auth, db, logout } from "../home/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

function Footer() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading]);




  return (
    <div className='footer-container'>
      <section className='footer-subscription'>
        <p className='footer-subscription-heading'>
        Lets go Travelling Today! We hope your stay was Great
        </p>
      </section>
      <div class='footer-links'>
        <div className='footer-link-wrapper'>
          <div class='footer-link-items'>
            <h2>About Us</h2>
            <Link to='/sign-up'>How it works</Link>
            <Link to='/'>Terms of Service</Link>
          </div>
          <div class='footer-link-items'>
            <h2>Contact Us</h2>
            <Link to='/'>Contact</Link>
            <Link to='/'>Support</Link>
          </div>
              <div className="LoginCheck">
                 <div className="LoginCheck__container">
                  Logged in as
                   <div>{name}</div>
                   <div>{user?.email}</div>
                   <button className="LoginCheck__btn" onClick={logout}>
                    Logout
                   </button>
                 </div>

               </div>
        </div>
        </div>
      </div>
  );
}

export default Footer;