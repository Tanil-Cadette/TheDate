import React, { useState } from "react";
import "../App"
import { Link } from "react-router-dom";
import { Login } from "./Login";
import { Friends } from "./Friends";
import { Navigation } from "./Navigation";
import "./Dashboard.css"
import axios from "axios";

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

export const Profile= (user) => {
    return (
        <>
        <Navigation />
            <div className="Homepage-body">
            <div>
                <h3>{user.name}</h3>
            </div>
        </div>
    <footer className="Homepage-footer">
        Contact Us
    </footer>
    </>
        );
}