//import React from 'react';
//import { Route, Navigate } from 'react-router-dom';
//import { useAuth } from './AuthContext';
//
//const PrivateRoute = ({ element: Component, ...rest }) => {
//  const { currentUser } = useAuth();
//
//  return (
//    <Route
//      {...rest}
//      element={currentUser ? <Component /> : <Navigate to="/" />}
//    />
//  );
//};
//
//export default PrivateRoute;;