import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import "./App"
import Userfront from "@userfront/react";
Userfront.init("demo1234");


const userData = JSON.stringify(Userfront.user, null, 2);


// function Dashboard() {
//   const userData = JSON.stringify(Userfront.user, null, 2);
//   return (
//     <div>
//       <h2>Dashboard</h2>
//       <pre>{userData}</pre>
//       <button onClick={Userfront.logout}>Logout</button>
//     </div>
//   );
// }

export const Navigation = () => {

    return (
        <nav className="Navbar">
                <div className="Homepage-nav"> 
                <i className="Homepage-navIcon"></i>
                <p><Link to="/dashboard">HOME</Link></p>
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
                <p><Link onClick={ Userfront.logout}>LOG OUT</Link></p>
                </div>
            </nav>
    )
}