import React from 'react';
import '../home/App.css';
import logoImg from '../extras/Logofyp.png';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert } from 'react';
import Container from 'react-bootstrap/Container';
import Login from '../loginAndRegister/Login';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Dashboard from "../home/Dashboard";
import Register from "../loginAndRegister/Register";
import FilesFolder from "../filesFolder/FilesFolder";
import NearYou from "../nearYou/NearYou";
import Map from '../components/Map';
import Navbar from '../components/NavBar';
import RoutesFinder from "../route/RoutesFinder";
import TestRouteFinder from "../route/TestRouteFinder";
import Uploadfile from '../filesFolder/Uploadfile';
import Reset from '../loginAndRegister/Reset';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import { AuthContext } from '../components/AuthContext';
import PrivateRoute from '../components/PrivateRoute';



function App() {
   return (
     <div className="App">
       <img src={logoImg} alt="Logo"/>
       <Router>
           <Navbar />
           <Routes>
                      <Route exact path="/" element={<Login />} />
                      <Route exact path="/Register" element={<Register />} />
                      <Route exact path="/Reset" element={<Reset />} />
                      <Route exact path="/Dashboard" element={<Dashboard />} />
                      <Route exact path="/FilesFolder" element={<FilesFolder />} />
                      <Route exact path="/NearYou"  element={<NearYou />}/>
                      <Route exact path="/TestRouteFinder" element={<TestRouteFinder />} />
                    </Routes>
       </Router>
     </div>
   );
 }
export default App;
