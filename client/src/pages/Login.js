import React, { Component } from "react";
import { LoginNav } from "../components/Nav";
import Background from "../components/splash";

class Login extends Component {
  render() {
    return (
      <div>
        <LoginNav />
        <Background />
      </div>
    );
  }
}

export default Login;
