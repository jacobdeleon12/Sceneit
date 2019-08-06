import React, { Component } from "react";
import { LoginNav } from "../components/Nav";
import Background from "../components/Splash";
import Footer from "../components/Footer";
// import Pulse from "../components/Loading";

class Login extends Component {
  render() {
    return (
      <div>
        <LoginNav />
        <Background />
        {/* <Pulse /> */}
        <Footer />
      </div>
    );
  }
}

export default Login;
