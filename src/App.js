import React from 'react';
import './App.css';
import logoImg from './Logofyp.png';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert } from 'react';
import Container from 'react-bootstrap/Container';
import Login from './Login';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Dashboard from "./Dashboard";
import Register from "./Register";
import FilesFolder from "./FilesFolder";
import NearYou from "./NearYou";
import Map from './components/Map';
import Navbar from './components/NavBar';
import RoutesFinder from "./RoutesFinder";
import TestRouteFinder from "./TestRouteFinder";


function App() {
<div>
   const App = () => (
     <div className="App">


     </div>
   </div>

  return (
<>
    <div className="App">
    <img src={logoImg} alt="Logo"/>

   <Router>
    <Navbar />
           <Routes>
             <Route exact path="/" element={<Login />} />
             <Route exact path="/Register" element={<Register />} />
             <Route exact path="/Dashboard" element={<Dashboard />} />
             <Route exact path="/FilesFolder" element={<FilesFolder />} />
             <Route exact path="/NearYou" element={<NearYou />} />
             <Route exact path="/TestRouteFinder" element={<TestRouteFinder />} />

           </Routes>
         </Router>
   </div>


</>
  );

}

export default App;
