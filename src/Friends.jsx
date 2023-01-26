import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Login } from "./Login";
import { Homepage } from "./Homepage";
import { Navigation } from "./Navigation";
import "./App"
import "./Friends.css"

let friends = [
    {"id":1, 
    "name": "Chaneil", 
    "location": "Brooklyn, NY", 
    "interest": ["Nightlife", "Historical"],
    "date history": [{"date": "1/10/23", "place": "Moma", "review":"how was the date?"},
                    {"date": "1/14/23", "place": "Jones Beach", "review":"how was the date?"}]},
    {"id": 4, 
    "name": "Karina", 
    "location": "Houston, TX", 
    "interest": ["Beach", "Sights"],
    "date history": []},
    {"id": 3, 
    "name": "Remi", 
    "location": "Miami, Fl", 
    "interest": ["Beach", "Sights"],
    "date history": [{"date": "1/19/23", "place": "Italy", "review":"how was the date?"},
    {"date": "1/14/23", "place": "Riis Beach", "review":"how was the date?"}]}
]

export const Friends = (props) => {
    const [friendForm, setfriendForm] = useState(false);
    const [addFriendButton, setAddFriendButton] = useState('Add Friend')
    const [newFriendName, setNewFriendName] = useState('');
    const [newFriendLocation, setNewFriendLocation] = useState('');
    const [newFriendInterest, setNewFriendInterest] = useState([]);
    const [interestSelected, setInterestSelected] = useState(false);
    const [newFriendDates, setNewFriendDates] = useState([]);
    const [friendsList, setFriendsList] = useState(friends);

    const interests= ["Sights", "Beach", "Park", "Historical", "Nightlife", "Restaurant", "Shopping"]

    
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

    useEffect(() => {
    }, [friendsList, friendForm]);


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
        let newFriend= {
            'id': Date.now(),
            'name': newFriendName,
            'location': newFriendLocation,
            'interest': newFriendInterest,
            'date history': newFriendDates};

        setFriendsList(friendsList => [...friendsList, newFriend])  
        setNewFriendName('');
        setNewFriendLocation('');
        setNewFriendInterest([]);
        setNewFriendDates([]);
        setfriendForm(false);   
        setAddFriendButton('Add Friend')
    }

    return (
        <>
            <Navigation />
        <div className="friends-body">
            <div>
                <h3>{props.name}'s Friends </h3>
                {friendsList.map((friend) => {
                    const interestList = friend.interest;
                    const interestString = interestList.join(", ");
                    return (  
                        <div className="box" key={friend.id} > 
                            Name: {friend.name} 
                            <br />
                            Location: {friend.location}
                            <br/>
                            Interest: {interestString}
                            <br/>
                            Date History: 
                            {friend["date history"].length ? 
                            friend["date history"].map((history, index) => (
                                <div key={index}>
                                    {history["date"]} {history["place"]} {history["review"]}
                                </div>
                            )): 
                            <div>
                                No dates yet! 
                            </div>
                            
    }
                <div className="friend-button">
                    <br/>
                    <button className="component-button"> Edit </button>
                    <br/>
                    <button className="component-button"> Remove </button>
                </div>
                        </div>
                    )
                    })}
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

