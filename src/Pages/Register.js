import React, { useState, useEffect, useRef } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link, withRouter } from "react-router-dom";

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
const navigate = useNavigate;

export const Register = (props) => {

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');

    const handleRegisterButton = (e) => {
        api.postUser({
            "name": name,
            "email": email,
            "password": pass
        }).then((newUser) => {
            navigate('/dashboard')
        })
        console.log('successfully added');
    }
    const handleEmail = (e) => {
        e.preventDefault();
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
        e.preventDefault();
        setPass(e.target.value)
    }

    const handleName = (e) => {
        e.preventDefault();
        setName(e.target.value)
    }

    return (
        <body className='App'>
        <div className="auth-form-container">
            <h2>Register Here</h2>
            <form className="register-form">
                <label htmlFor="name">Name:</label>
                <input value={name} name="name" type="text" id="name"onChange={handleName}placeholder="Full Name" required/>
                <label htmlFor="email">Email:</label> 
                <input value={email} onChange={handleEmail} type="email" placeholder="" id="email" name="email" required/>
                <label htmlFor="password">Password:</label> 
                <input value={pass} onChange={handlePassword} type="password" placeholder="Minimum 8 characters" id="password" name="password" required/>
                <button onClick={handleRegisterButton}>Submit</button>
            </form>
            <br/>
            <div className="link">
                <Link to="/login">Already have an account? Login Here</Link>
            </div>
        </div>
        </body>
    )
}
    


// <div className="auth-form-container">
//             <h3>Find the perfect date that your friend would love</h3>
//             <br/>
//             <div>
//                 <SignupForm />
//             </div>
//             <ul className="login-form">
//                 <button className="link-button"><Link className="active" to="/reset">Forgot your password?</Link></button>
//                 <button className="link-button"><Link className="active" to="/">Have an account? Login Here</Link></button>
//             </ul>
//             </div>


    // const [email, setEmail] = useState('');
    // const [pass, setPass] = useState('');
    // const [name, setName] = useState('');

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     console.log(email);
    // }

//     return (
//         <body className='App'>
//         <div className="auth-form-container">
//             <h2>Register Here</h2>
//             <form className="register-form" onSubmit={handleSubmit}>
//                 <label htmlFor="name">Name:</label>
//                 <input value={name} name="name" id="name" placeholder="Full Name" required/>
//                 <label htmlFor="email">Email:</label> 
//                 <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="" id="email" name="email" required/>
//                 <label htmlFor="password">Password:</label> 
//                 <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="Minimum 8 characters" id="password" name="password" required/>
//                 <button type="submit">Submit</button>
//             </form>
//             <button className="link-button" onClick ={() => props.onFormSwitch('login')}>Already have an account? Login Here</button>
//         </div>
//         </body>
//     )
// }