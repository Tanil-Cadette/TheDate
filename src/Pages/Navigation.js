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
                <button className="link-button" onClick={handleHome}>HOME</button>
                </div>
                <div className="Homepage-nav"> 
                <i className="Homepage-navIcon"></i>
                <button className="link-button" onClick={handleFriends}>FRIENDS</button>
                </div>
                <div className="Homepage-nav"> 
                <i className="Homepage-navIcon"></i>
                <button className="link-button" onClick={handleProfile}>PROFILE</button>
                </div>
                <div className="Homepage-nav"> 
                <i className="Homepage-navIcon"></i>
                <button className="link-button" onClick={handleLogout}>LOGOUT</button>
                </div>
            </nav>
    )
}