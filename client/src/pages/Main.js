import React, { Component } from "react";
import { Container } from "../components/Grid";
// import API from "../utils/API";
import { MainNav } from "../components/Nav";
import Footer from "../components/Footer";
import MainWrapper from "../components/MainWrapperVideos";
// import SearchWrapper from "../components/SearchWrapperVideos";


const loggedInUser = window.sessionStorage.getItem("loggedInUser");
const user = JSON.parse(sessionStorage.getItem("UserInfo"));

class Main extends Component {
  state = {
    user: [],
    savedVideos: [],
    vidStateID: "",
  };

  componentDidMount() {
    this.loadUser();
  };

  // =======================================
  loadUser = () => {
    console.log(loggedInUser);
    this.setState({ user: user });
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {

    console.log(this.state.user);

    return (
      <div>
        <MainNav />
        <Container fluid>
          {this.state.user ? (
            <MainWrapper />
          ) : (
              <h5>
                You must be logged in to visit this page. Womp Womp! Click
              <a href="https://sceneitapp.herokuapp.com/">here</a> to visit the login page.
            </h5>
            )}
        </Container>
        <Footer />
      </div>
    );
  }
}

export default Main;
