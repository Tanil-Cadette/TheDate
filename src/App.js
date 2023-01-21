import React, { useState } from 'react';
import './App.css';
import { Login } from './Login';
import { Register } from './Register';

function App() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }



  return (
    <>
      <h1 className='header'>The Date.</h1>
        <div className='App'>
          {
            currentForm === "login" ? <Login onFormSwitch={toggleForm}/> : <Register onFormSwitch={toggleForm}/>
          }
        </div>
    </>
    );
}

export default App;
