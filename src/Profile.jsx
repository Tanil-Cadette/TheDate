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
        <Navigation />
            <div className="Homepage-body">
            <div>
                <h3>{props.name}</h3>
            </div>
        </div>
    <footer className="Homepage-footer">
        Contact Us
    </footer>
    </>
        );
}