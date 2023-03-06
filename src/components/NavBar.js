import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import './nav.css';
import logoImg from '../extras/Logofyp.png';
import { useAuthState } from "react-firebase-hooks/auth";
import {Link, useNavigate } from "react-router-dom";
//import "../home/Dashboard.css";
import { auth, db, logout } from "../home/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";



function Navbar() {

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






  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/NearYou'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Near You
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/FilesFolder'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                My Folder
              </Link>
            </li>
            <li className='nav-item'>
             <Link
              to='/TestRouteFinder'
               className='nav-links'
               onClick={closeMobileMenu}
               >
               Find Your Route
               </Link>
                </li>
                <li>
                <div className='nav-links-mobile'
                onClick={closeMobileMenu}
              >
                LOGOUT
              </div>
            </li>
          </ul>
           <button className="LoginCheck__btn" onClick={logout}> LOGOUT </button>

        </div>
      </nav>
    </>
  );
}

export default Navbar;





/*import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
//import {Nav,NavLink,Bars,NavMenu,NavBtn,NavBtnLink} from './NavBarLooks';
import "./nav.css";



function NavBar(){
    	const navRef = useRef();

    	const showNavbar = () => {
        		navRef.current.classList.toggle(
        			"responsive_nav"
        		);
        	};

        return(
       <header>
       			<nav ref={navRef}>
       				<a href="/Dashboard">Home</a>
       				<a href="/FilesFolder">My Folder</a>
       				<a href="/NearYou">Near You</a>
       				<a href="/TestRouteFinder">Find Your Route</a>
       			</nav>
       			<button
       				className="nav-btn"
       				onClick={showNavbar}>
       				<FaBars />
       			</button>
       		</header>
       	);


}
*/

     /*   <header>
            <nav ref={navRef}>
                          <a href='/Dashboard' activeStyle>Home</a>
                          <a href='/FilesFolder' activeStyle> File Folder</a>
                          <a href='/NearYou' activeStyle>Near You</a>
                          <a href='/TestRouteFinder' activeStyle>Find Your Route</a>
                         <button>
                         <NavBtnLink to ='/Login'> Login </NavBtnLink>
                         </button>
                         <button>
                         className="nav-btn nav-close-btn"
                         onClick={showNavbar}>
                         <FaTimes />
                         </button>
                        <button
                        className="nav-btn"
                        onClick={showNavbar}>
                        <FaBars />
                       </button>

       </header>
      */

/*
    const NavBar = () =>{
    return(
    <>
        <Nav>
            <Bars />
            <NavMenu>
            <Nav defaultActiveKey="/Dashboard">
                <NavLink to='/Dashboard' activeStyle>
                            Home
                          </NavLink>
                          <NavLink to='/FilesFolder' activeStyle>
                            File Folder
                          </NavLink>
                          <NavLink to='/NearYou' activeStyle>
                            Near You
                          </NavLink>
                          <NavLink to='/TestRouteFinder' activeStyle>
                            Find Your Route
                          </NavLink>
                         </NavMenu>
                         <NavBtn>
                         <NavBtnLink to ='/Login'> Login </NavBtnLink>
                         </NavBtn>

                        </Nav>
                        </>



    );
    }
    */
//export default NavBar