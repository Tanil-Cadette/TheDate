import React, { useState } from "react";
import "./App"
import { Link } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Login } from "./Login";
import { Friends } from "./Friends";
import "./Homepage.css"



export const Homepage= (props) => {
    return (
        <>
                <body className="Homepage-body">
                    <Navigation />
                    <div>
                        <h3>Hi {props.name}, are you ready to plan a date?</h3>
                        <p>{new Date().toLocaleString() + ""}</p>
                    </div>
                    <div>
                        <h4>Past Dates</h4>
                        <section>
                            <li>
                                1/3/23: Carbone Restaurant, NYC with Chaneil
                            </li>
                            <li>
                                1/6/23: MoMA, NYC with Remi
                            </li>
                        </section>
                    </div>
                    <button className="component-button">Plan Date</button>
                </body>
            <footer className="Homepage-footer">
            </footer>
            </>
        );
    };

