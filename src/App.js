import React, { useState } from 'react';
import './App.css';
import { Dashboard } from './Pages/Dashboard';
import { Login } from './Pages/Login';
import { Register } from './Pages/Register';
import { Home } from './Pages/Home';
import { Friends } from './Pages/Friends';
import { Profile } from './Pages/Profile';
import { PasswordReset } from './Pages/PasswordReset';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Userfront from "@userfront/react";
Userfront.init("demo1234");


function RequireAuth({ children }) {
  let location = useLocation();
  if (!Userfront.tokens.accessToken) {
    // Redirect to the /login page
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}

function App() {
  // const [currentForm, setCurrentForm] = useState('login');

  // const toggleForm = (formName) => {
  //   setCurrentForm(formName);
  // }


  return (
    <Router>
      <header>
        <h1 className='header'>The Date.</h1>
      </header>
      <div>
          <Routes>
              {/* <Route path="/login" element={currentForm === "login" ? <Login onFormSwitch={toggleForm}/> : <Register onFormSwitch={toggleForm}/>} /> */}
              {/* <Route path="/" element={<Homepage name="Tanil" />} /> */}
              {/* <Route path="/" element={<Homepage/>}/> */}
              <Route path="/friends" element={<RequireAuth><Friends name="Tanil" /></RequireAuth>} />
              <Route path="/profile" element={<RequireAuth><Profile name="Tanil"/></RequireAuth>} /> 
              <Route path="/" element={<Home/>} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/reset" element={<PasswordReset />} />
              <Route path="/dashboard" element={<RequireAuth><Dashboard name= "Tanil"/></RequireAuth>} />
              {/* <Route path="*" element={currentForm === "login" ? <Login onFormSwitch={toggleForm}/> : <Register onFormSwitch={toggleForm}/>} /> */}
          </Routes>
      </div>      
    </Router>
    );
}

export default App;
