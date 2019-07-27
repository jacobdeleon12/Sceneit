import React, { Component } from "react";
import NavBar from "../components/Nav/index";
import Background from "../components/splash";

import func from "../video";

// function addEntry() {
//   // Parse any JSON previously stored in allEntries
//   var existingEntries = JSON.parse(localStorage.getItem("allEntries"));
//   if(existingEntries == null) existingEntries = [];
//   localStorage.setItem("entry", JSON.stringify(addToDb));

//   // Save allEntries back to local storage
//   existingEntries.push(entry);
//   localStorage.setItem("allEntries", JSON.stringify(existingEntries));
// };

class Login extends Component {
  render() {
    func();

    return (
      <div>
        <NavBar />
        <Background />
      </div>
    );
  }
}

export default Login;
