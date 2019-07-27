import React, { Component } from "react";
import NavBar from "../components/Nav/index";
import Background from "../components/splash";

import addToDb from "../video";

class Login extends Component {
  render() {
    addToDb();
    return (
      <div>
        <NavBar />
        <Background />
      </div>
    );
  }
}

export default Login;
