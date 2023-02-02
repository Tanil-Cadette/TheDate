import React, { useState, useEffect } from "react";
import { Navigation } from "./Navigation";
import axios from "axios";
import "./Friends.css"

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
    const [friendDates, setFriendDates] = useState([]);
    const [selectedFriendId, setSelectedFriendId] = useState(null);
    const [removeFriendId, setRemoveFriendId] = useState(null);
    const interests= ["Sights", "Beach", "Park", "Historical", "Nightlife", "Restaurant", "Shopping"]

//updates the friend list
    const refreshFriendsList = () => {
        api.getAllFriends().then((allFriends) =>{
            setFriendsList(allFriends);
        })
    }
    useEffect(refreshFriendsList, []);

//updates one friends list of dates
    const refreshDatesList = (friendId) => {
        if (friendId !== null) {
            api.getFriendAndDates(friendId).then((allDates) =>{
                setFriendDates(allDates.date);
                console.log(allDates.date);
            })
        }};

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

//handle date history button on click
    const handleDateHistoryButton = (friendId) => {
        setSelectedFriendId(friendId);
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

// sets the selected id value to the friend that was clicked 
    useEffect(() => {
        refreshDatesList(selectedFriendId);
    }, [selectedFriendId]);

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
                        const interestString = interestList.join(",");
                        const dateHistoryButton = selectedFriendId === friend.id ? "Hide" : "Date History";
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
                                            <button className="component-button" onClick={() => {
                                                    handleDateHistoryButton(friend.id)
                                                }}> 
                                                {dateHistoryButton} 
                                            </button>
                                                <div>
                                                    {selectedFriendId === friend.id ? (
                                                        <div>Dates</div>
                                                    ) : (<div></div>)}
                                                </div>
                                    </section>
                                        <div className="friend-button">
                                            <br/>
                                            <button className="component-button"> Edit </button>
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
                            <input type="checkbox" name="interests" value={interest} onClick={handleInterestClick} />
                            {interest}
                            </label>                           
                        ))}
                        <br />
                        <button className="component-button" onClick={newFriend} disabled={!interestSelected}>
                            Submit
                        </button>
                        </form>
                    ) : 
                    (<div></div>)}
            </div>
        </div>
        </>
        );
}

