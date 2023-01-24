import React, { useState } from "react";
import "./App"
import { Link } from "react-router-dom";
import { Login } from "./Login";
import { Friends } from "./Friends";
import "./Homepage.css"

export const Profile= (props) => {
    return (
        <>
        <body className="Homepage-body">
            <nav className="Navbar">
                <a className="Homepage-nav"> 
                <i className="Homepage-navIcon"></i>
                <p><Link to="/home">HOME</Link></p>
                </a> 
                <a className="Homepage-nav"> 
                <i className="Homepage-navIcon"></i>
                <p><Link to="/friends">FRIENDS</Link></p>
                </a>
                <a className="Homepage-nav"> 
                <i className="Homepage-navIcon"></i>
                <p><Link to="/profile">PROFILE</Link></p>
                </a>
                <a className="Homepage-nav"> 
                <i className="Homepage-navIcon"></i>
                <p><Link to="/">LOG OUT</Link></p>
                </a>
            </nav>
            <div>
                <h3>{props.name}</h3>
            </div>
        </body>
    <footer className="Homepage-footer">
        Contact Us
    </footer>
    </>
        );
}