import React, { useState, useEffect } from "react";
import { Navigation } from "./Navigation";
import axios from "axios";
import "./Friends.css"
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';


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
    
    postFriend: (friendData) => 
        axios
            .post(`${api.baseUrl}/friends`, friendData)
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

export const Friends = (user) => {
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
    const [datesList, setDatesList] = useState([]);
    const [removeDateId, setRemoveDateId] = useState(null);
    const [updateDateId, setUpdateDateId] = useState(null);
    const interests= ["Sights", "Beach", "Park", "Historical", "Nightlife", "Restaurant", "Shopping"]

//updates the friend list
    const refreshFriendsList = () => {
        api.getAllFriends().then((allFriends) =>{
            setFriendsList(allFriends);
        })
    }
    useEffect(refreshFriendsList, []);

//gets all dates
    const refreshDatesList = () => {
        api.getAllDates().then(allDates => {
        setDatesList(
            allDates.map(date => {
            return { ...date, button: "Go Here?" };
            })
        );
        });
    };
    

    useEffect(refreshDatesList,[]);


// post new friend to database after submit is clicked
    function newFriend(e) {
        e.preventDefault();
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
        if (locationCoordinates.length > 0) {
            createNewFriend({
                'name': newFriendName,
                'location': newFriendLocation,
                'interest': newFriendInterest,
                'location_coords': locationCoordinates
            });
            window.location.reload();
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
        api.updateFriend(friendData, id).then((response) => {
            console.log(friendData);
            refreshFriendsList();
                })
        }
        
//patch friend info after edit
    function editFriend(friendId) {
        let friendData = {};
        if (newFriendName) friendData['name'] = newFriendName;
        if (newFriendInterest.length > 0) friendData['interest'] = newFriendInterest;
        if (editFriendLocation) {
            friendData['location'] = editFriendLocation;
            friendData['location_coords'] = ['0', '0'];
            // updateFindCoords(editFriendLocation, friendData, friendId);
        } 
        editFriendData(friendData, friendId)
            .then(() => 
                refreshFriendsList());
            
    }

//handle date history displays
    const handleDateHistoryButton = (friendId) => {
        if (datesList.length > 0) {
            return datesList.map(date => {
                if (date.friend_id === friendId) {
                    return <div className="box" key={date.id}>
                    {date.place}
                    <br />
                    {date.location}
                    <br />
                    {date.category}
                    <br />
                    {date.rank}
                    <div>
                        <button className="component-button" onClick={() => handleDateCompletedButton(date.id)}>{date.button}</button>
                    </div>
                    <div>
                        <button className="component-button" onClick={() => handleDeleteDateButton(date.id)}>Remove</button>
                    </div>
                    </div>;
                }
            });
        } 
    } 

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

//handle update date button
    const handleDateCompletedButton = (dateId) => {
        setUpdateDateId(dateId);
        setDatesList((prevDatesList) => {
            return prevDatesList.map(date => {
                if (date.id === dateId) {
                    return { ...date, button: "Date Completed"};
                }
                return date;
            });
        });
    }

// sends post id updateDateID is changed
    useEffect(() => {
        updateDate(updateDateId, {
            "date_completed": true
        })
    }, [updateDateId])

//adds new friends to list 
    const createNewFriend = (newFriendData) => {
        api.postFriend(newFriendData).then((newFriend) => {
            setFriendsList(friendsList => [...friendsList, newFriend])
        })
        .catch((error) => {
            console.log(error.response.data);
            console.log(error.response.headers);
            console.log(error.response.status);
            console.log(error.response.statusText);
        });
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
            <Navigation />
        <div className="friends-body">
            <div>
                <h3>{user.name}'s Friends </h3>
                {friendsList.length > 0 ? (
                    friendsList.map((friend) => {
                        const interestList = friend.interest;
                        const interestString = interestList.join(", ");
                        return (  
                        <>
                            <div className="box" key={friend.id} > 
                                Name: {friend.name} 
                                <br />
                                Location: {friend.location}
                                <br/>
                                Interest: {interestString}
                                <br/>
                                    <section className="friend-button">
                                            <Popup trigger= {<button className="component-button" onClick={() => {
                                                    handleDateHistoryButton(friend.id)
                                                }}> 
                                                Date Ideas: {friend.dates.length}
                                            </button>} modal nested>
                                                {close => (
                                                    <div className='modal'>
                                                        <h3>
                                                            Dates Ideas for {friend.name}
                                                        </h3>
                                                        <div>
                                                            {handleDateHistoryButton(friend.id)}
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
                                                {<button className="component-button" onClick={() => {
                                                    
                                            }}> Edit </button>} modal nested>
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
                                                                            *start typing and choose your city from the given options
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
                                                                <button className="component-button" onClick={() => {
                                                                    editFriend(friend.id)
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
                                            <button className="component-button" onClick={() => {
                                                handleDeleteButton(friend.id)
                                            }}> Remove </button>
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
                            *start typing and choose your city from the given options
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


