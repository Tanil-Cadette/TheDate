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
    
    getFriend: (friend_id) =>
        axios
            .get(`${api.baseUrl}/friends/${friend_id}`)
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
            .catch(api.logErr)
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
    const [dateHistory, setDateHistory] = useState(false);
    const interests= ["Sights", "Beach", "Park", "Historical", "Nightlife", "Restaurant", "Shopping"]

    const refreshFriendsList = () => {
        api.getAllFriends().then((allFriends) =>{
            setFriendsList(allFriends);
        })
        console.log(friendsList);
    }
    useEffect(refreshFriendsList, []);

    const refreshDatesList = (friend_id) => {
        api.getFriendAndDates(friend_id).then((allDates) =>{
            setSelectedFriendId(friend_id);
            setFriendDates(allDates.date);
        })
        console.log(friendDates);
    }

    useEffect(() => {
        if (selectedFriendId) {
            refreshDatesList(selectedFriendId);
        }
    }, [selectedFriendId]);
    

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
    
    const handleDateHistoryClicked = (friendId) => {
        refreshDatesList(friendId);
        if (friendDates && selectedFriendId === friendId) {
            setDateHistory(true);
        } else {
            setDateHistory(false)
        }
    };

    function toggleClick(e) {
        e.preventDefault();
        setfriendForm(value => !value);
        addFriendButton === 'Cancel' ? setAddFriendButton('Add Friend') : setAddFriendButton('Cancel')
    };

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
                            <button className="component-button" onClick={() => handleDateHistoryClicked(friend.id)}> {dateHistoryButton} </button>
                                { dateHistory ? (
                                    <div>
                                        There is History
                                    </div>
                                ): (
                                    <div>
                                    </div>
                                )}
                            </section>
                        <div className="friend-button">
                            <br/>
                            <button className="component-button"> Edit </button>
                            <br/>
                            <button className="component-button"> Remove </button>
                        </div>
                        </div>
                    </>
                        );
                    })
                    ) : (
                    <p>Friend list is empty.</p>
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

