import React, { useState, useEffect } from "react";
import "./App"
import { Link } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Login } from "./Login";
import { Friends } from "./Friends";
import "./Homepage.css"

let friends = [
    {"id":1, 
    "name": "Chaneil", 
    "location": "Brooklyn, NY", 
    "interest": ["Nightlife", "Historical", "Restaurants"],
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
    "interest": ["Beach", "Historical", "Restaurants"],
    "date history": [{"date": "1/19/23", "place": "Italy", "review":"how was the date?"},
    {"date": "1/14/23", "place": "Riis Beach", "review":"how was the date?"}]}
]

export const Homepage= (props) => {

    const [friendsList, setFriendsList] = useState(friends);
    const [friendNames, setFriendNames] = useState([]);
    const [planDateForm, setPlanDateForm] = useState(false);
    const [planDateButton, setPlanDateButton] = useState('Plan Date');
    const [pickInterestForm, setPickInterestForm] = useState(false);
    const [pickedFriend, setPickedFriend]= useState('')

    useEffect(() => {
    }, [friendsList, planDateForm, pickInterestForm]);

    function toggleClick(e) {
        e.preventDefault();
        setPlanDateForm(value => !value);
        setPickInterestForm(false);
        
        planDateButton === 'Cancel' ? setPlanDateButton('Plan Date') : setPlanDateButton('Cancel')
        setFriendNames(friendsList.map((friend) => friend.name));
    };

    function handleInterestClicked(e) {
        e.preventDefault();
        setPickInterestForm(value => !value);
        setPickedFriend(e.target.value)
    }

    function displayInterest(nameOfFriend) {
        if (pickInterestForm === false) {
            return (
                <div></div>
            )
        } else {
            const selectedFriend = friendsList.filter(friend =>
                friend.name === nameOfFriend)[0];
            return (
                <form>
                <label>Pick an Interest:</label>
                {selectedFriend.interest.map((interest) => (
                    <label key={interest}>
                        <br/>
                        <input type="radio" name="interest" value={interest} />
                        {interest}
                    </label>
                ))}
                <button className="component-button">Let's Go!</button>
            </form>
        );}
}

    return (
        <>
            <Navigation />
                <div className="Homepage-body">
                    <div>
                        <h3>Hi {props.name}, are you ready to plan a date?</h3>
                        <p>{new Date().toLocaleString() + ""}</p>
                    </div>
                    <div>
                        <h4>Recent Dates</h4>
                        {friendsList.map((friend) => {
                        return (                        
                            <div className="box" key={friend.id} >
                                {friend["date history"].length ? 
                                friend["date history"].map((history, index) => (
                                    <div key={index}>
                                        You went to {history["place"]} on {history["date"]} with {friend.name}
                                    </div>
                                )): 
                                <div>
                                </div>}
                            </div>
                        )
                    })}
                    </div>
                    <br/>
                    <button className="component-button" onClick={toggleClick}>{planDateButton}</button>
                    <br/>
                    {planDateForm ? (
                        <form>
                        <label>Who would you like to go on a date with?</label>
                        <div>
                        {friendNames.map((name) => (
                            <label key={name}>
                            <input type="radio" name="friend" value={name} onClick={handleInterestClicked}/>
                            {name}
                            <br/>
                            </label>                           
                        ))}
                        {pickInterestForm ? (
                        displayInterest(pickedFriend)
                        ) :
                        (<div></div>)}
                        </div>
                    </form>
                    ) :
                    (<div></div>)}
                </div>
            </>
        );
    };

