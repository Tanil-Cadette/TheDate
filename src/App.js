import React, { useState } from 'react';
import './App.css';
import { Dashboard } from './Pages/Dashboard';
import { Login }  from './Pages/Login';
import  { Register }  from './Pages/Register';
import { Friends } from './Pages/Friends';
import { Profile } from './Pages/Profile';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";


function App() {

  return (
    // <Router>
    <>
      {/* <header>
        <h1 className='header'>The Date.</h1>
      </header> */}
      {/* <div> */}
        {/* {currentForm === "login" ? <Login onFormSwitch={toggleForm}/> : <Register onFormSwitch={toggleForm}/>} */}
              {/* <Route path="/dashboard" element={<Dashboard/>}/> */}
              {/* <Route path="/friends" element={<Friends />} />
              <Route path="/profile" element={<Profile />} /> 
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} /> */}
      {/* </div>       */}
    {/* </Router> */}
    </>
    );
}

export default App;
