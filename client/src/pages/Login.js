import React, { Component } from "react";
import {
  // Col, 
  Row,
  Container
} from "../components/Grid";
import NavBar from "../components/Nav/index";
import Background from "../components/splash";


class Login extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Background/>
      </div>
    );
  }
}

export default Login;
