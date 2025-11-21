// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/loginSignup/login';
import Home from './components/home';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // it will not logged out everytime when you refresh the page
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  

  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Routes>
       
        <Route
          path="/login"
          element={
            isLoggedIn ? <Navigate to="/home" /> : <Login onLoginSuccess={handleLoginSuccess} />
          }
        />
        <Route
          path="/home"
          element={
            isLoggedIn ? <Home onLogout={handleLogout}/> : <Navigate to="/login" />
          }
        />

        <Route path="*" element= {<Login onLoginSuccess={handleLoginSuccess} /> }/>
      </Routes>
    </Router>
  );
};

export default App;



