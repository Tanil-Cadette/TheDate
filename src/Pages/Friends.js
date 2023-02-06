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
            .catch((api.logErr))
};


export const Friends = (props) => {
    const [friendForm, setfriendForm] = useState(false);
    const [addFriendButton, setAddFriendButton] = useState('Add Friend')
    const [newFriendName, setNewFriendName] = useState('');
    const [newFriendLocation, setNewFriendLocation] = useState('');
    const [newFriendInterest, setNewFriendInterest] = useState([]);
    const [interestSelected, setInterestSelected] = useState(false);
    const [friendsList, setFriendsList] = useState([]);
    const [removeFriendId, setRemoveFriendId] = useState(null);
    const interests= ["Sights", "Beach", "Park", "Historical", "Nightlife", "Restaurant", "Shopping"]

//updates the friend list
    const refreshFriendsList = () => {
        api.getAllFriends().then((allFriends) =>{
            setFriendsList(allFriends);
        })
    }
    useEffect(refreshFriendsList, []);

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

//edits friend info
    const editFriendData = (friendData, id) => {
        api.updateFriend(friendData, id).then((response) => {
            console.log(friendData);
                })
        }
    
//patch friend info after edit
function editFriend(friend_id) {
    let friendData = {};
    if (newFriendName) friendData['name'] = newFriendName;
    if (newFriendLocation) friendData['location'] = newFriendLocation;
    if (newFriendInterest.length > 0) friendData['interest'] = newFriendInterest;
    console.log('newFriendName:', newFriendName);
    console.log('newFriendLocation:', newFriendLocation);
    console.log('newFriendInterest:', newFriendInterest);
    editFriendData(friendData, friend_id)
    .then(refreshFriendsList)
}

//gets one friends list of dates

//handle date history displayes
    const handleDateHistoryButton = (friend) => {
        const datesList = friend.dates
        if (datesList.length > 0 ) {
            return datesList.map(date => {
                return <div className="box" key={date.id}>
                    {date.place}
                    <br />
                    {date.review}
                    <br />
                    {date.completed}
                    </div>;
            });
        } else {
            return <div>No Dates yet!</div>;
        }
    } 


//handle delete button clicked
    const handleDeleteButton = (friendId) => {
        setRemoveFriendId(friendId);
    }
    
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


// removes friend if id selected
    useEffect(() =>{
        deleteFriend(removeFriendId);
    }, [removeFriendId]);

// changes add friend button from add friend to cancel 
    function toggleClick(e) {
        e.preventDefault();
        setfriendForm(value => !value);
        addFriendButton === 'Cancel' ? setAddFriendButton('Add Friend') : setAddFriendButton('Cancel')
    };

// post new friend to database after submit is clicked
    function newFriend(e) {
        e.preventDefault();
        if (newFriendName === "" || newFriendLocation === "" || newFriendInterest.length === 0) {
            if(newFriendName === "") alert("Please enter a name")
            if(newFriendLocation === "") alert("Please enter a location")
            if(newFriendInterest.length === 0) alert("Please select at least one interest")
            return;
        }
        console.log('newFriendName:', newFriendName);
        console.log('newFriendLocation:', newFriendLocation);
        console.log('newFriendInterest:', newFriendInterest);
        createNewFriend({
                'name': newFriendName,
                'location': newFriendLocation,
                'interest': newFriendInterest
            });
        setfriendForm(false);   
        setAddFriendButton('Add Friend') 
        window.location.reload()
    };

    return (
        <>
            <Navigation />
        <div className="friends-body">
            <div>
                <h3>{props.name}'s Friends </h3>
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
                                                Dates Count: {friend.dates.length}
                                            </button>} modal nested>
                                                {close => (
                                                    <div className='modal'>
                                                        <h3>
                                                            Dates with {friend.name}
                                                        </h3>
                                                        <div>
                                                            {handleDateHistoryButton(friend)}
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
                                                                <label>Location: </label>
                                                                <input className="location-input" value={newFriendLocation} onChange={(e) => setNewFriendLocation(e.target.value)} type="location" placeholder={friend.location} id="friendlocation" name="friendlocation"/>
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
                        <br />
                        <label>Location: </label>
                        <input className="location-input" value={newFriendLocation} onChange={(e) => setNewFriendLocation(e.target.value)} type="location" placeholder="What city is friend located in?" id="friendlocation" name="friendlocation" required />
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

// disabled={!interestSelected}

