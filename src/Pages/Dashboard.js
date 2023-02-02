import React, { useState, useEffect } from "react";
import "../App"
import { Link } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Login } from "./Login";
import { Friends } from "./Friends";
import Userfront from "@userfront/react";
import "./Dashboard.css"


// function Dashboard() {
//   const userData = JSON.stringify(Userfront.user, null, 2);
//   return (
//     <div>
//       <h2>Dashboard</h2>
//       <pre>{userData}</pre>
//       <button onClick={Userfront.logout}>Logout</button>
//     </div>
//   );
// }

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
    "date": []},
    {"id": 3, 
    "name": "Remi", 
    "location": "Miami, Fl", 
    "interest": ["Beach", "Historical", "Restaurants"],
    "date history": [{"date": "1/19/23", "place": "Italy", "review":"how was the date?"},
    {"date": "1/14/23", "place": "Riis Beach", "review":"how was the date?"}]}
]

export const Dashboard= (props) => {

    const userData = JSON.stringify(Userfront.user, null, 2);

    const [friendsList, setFriendsList] = useState(friends);
    const [friendNames, setFriendNames] = useState([]);
    const [planDateForm, setPlanDateForm] = useState(false);
    const [planDateButton, setPlanDateButton] = useState('Plan Date');
    const [pickInterestForm, setPickInterestForm] = useState(false);
    const [pickedFriend, setPickedFriend]= useState('')
    const [pickedInterest, setPickedInterest] = useState('');

    useEffect(() => {
    }, [friendsList, planDateForm, pickInterestForm]);

    function toggleClick(e) {
        e.preventDefault();
        setPlanDateForm(value => !value);
        setPickInterestForm(false);
        
        planDateButton === 'Cancel' ? setPlanDateButton('Plan Date') : setPlanDateButton('Cancel')
        setFriendNames(friendsList.map((friend) => friend.name));
    };

    function handleFriendClicked(e) {
        if (e.target.checked) {
            setPickedFriend(e.target.value)
            setPickInterestForm(true);
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
                <button className="component-button">Let's Go!</button>
            </form>
        );}

    function handleInterestClicked(e) {
        if (e.target.checked){
            setPickedInterest(e.target.value)
            console.log(e.target.value)
        } else {
            setPickedInterest('')
        }
    }


    return (
        <>
            <Navigation />
                <div className="Homepage-body">
                    <div>
                        <h3>Hi {props.name}, are you ready to plan a date?</h3>
                        <p>{new Date().toLocaleString() + ""}</p>
                    </div>
                    <pre>{userData}</pre>
                    <div>
                        <h4>Recent Dates</h4>
                        {friendsList.map((friend) => {
                        return (                        
                            <div className="box" key={friend.id} >
                                {friend["date history"] ? 
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
                            <input type="radio" name="friend" value={name} onClick={handleFriendClicked}/>
                            {name}
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
                </div>
            </>
        );
    };

