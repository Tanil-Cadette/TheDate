import React, { useState } from 'react';
import './App.css';
import { Homepage } from './Homepage';
import { Login } from './Login';
import { Register } from './Register';
import { Friends } from './Friends';
import { Profile } from './Profile';
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";

function App() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }


  return (
    <Router>
      <header>
        <h1 className='header'>The Date.</h1>
      </header>
      <body>
          <Routes>
              <Route path="/" element={currentForm === "login" ? <Login onFormSwitch={toggleForm}/> : <Register onFormSwitch={toggleForm}/>} />
              <Route path="/home" element={<Homepage name="Tanil" />} />
              <Route path="/friends" element={<Friends name="Tanil" />} />
              <Route path="/profile" element={<Profile name="Tanil"/>} /> 
          </Routes>
      </body>      
    </Router>
    );
}

export default App;
