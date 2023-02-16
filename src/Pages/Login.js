import React, { useState, useEffect, useRef, useContext } from "react"
import ReactDOM from "react-dom/client";
import { Dashboard } from "./Dashboard";
import axios from "axios";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Link, withRouter } from "react-router-dom";
import '../App.css';


const api = {
    baseUrl: process.env.REACT_APP_BACKEND_URL,

    logErr: (err) => {
        console.log("Request error", err.config.url, err.config.data);
        console.log(err);
    },

    getAllUsers: () =>
        axios
            .get(`${api.baseUrl}/users`)
            .then((response) => response.data)
            .catch(api.logErr),
    
    getUser: (userId) =>
        axios
            .get(`${api.baseUrl}/users/${userId}`)
            .then((response) => response.data)
            .catch(api.logErr),
    
    postUser: (userData) => 
        axios
            .post(`${api.baseUrl}/users`, userData)
            .then((response) => response.data)
            .catch(api.logErr)
}

export const Login = () => {
    const navigate = useNavigate();
    const userRef = useRef();
    const errRef = useRef();
    const [allUsers, setAllUsers] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [authenticated, setauthenticated] = useState(false);
    const [userObject, setUserObject] = useState({});

    const refreshUsersList = () => {
        api.getAllUsers().then((usersData) => {
            setAllUsers(usersData);
            console.log(`current users: ${usersData}`);
        })
    }

    useEffect(refreshUsersList, []);

    useEffect(() => {
        if (userObject && authenticated) {
            console.log(userObject);
            navigateToDashboard();
        }
    }, [userObject, authenticated]);

    const navigateToDashboard = () => {
        navigate("/dashboard", { state: { authenticated: authenticated, userObject: userObject } });
    }

    const handleLoginButton = (e) => {
        e.preventDefault();
        if (allUsers) {
            const account = allUsers.find((user) => user.email === email);
            setUserObject(account);
            if (account && account.password === pass) {
                setauthenticated(true)
                console.log('successful')
        } else {
            console.log('failed')
        }
        }};

        
    const handleEmail = (e) => {
        e.preventDefault();
        setEmail(e.target.value)
        console.log(email)
    }

    const handlePassword = (e) => {
        e.preventDefault();
        setPass(e.target.value)
        console.log(pass)
    }

    return (
        <>
        <header>
            <h1 className='header'>The Date.</h1>
        </header>
                <div className='App'>
                    <div className="auth-form-container">
                <h2>Login</h2>
                <div>
                    <form className="login-form">
                        <label htmlFor="email">Email:</label> 
                        <input value={email} onChange={handleEmail} type="email" placeholder="" id="email" ref={userRef} required/>
                        <label htmlFor="password">Password:</label> 
                        <input value={pass} onChange={handlePassword} type="password" placeholder="" id="password" required/>
                        <br/>
                        <button onClick={(e) => handleLoginButton(e)} >Login</button>
                    </form>
                    <br/>
                <div className="link">
                    <Link to="/register">Don't have an account? Register Here</Link>
                </div>
                </div>
            </div>
            </div>
        </>
    )
}