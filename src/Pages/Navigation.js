import React, { useEffect, useState } from "react";
import { Link, withRouter, useNavigate, useLocation } from "react-router-dom";
import "../App"



export const Navigation = (props) => {
    const { authenticated, userObject } = props;
    const navigate = useNavigate();
    const [navigateHome, setNavigateHome] = useState(null)
    const [navigateFriends, setNavigateFriends] = useState(null)
    const [navigateProfile, setNavigateProfile] = useState(null)
    const [navigateLogout, setNavigateLogout] = useState(null)


    const handleHome = (e) => {
        setNavigateHome(true);
    }

    const handleFriends = (e) => {
        setNavigateFriends(true);
    }

    const handleProfile = (e) => {
        setNavigateProfile(true);
    }

    const handleLogout = (e) => {
        setNavigateLogout(true);
    }

    useEffect(() => {
        if (navigateHome) {
            navigate("/dashboard", { state: { authenticated: authenticated, userObject: userObject } });
            console.log(props.authenticated);
            console.log(props.userObject);
        }
    }, [navigateHome])

    useEffect(() => {
        if (navigateFriends) {
            navigate("/friends", { state: { authenticated: authenticated, userObject: userObject } });
            console.log(props.authenticated);
            console.log(props.userObject);
        }
    }, [navigateFriends])

    useEffect(() => {
        if (navigateLogout) {
            navigate("/login", { state: { authenticated: false, userObject: {} } });
            console.log(props.authenticated);
            console.log(props.userObject);
        }
    }, [navigateLogout])

    useEffect(() => {
        if (navigateProfile) {
            navigate("/profile", { state: { authenticated: authenticated, userObject: userObject } });
            console.log(props.authenticated);
            console.log(props.userObject);
        }
    }, [navigateProfile])


    return (
        <nav className="Navbar">
                <div className="Homepage-nav"> 
                <i className="Homepage-navIcon"></i>
                    <button className="link-button" onClick={handleHome}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-house-door-fill" viewBox="0 0 16 16">
                            <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5Z"/>
                        </svg>
                    </button>
                </div>
                <div className="Homepage-nav"> 
                <i className="Homepage-navIcon"></i>
                    <button className="link-button" onClick={handleFriends}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-people-fill" viewBox="0 0 16 16">
                            <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>
                        </svg>
                    </button>
                </div>
                <div className="Homepage-nav"> 
                <i className="Homepage-navIcon"></i>
                    <button className="link-button" onClick={handleProfile}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                        </svg>
                    </button>
                </div>
                <div className="Homepage-nav"> 
                <i className="Homepage-navIcon"></i>
                    <button className="link-button" onClick={handleLogout}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"/>
                            <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                        </svg>
                    </button>
                </div>
            </nav>
    )
}