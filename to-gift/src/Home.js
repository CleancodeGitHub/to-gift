import React, { useState } from "react";
import "./App.css";
import db from "./firebase";

import {
  NavLink as Link,
} from "react-router-dom";

function Home() {
  const [whoParty, setWhoParty] = useState("");
  const [partyDate, setPartyDate] = useState("");
  const [listkey, setListkey] = useState("");

  //handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    //create a key in firebase database
    const giftKey = db.push().key;

    const updates = {};
    updates[giftKey] = {
      whoParty: whoParty,
      partyDate: partyDate,
    };
    //pushing user input to firebase
    db.update(updates);

    setWhoParty("");
    setPartyDate("");
    setListkey(giftKey);
  };

  // get party info from database

  return (
    <div className="Home">
      <h2 className="paragraph">the gift list 😎+🎁+🍰</h2>
      <div className="paragraph">
      <span className="parg">
          Choosing the perfect gift is fun. Bringing the same gift as someone
          else is not.  <br />Create a list to see what friends are bringing to avoid
          duplicates or to create themed bundle.
        </span>
      </div>

      <div className="gift_main">
        <form onSubmit={handleSubmit} className="home_form">
          <div className="gift_main_inner">
            <div>
              <span className="headings">Who is recieving the gift?</span>
              <span>
                <input
                  type="text"
                  placeholder="eg.Name"
                  value={whoParty}
                  onChange={(e) => setWhoParty(e.target.value)}
                />
              </span>
            </div>

            <div>
              <span className="headings">When is the party?</span>
              <span>
                <input
                  type="date"
                  value={partyDate}
                  onChange={(e) => setPartyDate(e.target.value)}
                />
              </span>
            </div>
          </div>
          <div>
            <button className="btn">
              CLICK HERE TO DISPLAY AND SHARE LINK
            </button>
          </div>
          <div className="linkShare">
            {listkey !== "" && ( //essentially an if statement - ternary operator // if this.state.listkey is undefined, it returns nothing, is it is , returns the a tag below
              <Link to={`${listkey}`}>
                <p className="linkText">
                  {window.location.href}
                  {listkey}
                </p>
              </Link>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Home;
