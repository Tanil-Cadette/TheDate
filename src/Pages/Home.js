import React from "react";
import { Link } from "react-router-dom";
// import { Login } from './Login';
import "../App"
import Userfront from "@userfront/react";
Userfront.init("demo1234");

const LoginForm = Userfront.build({
    toolId: "alnkkd",
});


export const Home = () => {
    return (
        <>
        <body className='App'>
        <div className="auth-form-container">
        <h3>Find the perfect date that your friend would love</h3>
        <br/>
        <div>
            <LoginForm />
        </div>
        <ul className="login-form">
            <button className="link-button"><Link className="active" to="/reset">Forgot your password?</Link></button>
            <button className="link-button"><Link className="active" to="/register">Don't have an account? Register Here</Link></button>
        </ul>
        </div>
        </body>
        </>
    )
}