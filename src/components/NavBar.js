import React from 'react';
import {Nav,
          NavLink,
          Bars,
          NavMenu,
          NavBtn,
          NavBtnLink} from './NavBarLooks';


    const NavBar = () =>{
    return(
    <>
        <Nav>
            <Bars />
            <NavMenu>
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
export default NavBar