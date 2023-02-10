import React, { useState, useEffect, useRef } from "react"
import ReactDOM from "react-dom/client";
import { Dashboard } from "./Dashboard";
import axios from "axios";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";


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

export const Login = (props) => {
    const navigate = useNavigate();
    const userRef = useRef();
    const errRef = useRef();
    const [allUsers, setAllUsers] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [authenticated, setauthenticated] = useState(localStorage.getItem(localStorage.getItem("authenticated")|| false));
    const [userObject, setUserObject] = useState({})

    // useEffect(() => {
    //     userRef.current.focus();
    // }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, pass])

    const refreshUsersList = () => {
        api.getAllUsers().then((usersData) => {
            setAllUsers(usersData);
            console.log(allUsers);
        })
    }

    useEffect(refreshUsersList, []);

    const handleLoginButton = (e) => {
        e.preventDefault();
        const account = allUsers.find((user) => user.email === email);
        if (account && account.password === pass) {
            // setauthenticated(true)
            localStorage.setItem("authenticated", true);
            console.log('successful')
        }
        };

        if (authenticated) {
            return <Navigate replace to="/dashboard" />;
            } else {
            return  <Login />;
            }
        
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
                <body className='App'>
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
                <button className="link-button" onClick ={() => props.onFormSwitch('register')}>Don't have an account? Register Here</button>
                </div>
            </div>
            </body>
        </>
    )
}

{/* <form className="login-form">
                        <label htmlFor="email">Email:</label> 
                        <input value={email} onChange={handleEmail} type="email" placeholder="" id="email" ref={userRef} required/>
                        <label htmlFor="password">Password:</label> 
                        <input value={pass} onChange={handlePassword} type="password" placeholder="" id="password" required/>
                        <br/>
                        <button onClick={() => handleLoginButton()} >Login</button>
                    </form>
                <button className="link-button" onClick ={() => props.onFormSwitch('register')}>Don't have an account? Register Here</button>
             */}
//     const { setAuth } = useContext(AuthContext);
//     const userRef= useRef();
//     const errRef= useRef();

//     const [email, setEmail] = useState('');
//     const [pass, setPass] = useState('');
//     const [errMsg, setErrMsg] = useState('');
//     const [success, setSuccess] = useState(false);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         setSuccess(true);
//         console.log(email);
//     }

//     useEffect(() => {
//         userRef.current.focus();
//     }, [])

//     useEffect(() => {
//         setErrMsg('');
//     }, [email, pass])

//     return (
//         <>
//         {success ? (
//             <div className="homepage">
//                     <Homepage name="Tanil"/>
//             </div>
//         ) : (
//             <body className='App'>
//                 <div className="auth-form-container">
//                 <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live= "assertive">{errMsg}</p>
//                     <h2>Login</h2>
//                         <form className="login-form" onSubmit={handleSubmit}>
//                             <label htmlFor="email">Email:</label> 
//                             <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="" id="email" name="email" required/>
//                             <label htmlFor="password">Password:</label> 
//                             <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="" id="password" name="password" required/>
//                             <br/>
//                             <button type="submit">Login</button>
//                         </form>
//                     <button className="link-button" onClick ={() => props.onFormSwitch('register')}>Don't have an account? Register Here</button>
//                 </div>
//             </body>
//         )}
//         </>
//     )
// }