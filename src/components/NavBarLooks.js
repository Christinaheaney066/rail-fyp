import { FaBars } from 'react-icons/fa';
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';
import './NavBar';

export const NavBar = styled.div`
{text-align: center;}
`;

export const NavLink = styled(Link)`{
 float: centre;
 align-items: center;
  display: flex;
  border-radius: 4px;
  &.active
  { background-color: #DCDCDC;
  }

}
`;

export const NavBtnLink = styled(Link)`
  border-radius: 4px;
  background: #808080;
  padding: 10px 22px;
  color: #000000;
  outline: none;
  border: none;
  cursor: pointer;
  `;


export const NavMenu  = styled.div`{
 display: flex;
   align-items: center;
   margin-right: -24px;

}`;

export const Nav  = styled.nav`{

    background: #D3D3D3;
    height: 85px;
    display: flex;
    justify-content: space-between;
    padding: 0.2rem calc((100vw - 1000px) / 2);
    z-index: 12;

  }`;

 export const Bars  = styled(FaBars)`{
    display: none;
       color: #808080;
       @media screen and (max-width: 768px) {
         display: block;
         position: absolute;
         top: 0;
         right: 0;
         transform: translate(-100%, 75%);
         font-size: 15 rem;
         cursor: pointer;

 }`;

 export const NavBtn  = styled.nav`{
 display: flex;
   align-items: center;
   margin-right: 24px;
   max-width: 768px;
 }
 `;