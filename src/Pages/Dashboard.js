import React, { useState, useEffect } from "react";
import "../App"
import { Link } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Login } from "./Login";
import { Friends } from "./Friends";
import Userfront from "@userfront/react";
import "./Dashboard.css"
import axios from "axios";


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
            .catch(api.logErr)
}

export const Dashboard= (props) => {

    const userData = JSON.stringify(Userfront.user, null, 2);

    const [friendsList, setFriendsList] = useState([]);
    const [friendNames, setFriendNames] = useState([]);
    const [planDateForm, setPlanDateForm] = useState(false);
    const [planDateButton, setPlanDateButton] = useState('Plan Date');
    const [pickInterestForm, setPickInterestForm] = useState(false);
    const [pickedFriend, setPickedFriend]= useState('')
    const [pickedInterest, setPickedInterest] = useState('');

    const refreshFriendsList = () => {
        api.getAllFriends().then((allFriends) =>{
            setFriendsList(allFriends);
        })
    }
    useEffect(refreshFriendsList, []);

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

    function handleLetsGo(e) {
        
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
                    <div>

                    </div>
                </div>
            </>
        );
    };

//<div>
// <h4>Recent Dates</h4>
// {friendsList.map((friend) => {
// return (                        
//     <div className="box" key={friend.id} >
//         {friend["date history"] ? 
//         friend["date history"].map((history, index) => (
//             <div key={index}>
//                 You went to {history["place"]} on {history["date"]} with {friend.name}
//             </div>
//         )): 
//         <div>
//         </div>}
//     </div>
// )
// })}
// </div> 