import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Login } from "./Login";
import { Homepage } from "./Homepage";
import { Navigation } from "./Navigation";
import "./App"
import "./Friends.css"


export const Friends = (props) => {
    const [friendForm, setfriendForm] = useState(false);
    const [addFriendButton, setAddFriendButton] = useState('Add Friend')
    const friendsList = [{"id":1, "name": "Chaneil", "location": "Brooklyn, NY", "interest": ["Nightlife", "Historical"]}, 
                        {"id":2, "name": "Karina", "location": "Houston, TX", "interest": ["Beach", "Sights"]}
]
    function toggleClick(e) {
        e.preventDefault();
        setfriendForm(value => !value);
        addFriendButton === 'Cancel' ? setAddFriendButton('Add Friend') : setAddFriendButton('Cancel')
    };

    return (
        <>
            <Navigation />
        <body className="friends-body">
            <div>
                <h3>{props.name}'s Friends </h3>
                <section>
                    {friendsList.map((friend) => (
                        <div key={friend.id} > 
                        Name: {friend.name} 
                        <br />
                        Location: {friend.location}
                        <br/>
                        Interest: {friend.interest}
                        <br/>
                        </div>
                    ))}
                </section>
            </div>
            <br/>
            <button className="component-button" onClick={toggleClick}>{addFriendButton}</button>
            <br/>
                {friendForm ? (
                    <form className="friend-form">
                    <label>Name: </label>
                    <input className='friend-input' type="name" placeholder="Enter name" id="friendname" name="friendname" required />
                    <br/>
                    <label>Location: </label>
                    <input className="location-input" type="location" placeholder="What city is friend located in?" id="friendlocation" name="friendlocation" required />
                    <br/>
                    <h4>Friend's Interest:</h4>
                    <div>
                    <label>
                        Sights <input type="checkbox" value="sights"/>
                    </label> 
                    <br/>
                    <label>
                        Beach <input type="checkbox" value="beach"/>
                    </label> 
                    <br/>
                    <label>
                        Park <input type="checkbox" value="park"/>
                    </label>
                    <br/> 
                    <label>
                        Historical <input type="checkbox" value="historical"/>
                    </label>
                    <br/> 
                    <label>
                        Nightlife <input type="checkbox" value="nightlife"/>
                    </label> 
                    <br/>
                    <label>
                        Restaurant <input type="checkbox" value="restaurant"/>
                    </label>
                    <br/>
                    <label>
                        Shopping <input type="checkbox" value="shopping"/>
                    </label>
                    </div>
                    <br/>
                    <button className="component-button">Submit</button>
                </form>
                ) : 
                (<div></div>)}
        </body>
    </>
        );
}
