import React, { Component } from "react";
import NavBar from "../components/Nav/index";
import Background from "../components/splash";
import Footer from "../components/footer";
import func from "../video";

class Login extends Component {
  render() {
    func();

    return (
      <div>
        <NavBar />
        <Background />
        <Footer />
      </div>
    );
  }
}

export default Login;
