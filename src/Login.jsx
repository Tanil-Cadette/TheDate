import React, { useState } from "react"

export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

    return (
    <div className="auth-form-container">
        <h2>Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label> 
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="" id="email" name="email"/>
            <label htmlFor="password">Password</label> 
            <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="" id="password" name="password"/>
            <br/>
            <button type="submit">Login</button>
        </form>
        <button className="link-button" onClick ={() => props.onFormSwitch('register')}>Register Here</button>
    </div>
    )
}