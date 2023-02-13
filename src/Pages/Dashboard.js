import React, { useState, useEffect } from "react";
import "../App"
import { Link, useLocation, Navigate } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Login } from "./Login";
import { Friends } from "./Friends";
import "./Dashboard.css"
import axios from "axios";


const api = {
    baseUrl: process.env.REACT_APP_BACKEND_URL,

    logErr: (err) => {
        console.log("Request error", err.config.url, err.config.data);
        console.log(err);
    },

    getAllFriends: () =>
        axios
            .get(`${api.baseUrl}/friends`)
            .then((response) => response.data)
            .catch(api.logErr),
    
    getUser: (userId) =>
        axios
            .get(`${api.baseUrl}/users/${userId}`)
            .then((response) => response.data)
            .catch(api.logErr),
    
    getDateRecommendations: (interest, location) =>
        axios
            .get(`${api.baseUrl}/recommendations/${interest}/${location}`)
            .then((response) => response.data)
            .catch(api.logErr),
    
    getPlaceAddress: (lat, lon) =>
        axios
            .get(`https://us1.locationiq.com/v1/reverse?key=${process.env.REACT_APP_LOCATION_IQ_API_KEY}&lat=${lat}&lon=${lon}&format=json`)
            .then((response) => response.data)
            .catch(api.logErr),
    
    createDate: (id, dateData) => 
        axios 
            .post(`${api.baseUrl}/friends/${id}/dates`, dateData)
            .then((response)=> response.data)
            .catch(api.logErr)
}

export const Dashboard= () => {
    const location = useLocation();
    // const { authenticated, userObject } = location.state;
    const [authenticated, setauthenticated] = useState(location.state?.authenticated || false);
    const [userObject, setUserObject] = useState(location.state?.userObject || {});
    const [user, setUser] = useState({});
    const [userId, setUserId] = useState(null);
    const [friendsList, setFriendsList] = useState([]);
    const [planDateForm, setPlanDateForm] = useState(false);
    const [planDateButton, setPlanDateButton] = useState('Plan Date');
    const [pickInterestForm, setPickInterestForm] = useState(false);
    const [pickedFriend, setPickedFriend]= useState('')
    const [pickedInterest, setPickedInterest] = useState('');
    const [friendLocation, setFriendLocation] = useState('');
    const [recommendations, setRecommendations] = useState([]);
    const [friendId, setFriendId] = useState('');

    //updates the friend list
    const refreshFriendsList = (userId) => {
        if (userId) {
            api.getUser(userId).then((userData) => {
                setFriendsList(userData.friends);
            });
        }
    }

    useEffect(() => {
        setUser(userObject);
    }, []);

    useEffect(() => {
        if (user && user.id) {
            setUserId(user.id);
            refreshFriendsList(user.id);
            console.log(user.id);
            console.log(authenticated);
            console.log(userObject);
        }
    }, [userId, user]);


    useEffect(() => {
    }, [friendsList, planDateForm, pickInterestForm]);

    function toggleClick(e) {
        e.preventDefault();
        setPlanDateForm(value => !value);
        setPickInterestForm(false);

        if (planDateButton === 'Cancel') {
            setPlanDateButton('Plan Date') 
            setPickedInterest('') 
        } else {
            setPlanDateButton('Cancel')
            setPickedInterest('')
        }
    };

    function handleFriendClicked(e) {
        if (e.target.checked) {
            setPickedFriend(e.target.value)
            setPickInterestForm(true);
            console.log(e.target.value);
            friendsList.map((friend) => {
                if (friend.name === e.target.value) {
                    setFriendLocation(friend.location);
                    setFriendId(friend.id);
                }
            })
        } else {
            setPickedFriend('')
            setPickInterestForm(false);
        }
        e.target.classList.toggle("blue");
    }

    function displayInterest(nameOfFriend) {
        const selectedFriend = friendsList.filter(friend =>
                friend.name === nameOfFriend)[0];
            return (
                <form>
                <label>Pick an Interest:</label>
                {selectedFriend.interest.map((interest) => (
                    <label key={interest}>
                        <br/>
                        <input type="radio" name="interest" value={interest} onClick={handleInterestClicked}/>
                        {interest}
                    </label>
                ))}
            </form>
        );}


    function handleInterestClicked(e) {
        if (e.target.checked){
            setPickedInterest(e.target.value)
            console.log(e.target.value)
            console.log(friendLocation)
            console.log(friendId)
        } else {
            setPickedInterest('')
        }
    }

    function handleFindPlaces(interest, location) {
        api.getDateRecommendations(interest, location).then((data) => {
            console.log(data)
            let recommendations = []
            let i = 0;
            (async function loop() {
                if (i === data.length) {
                    setRecommendations(recommendations);
                    return;
                }
                let date = data[i++];
                let address = await getAddress(date.geometry.lat, date.geometry.lng);
                date["address"] = address;
                date["button"] = 'Add Date'
                recommendations.push(date);
                setTimeout(loop, 1000);
            })();
        });
    }
    

    useEffect(
        handleFindPlaces, []);

    function getAddress(lat, lon) {
        return api.getPlaceAddress(lat, lon).then((data) => {
            return data["display_name"]
        });
    }

    function addDate(id, dateData) {
        api.createDate(id, dateData).then((dateData) => {
            console.log(dateData);
        })
        .catch((error) => {
            console.log(error.response.data);
            console.log(error.response.headers);
            console.log(error.response.status);
            console.log(error.response.statusText);
        });
    }

    function handleAddDateButton(e) {
        console.log(recommendations);
        let dateData = {}
        let place = e.target.value
        console.log(place);
        recommendations.map((rec) => {
            if (place === rec.name) {
                dateData["place"] = rec.name
                dateData["location"] = rec.address
                dateData["category"] = pickedInterest
                dateData["rank"] = rec.rating
                dateData["date_completed"] = false
            }
            return dateData
        })
        setRecommendations((prevRecommendations) => {
            return prevRecommendations.map(rec => {
                if (place === rec.name) {
                    return { ...rec, button: "Date Added"}
                }
            })
        })
        addDate(friendId, dateData);
        window.location.reload()
    }

    if (!authenticated) {
        return <Navigate replace to="/login" />;
        } else {
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
                        <h3>Hi {userObject.name}, are you ready to plan a date?</h3>
                        <p>{new Date().toLocaleString() + ""}</p>
                        <ul>
                            <li>
                                Let start by picking a friend you would like to take on a date
                            </li>
                            <li>
                                Pick one of your friend's interest to find the best place near them that relates to that interest.
                            </li>
                            <li>
                                Choose the perfect date!
                            </li>
                        </ul>
                    </div>
                    <br/>
                    <button className="component-button" onClick={toggleClick}>{planDateButton}</button>
                    <br/>
                    {planDateForm ? (
                        <form>
                        <label>Who would you like to go on a date with?</label>
                        <div>
                        {friendsList.map((friend) => (
                            <label key={friend.id}>
                            <input type="radio" name="friend" value={friend.name} onClick={
                                handleFriendClicked}/>
                            {friend.name}
                            <br/>
                            </label>                           
                        ))}
                        </div>
                    </form>
                    ) :
                    (<div></div>)}
                    <br/>
                        {pickInterestForm ? (
                        displayInterest(pickedFriend)
                        ) :
                        (<div></div>)}
                    <div>
                    {pickedInterest&&friendLocation ? (
                        <div>
                            <br/>
                            Let's go on a date with {pickedFriend} in {friendLocation} related to {pickedInterest}
                            <br/>
                            <br/>
                            <button className="component-button" onClick={() => {
                                handleFindPlaces(pickedInterest, friendLocation);
                            }}>
                                Find Date Recommendations
                            </button>
                            {recommendations.length > 0 ? 
                                (<div>
                                    {recommendations.map((rec) => {
                                        return (
                                            <>
                                                <div className="box" key={rec.name}>
                                                    <br />
                                                    Name: {rec.name}
                                                    <br />
                                                    Address: {rec.address}
                                                    <br />
                                                    Rating: {rec.rating}
                                                    <br />
                                                    <div>
                                                        <button className="component-button" value={rec.name} onClick={handleAddDateButton}>{rec.button}</button>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })}
                                </div>) : 
                                (<div></div>)}
                        </div>
                    ) : (<div></div>)}
                    </div>
                </div>
            </>
        );
    };
}   