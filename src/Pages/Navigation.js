import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import "../App"


export const Navigation = (user) => {

    return (
        <nav className="Navbar">
                <div className="Homepage-nav"> 
                <i className="Homepage-navIcon"></i>
                <p><Link to="/">HOME</Link></p>
                </div>
                <div className="Homepage-nav"> 
                <i className="Homepage-navIcon"></i>
                <p><Link to="/friends">FRIENDS</Link></p>
                </div>
                <div className="Homepage-nav"> 
                <i className="Homepage-navIcon"></i>
                <p><Link to="/profile">PROFILE</Link></p>
                </div>
                <div className="Homepage-nav"> 
                <i className="Homepage-navIcon"></i>
                <p><Link to="/">LOG OUT</Link></p>
                </div>
            </nav>
    )
}