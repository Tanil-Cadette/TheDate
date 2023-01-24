import React, { useState } from "react"

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

    return (
        <body className='App'>
        <div className="auth-form-container">
            <h2>Register Here</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input value={name} name="name" id="name" placeholder="Full Name" required/>
                <label htmlFor="email">Email:</label> 
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="" id="email" name="email" required/>
                <label htmlFor="password">Password:</label> 
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="Minimum 8 characters" id="password" name="password" required/>
                <button type="submit">Submit</button>
            </form>
            <button className="link-button" onClick ={() => props.onFormSwitch('login')}>Already have an account? Login Here</button>
        </div>
        </body>
    )
}