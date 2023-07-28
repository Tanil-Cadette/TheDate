import React, { useState, useEffect } from "react";
import { Navigation } from "./Navigation";
import axios from "axios";
import "./Friends.css"
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Link, useLocation, Navigate } from "react-router-dom";



const api = {
    baseUrl: process.env.REACT_APP_BACKEND_URL,

    logErr: (err) => {
        console.log("Request error", err.config.url, err.config.data);
        console.log(err);
    },

    getUser: (userId) =>
        axios
            .get(`${api.baseUrl}/users/${userId}`)
            .then((response) => response.data)
            .catch(api.logErr),

    getAllFriends: () =>
        axios
            .get(`${api.baseUrl}/friends`)
            .then((response) => response.data)
            .catch(api.logErr),
    
    getFriend: (friendId) =>
        axios
            .get(`${api.baseUrl}/friends/${friendId}`)
            .then((response) => response.data)
            .catch(api.logErr),

    getFriendAndDates: (friend_id) =>
        axios
            .get(`${api.baseUrl}/friends/${friend_id}/dates`)
            .then((response) => response.data)
            .catch(api.logErr),
    
    postFriend: (user_id, friendData) => 
        axios
            .post(`${api.baseUrl}/users/${user_id}/friends`, friendData)
            .then((response) => response.data)
            .catch(api.logErr),
    
    updateFriend: (friendData, id) =>
        axios
            .patch(`${api.baseUrl}/friends/${id}`, friendData)
            .then((response) => response.data)
            .catch(api.logErr),
    
    deleteFriend: (friendId) =>
        axios
            .delete(`${api.baseUrl}/friends/${friendId}`)
            .then((response) => response.data)
            .catch((api.logErr)),
    
    getCoords: (location) =>
        axios
            .get(`https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATION_IQ_API_KEY}&q=${location}&format=json`)
            .then((response) => response.data)
            .catch((api.logErr)),
    
    getAllDates: () =>
        axios   
            .get(`${api.baseUrl}/dates`)
            .then((response)=> response.data)
            .catch(api.logErr),
    
    updateDate: (id, dateData) =>
        axios
            .patch(`${api.baseUrl}/dates/${id}`, dateData)
            .then((response)=> response.data)
            .catch(api.logErr),
    
    deleteDate: (id) =>
        axios
            .delete(`${api.baseUrl}/dates/${id}`)
            .then((response)=> response.data)
            .catch(api.logErr)
};

export const fetchPlace = async (text) => {
    try {
        const res = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${text}.json?access_token=${process.env.REACT_APP_MAP_API_KEY}&cachebuster=1625641871908&autocomplete=true&types=place`
        );
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
    } catch (err) {
        return { error: "Unable to retrieve places" };
    }
};

export const Friends = () => {
    const location = useLocation();
    const [authenticated, setauthenticated] = useState(location.state?.authenticated || false);
    const [userObject, setUserObject] = useState(location.state?.userObject || {});
    const [user, setUser] = useState({});
    const [userId, setUserId] = useState(null);
    const [friendForm, setfriendForm] = useState(false);
    const [addFriendButton, setAddFriendButton] = useState('Add Friend')
    const [newFriendName, setNewFriendName] = useState('');
    const [newFriendLocation, setNewFriendLocation] = useState('');
    const [newFriendInterest, setNewFriendInterest] = useState([]);
    const [editFriendLocation, setEditFriendLocation] = useState('');
    const [interestSelected, setInterestSelected] = useState(false);
    const [friendsList, setFriendsList] = useState([]);
    const [removeFriendId, setRemoveFriendId] = useState(null);
    const [autocompleteCities, setAutocompleteCities] = useState([]);
    const [autocompleteErr, setAutocompleteErr] = useState("");
    const [locationCoordinates, setLocationCoordinates] = useState([]);
    const [removeDateId, setRemoveDateId] = useState(null);
    const [updateDateId, setUpdateDateId] = useState(null);
    const [editFriendInfo, setEditFriendInfo] = useState({});
    const [editFriendId, setEditFriendId] = useState(null);
    const [editFriends , setEditFriends] = useState(false);
    const interests= ["Sightseeing", "Rollercoaster", "Art", "Escape Room", "Bowling", "Go Karts", "Beach", "Picnic", "Historical", "Nightlife", "Restaurant", "Golf", "Swimming", "Movies"]

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

//handle update date button
    const handleDateCompletedButton = (e, dateComplete, dateId) => {
        console.log(dateComplete);
        console.log(dateId);
        console.log(e.target.innerHTML) ;
        if( e.target.innerHTML === 'Completed?' && dateComplete){
            e.target.innerHTML ='Completed';
            api.updateDate(dateId, {"date_completed": true});
        }
        console.log('Date completed')
    }

    const handleDateHistoryButton = (friendDates) => {
        if (friendDates) {
            return friendDates.map(date => {
                if (!date.date_completed){
                    date["button"] = 'Completed?'
                } else {
                    date["button"] = 'Date Completed'
                }
                    return <div className="box" key={date.id}>
                    {date.place}
                    <br />
                    {date.location}
                    <br />
                    {date.category}
                    <br />
                    {date.rank}
                    <div>
                        <button className="component-button" key={date.id} onClick={(e) => handleDateCompletedButton(e, date["completed"]=true, date.id)}>{date.button}</button>
                    </div>
                    <div>
                        <button className="link-button" key={date.id} onClick={() => handleDeleteDateButton(date.id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                            </svg>
                        </button>
                    </div>
                    </div>;
            });
        } 
    } 

// post new friend to database after submit is clicked
    function newFriend(e) {
        e.preventDefault();
        console.log("add new friend button clicked")
        if (newFriendName === "" || newFriendLocation === "" || newFriendInterest.length === 0) {
            if(newFriendName === "") alert("Please enter a name")
            if(newFriendLocation === "") alert("Please enter a location")
            if(newFriendInterest.length === 0) alert("Please select at least one interest")
            return;
        }
        findCoords(newFriendLocation);
    };

//gets friends coordinates when adding new friend
    const findCoords = async (friendLocation) => {
        const response = await api.getCoords(friendLocation);
        setLocationCoordinates([response[0].lat, response[0].lon]);
        setfriendForm(false);   
        setAddFriendButton('Add Friend');
        window.location.reload();
    };


//post new friend to database
    useEffect(() => {
        if (locationCoordinates.length && userId) {
            createNewFriend(userId, {
                'name': newFriendName,
                'location': newFriendLocation,
                'interest': newFriendInterest,
                'location_coords': locationCoordinates
            });
            console.log('successful')
        }
    }, [locationCoordinates]);


// handle friend location verification
    const handleCityChange = async (e) => {
        setNewFriendLocation(e.target.value);
        if (!newFriendLocation) return;

    const res = await fetchPlace(newFriendLocation);
    !autocompleteCities.includes(e.target.value) &&
    res.features &&
        setAutocompleteCities(res.features.map((place) => place.place_name));
        res.error ? setAutocompleteErr(res.error) : setAutocompleteErr("");
    
};

// handle friend location verification after edit
    const handleEditCityChange = async (e) => {
        setEditFriendLocation(e.target.value);
        if (!editFriendLocation) return;

    const res = await fetchPlace(editFriendLocation);
    !autocompleteCities.includes(e.target.value) &&
    res.features &&
        setAutocompleteCities(res.features.map((place) => place.place_name));
        res.error ? setAutocompleteErr(res.error) : setAutocompleteErr("");

    };

//edits friend info
    const editFriendData = (friendData, id) => {
        if (userId) {
            api.updateFriend(friendData, id).then((response) => {
                console.log(friendData);
                refreshFriendsList(userId);
                setNewFriendName('');
                setNewFriendInterest('');
                setNewFriendLocation('');
                window.location.reload();
                    })
        }
        }
        
//patch friend info after edit
    function editFriend(friendId) {
        let friendData = {};
        if (newFriendName) friendData['name'] = newFriendName;
        if (newFriendInterest.length > 0) friendData['interest'] = newFriendInterest;
        if (editFriendLocation) {
            friendData['location'] = editFriendLocation;
            friendData['location_coords'] = ['0', '0'];
        } 
        setEditFriendInfo(friendData);
        setEditFriendId(friendId);
        setEditFriends(!editFriends);
        editFriendData(friendData, friendId)
    }

//useEffect for edit friend data
    useEffect(() => {
        if (editFriendInfo && editFriendId && userId && authenticated) {
            editFriendData(editFriendInfo, editFriendId);
            refreshFriendsList(userId);            
        }
    }, [editFriendId, editFriendInfo])



//deletes one friend 
    const deleteFriend = (friendId) => {
        if (friendId !== null){
            api.deleteFriend(friendId).then((response) => {
                let updatedFriendList = [...friendsList].filter(
                    (friend) => friend.friendId !== friendId
                );
                setFriendsList(updatedFriendList);
                setRemoveFriendId(null)
                window.location.reload()
                console.log(friendsList)
            });
        }
        };

//handle delete button clicked
    const handleDeleteButton = (friendId) => {
        setRemoveFriendId(friendId);
    }

// removes friend if id selected
    useEffect(() => {
        deleteFriend(removeFriendId);
    }, [removeFriendId]);

//deletes one date
    const deleteDate = (removeDateId) => {
        if (removeDateId !== null) {
            api.deleteDate(removeDateId).then((response) => {
                setRemoveDateId(null);
                window.location.reload()
            });
        }
    };

//handle delete date recommendation if clicked
    const handleDeleteDateButton = (dateId) => {
        setRemoveDateId(dateId);
    }

// removes date if id selected
    useEffect(() => {
        deleteDate(removeDateId);
    }, [removeDateId])

// post to database if a date was completed 
    const updateDate = (updateDateId, dateData) => {
        if (updateDateId !== null) {
            api.updateDate(updateDateId, dateData).then((response) => {
                setUpdateDateId(null);
            })
        }
    }

// sends post id updateDateID is changed
    useEffect(() => {
        updateDate(updateDateId, {
            "date_completed": true
        })
    }, [updateDateId])

//adds new friends to list 
    const createNewFriend = (userId,newFriendData) => {
        if (userId) {
            api.postFriend(userId, newFriendData).then((newFriend) => {
                setFriendsList(friendsList => [...friendsList, newFriend])
            })
            .catch((error) => {
                console.log(error.response.data);
                console.log(error.response.headers);
                console.log(error.response.status);
                console.log(error.response.statusText);
            });
        }
    }

//makes a list of all the interest clicked 
    const handleInterestClick = (e) => {
        setInterestSelected(true);
        const interest = e.target.value;
        let newSelectedInterests = [...newFriendInterest];
        
        if (e.target.checked) {
            newSelectedInterests.push(interest);
        } else {
            const index = newSelectedInterests.indexOf(interest);
            newSelectedInterests.splice(index, 1);
        }
        setNewFriendInterest(newSelectedInterests);
    } 
    
//edits current interest list
    const handleUpdateInterestClick = (e, currentInterest) => {
        setInterestSelected(true);
        console.log(currentInterest)
        const interest = e.target.value;
        let newSelectedInterests = [...currentInterest];
        
        if (e.target.checked) {
            newSelectedInterests.push(interest);
            console.log(newSelectedInterests)
        } else {
            const index = newSelectedInterests.indexOf(interest);
            newSelectedInterests.splice(index, 1);
            console.log(newSelectedInterests)
        }
        setNewFriendInterest(newSelectedInterests);
} 

// changes add friend button from add friend to cancel 
    function toggleClick(e) {
        e.preventDefault();
        setfriendForm(value => !value);
        addFriendButton === 'Cancel' ? setAddFriendButton('Add Friend') : setAddFriendButton('Cancel')
    };

    return (
        <>
        <header>
            <h1 className='header'>The Date.</h1>
        </header>
            <Navigation
            authenticated={authenticated}
            userObject={userObject}
            />
        <div className="friends-body">
            <div>
                { user ? (<h2>{user.name}'s Friends </h2>) : (<div></div>)
                }
                {friendsList.length > 0 ? (
                    friendsList.map((friend) => {
                        const interestList = friend.interest;
                        const interestString = interestList.join(", ");
                        return (  
                        <>
                            <div className="box" key={friend.id} > 
                                {friend.name}
                                <br />
                                    {friend.location}
                                
                                <br/>
                                Interest: {interestString}
                                <br/>
                                    <section className="friend-button">
                                            <Popup trigger= {<button className="component-button" key={friend.id} onClick={() => {
                                                    handleDateHistoryButton(friend.dates);
                                                }}> 
                                                Date Ideas: {friend.dates.length}
                                            </button>} modal nested>
                                                {close => (
                                                    <div className='modal'>
                                                        <h3>
                                                            Dates Ideas for {friend.name}
                                                        </h3>
                                                        <div>
                                                            {handleDateHistoryButton(friend.dates)}
                                                        </div>
                                                        <button className="component-button" onClick={() => close()}>
                                                                    Close
                                                        </button>
                                                    </div>
                                                )}
                                            </Popup>
                                    </section>
                                        <div className="friend-button">
                                            <br/>
                                            <Popup trigger=
                                                {<button className="link-button" onClick={(e) => { e.preventDefault()
                                                    
                                            }}> 
                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="black" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                            </svg>
                                            </button>} modal nested>
                                                {close => (
                                                    <div className='modal'>
                                                        <div>
                                                            Update Friend Here
                                                            <form className="friend-updateform">
                                                                <label>Name: </label>
                                                                <input className='friend-input' value={newFriendName} onChange={(e) => setNewFriendName(e.target.value)} type="name" placeholder={friend.name} id="friendname" name="friendname" />
                                                                <br />
                                                                <label htmlFor="city" className="label">
                                                                    Location: 
                                                                    {autocompleteErr && (
                                                                    <span className="inputError">{autocompleteErr}</span>
                                                                    )}
                                                                        </label>
                                                                        <input
                                                                            list="places"
                                                                            type="text"
                                                                            id="city"
                                                                            name="city"
                                                                            onChange={handleEditCityChange}
                                                                            value={editFriendLocation}
                                                                            placeholder={friend.location}
                                                                            pattern={autocompleteCities.join("|")}
                                                                            autoComplete="off"
                                                                        />
                                                                        <datalist id="places">
                                                                            {autocompleteCities.map((city, i) => (
                                                                            <option key={i}>{city}</option>
                                                                            ))}
                                                                        </datalist>
                                                                        <span className="placesAutocomplete__hint">
                                                                        </span>
                                                                        <br/>
                                                                <label>Interests: </label>
                                                                {interests.map((interest) => (
                                                                    <label key={interest}>
                                                                    <br/>
                                                                    <input 
                                                                    type="checkbox" 
                                                                    name="interests" 
                                                                    value={interest} 
                                                                    onClick={(e) => {
                                                                        handleUpdateInterestClick(e, friend.interest);
                                                                    }}
                                                                    defaultChecked={friend.interest.includes(interest)}
                                                                    />
                                                                    {interest}
                                                                    </label>                           
                                                                ))}
                                                                <br />
                                                                <button className="component-button" onClick={(e) => {
                                                                    e.preventDefault();
                                                                    editFriend(friend.id);
                                                                    //setUserId(friend.user_id);
                                                                    //setauthenticated(true);
                                                                    }}>
                                                                    Submit
                                                                </button>
                                                                <br />
                                                                <button className="component-button" onClick={() => close()}>
                                                                    Cancel
                                                                </button>
                                                            </form>
                                                        </div>
                                                    </div>
                                                )}
                                            </Popup>
                                            <br/>
                                            <button className="link-button" onClick={() => {
                                                handleDeleteButton(friend.id)
                                            }}> 
                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="red" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                                            </svg>
                                            </button>
                                        </div>
                                    </div>
                    </>
                        );
                    })
                    ) : (
                    <p>No friends, add a friend now.</p>
                    )}
            </div>
            <br/>
            <button className="component-button" onClick={toggleClick}>{addFriendButton}</button>
            <br/>
            <div>
                {friendForm ? (
                        <form className="friend-form">
                        <label>Name: </label>
                        <input className='friend-input' value={newFriendName} onChange={(e) => setNewFriendName(e.target.value)} type="name" placeholder="Enter name" id="friendname" name="friendname" required />
                        <br/>
                        <label>Interests: </label>
                        {interests.map((interest) => (
                            <label key={interest}>
                            <br/>
                            <input type="checkbox" name="interests" value={interest} onClick={handleInterestClick}/>
                            {interest}
                            </label>                           
                        ))}
                        <br />
                        <label htmlFor="city" className="label">
                            Location: 
                            {autocompleteErr && (
                            <span className="inputError">{autocompleteErr}</span>
                            )}
                        </label>
                        <input
                            list="places"
                            type="text"
                            id="city"
                            name="city"
                            onChange={handleCityChange}
                            value={newFriendLocation}
                            required
                            pattern={autocompleteCities.join("|")}
                            autoComplete="off"
                        />
                        <datalist id="places">
                            {autocompleteCities.map((city, i) => (
                            <option key={i}>{city}</option>
                            ))}
                        </datalist>
                        <span className="placesAutocomplete__hint">
                        </span>
                        <br />
                        <button className="component-button" onClick={newFriend}>
                            Submit
                        </button>
                        <br />
                        <br />
                        </form>
                    ) : 
                    (<div></div>)}
            </div>
        </div>
        </>
        );
}


