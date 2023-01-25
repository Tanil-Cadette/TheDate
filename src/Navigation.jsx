import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./App"

export const Navigation = () => {
    return (
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
    )
}