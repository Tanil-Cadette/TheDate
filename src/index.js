import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Dashboard } from './Pages/Dashboard';
import { Friends } from './Pages/Friends';
import { Profile } from './Pages/Profile';
import { Register } from './Pages/Register';
import { Login } from './Pages/Login';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/friends" element={<Friends />} />
        <Route path="/profile" element={<Profile />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
