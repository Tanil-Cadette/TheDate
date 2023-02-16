import React, { useState, useEffect } from "react";
import "../App"
import { Login } from "./Login";
import { Friends } from "./Friends";
import { Navigation } from "./Navigation";
import "./Dashboard.css"
import axios from "axios";
import { Link, useLocation, Navigate } from "react-router-dom";


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
            .catch(api.logErr),

    updateUser: (userData, userId) =>
        axios
            .patch(`${api.baseUrl}/users/${userId}`, userData)
            .then(((response) => response.date))
            .catch(api.logErr)
}

export const Profile= () => {
    const location = useLocation();
    // const { authenticated, userObject } = location.state;
    const [authenticated, setauthenticated] = useState(location.state?.authenticated || false);
    const [userObject, setUserObject] = useState(location.state?.userObject || {});
    // const [user, setUser] = useState({});
    const [userId, setUserId] = useState(null);
    const [userName, setUserName] = useState(null);
    const [userPassword, setPassword] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    const [editUserInfo, setEditUserInfo] = useState(null);

    // useEffect(() => {
    //     setUser(userObject);
    // }, [userObject]);

    useEffect(() => {
        if (userObject) {
            // setUserId(userObject.id);
            console.log(userObject.id);
            console.log(authenticated);
            console.log(userObject);
        }
    }, [userObject]);

    const getUserUpdates = (id) => {
        api.getUser(id).then((response) => {
            console.log(response);
            setUserObject(response);
        })
    }

    const editUser = (data, id) => {
        if (userId) {
            api.updateUser(data, id).then((response) => {
                getUserUpdates(id);
            })
        }
    }

    const editUserData = (userId) => {
        let userData = {}
        if (userName) userData['name'] = userName;
        if (userPassword) userData['password'] = userPassword;
        if (userEmail) userData['email'] = userEmail;
        console.log(userId);
        console.log(userData);
        setEditUserInfo(userData);
        setUserId(userId);
        editUser(userData, userId);
    }

    useEffect(() => {
        if (editUserInfo && userId) {
            console.log(editUserInfo);
            editUser(editUserInfo, userId);
        }
    }, [editUserInfo])
    
    return (
        <>
        <header>
            <h1 className='header'>The Date.</h1>
        </header>
        <Navigation 
            authenticated={authenticated}
            userObject={userObject}
        />
            <div className="Homepage-body">
            <div>
                <h3> {userObject.name}'s Account Information</h3>
            </div>
            <form >
                <label>Edit Name: </label>
                <input type="text" placeholder={userObject.name} id="name" onChange={(e) => setUserName(e.target.value)} />
                <br/>
                <label>Change Password: </label>
                <input type="password" placeholder='' id="password" onChange={(e) => setPassword(e.target.value)} />
                <br/>
                <label>Change Email: </label>
                <input type="email" placeholder={userObject.email} id="email" onChange={(e) => setUserEmail(e.target.value)} />
                <button className="component-button" onClick={(e) => {
                    e.preventDefault();
                    editUserData(userObject.id);
                }}>
                            Submit
                </button>
            </form>
            <br/>
            <button className="delete-button">Delete Account</button>
        </div>
    </>
        );
}