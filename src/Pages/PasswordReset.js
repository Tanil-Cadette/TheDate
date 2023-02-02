import React from "react";
import Userfront from "@userfront/react";
import { Link } from "react-router-dom";

Userfront.init("demo1234");


const PasswordResetForm = Userfront.build({
    toolId: "dkbmmo",
});

export const PasswordReset= () => {
    return (
        <>
            <body className='App'>
            <div className="auth-form-container">
            <h3>Find the perfect date that your friend would love</h3>
            <br/>
            <div>
                <PasswordResetForm />
            </div>
            <ul className="login-form">
                <button className="link-button"><Link className="active" to="/register">Don't have an account? Register Here</Link></button>
                <button className="link-button"><Link className="active" to="/">Have an account? Login Here</Link></button>
            </ul>
            </div>
            </body>
            </>
    );
}