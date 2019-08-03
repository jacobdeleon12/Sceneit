import React, { Component } from "react";
import { LoginNav } from "../components/Nav";
import Background from "../components/Splash";
import Footer from "../components/Footer";

class Login extends Component {
  render() {
    return (
      <div>
        <LoginNav />
        <Background />
        <Footer />
      </div>
    );
  }
}

export default Login;
