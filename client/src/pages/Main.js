import React, { Component } from "react";
import { Container } from "../components/Grid";
import { MainNav } from "../components/Nav";
import Footer from "../components/Footer";
import MainWrapper from "../components/MainWrapperVideos";

const loggedInUser = window.sessionStorage.getItem("loggedInUser");
const user = JSON.parse(sessionStorage.getItem("UserInfo"));

class Main extends Component {
  state = {
    user: [],
    savedVideos: [],
    vidStateID: ""
  };

  componentWillMount() {
    this.setState({ user: user });
  }

  componentDidMount() {
    this.loadUser();
  }

  // =======================================
  loadUser = () => {
    // console.log(loggedInUser);
    this.setState({ user: user });
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    // console.log(user);
    // console.log(this.state);

    return (
      <div>
        <MainNav />
        <Container fluid>
            <MainWrapper />
        </Container>
        <Footer />
      </div>
    );
  }
}

export default Main;
