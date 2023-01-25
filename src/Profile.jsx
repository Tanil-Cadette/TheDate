import React, { useState } from "react";
import "./App"
import { Link } from "react-router-dom";
import { Login } from "./Login";
import { Friends } from "./Friends";
import { Navigation } from "./Navigation";
import "./Homepage.css"

export const Profile= (props) => {
    return (
        <>
        <body className="Homepage-body">
            <Navigation />
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