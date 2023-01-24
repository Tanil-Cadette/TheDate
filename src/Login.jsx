import React, { useState, useEffect, useRef, useContext } from "react"
import { Homepage } from "./Homepage";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import AuthContext from "./context/AuthProvider";
import axios from "axios";


export const Login = (props) => {
    const { setAuth } = useContext(AuthContext);
    const userRef= useRef();
    const errRef= useRef();

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSuccess(true);
        console.log(email);
    }

    // useEffect(() => {
    //     userRef.current.focus();
    // }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, pass])

    return (
        <>
        {success ? (
            <div className="homepage">
                    <Homepage name="Tanil"/>
            </div>
        ) : (
            <body className='App'>
                <div className="auth-form-container">
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live= "assertive">{errMsg}</p>
                    <h2>Login</h2>
                        <form className="login-form" onSubmit={handleSubmit}>
                            <label htmlFor="email">Email:</label> 
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="" id="email" name="email" required/>
                            <label htmlFor="password">Password:</label> 
                            <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="" id="password" name="password" required/>
                            <br/>
                            <button type="submit">Login</button>
                        </form>
                    <button className="link-button" onClick ={() => props.onFormSwitch('register')}>Don't have an account? Register Here</button>
                </div>
            </body>
        )}
        </>
    )
}