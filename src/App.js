import React, { useState } from 'react';
import './App.css';
import { Dashboard } from './Dashboard';
import { Login } from './Login';
import { Register } from './Register';
import { Home } from './Home';
import { Friends } from './Friends';
import { Profile } from './Profile';
import { PasswordReset } from './PasswordReset';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Userfront from "@userfront/react";
Userfront.init("demo1234");

// const SignupForm = Userfront.build({
// toolId: "nkmbbm",
// });

// const LoginForm = Userfront.build({
//     toolId: "alnkkd",
// });

// const PasswordResetForm = Userfront.build({
//     toolId: "dkbmmo",
// });

// function Home() {
//   return (
//     <div>
//       <h2>Home</h2>
//       <SignupForm />
//     </div>
//   );
// }

// function Login() {
//   return (
//     <div>
//       <h2>Login</h2>
//       <LoginForm />
//     </div>
//   );
// }

// function PasswordReset() {
//   return (
//     <div>
//       <h2>Password Reset</h2>
//       <PasswordResetForm />
//     </div>
//   );
// }

// function Dashboard() {
//   const userData = JSON.stringify(Userfront.user, null, 2);
//   return (
//     <div>
//       <h2>Dashboard</h2>
//       <pre>{userData}</pre>
//       <button onClick={Userfront.logout}>Logout</button>
//     </div>
//   );
// }

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
