import React, { Component } from "react";
import { Container } from "../components/Grid";
import Userwrap from "../components/Userwrap";
import { MainNav } from "../components/Nav";
import Footer from "../components/Footer";

const loggedInUser = window.sessionStorage.getItem("loggedInUser");
const user = JSON.parse(window.sessionStorage.getItem("UserInfo"));

class User extends Component {
  state = {
    user: user,
    savedVideos: [],
    videos: []
    // movieVideos: []
  };

  componentDidMount() {
    this.loadUser();
  };

  loadUser = () => {
    console.log(loggedInUser);
    this.setState({ user: user });
  };
  // =======================================
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    console.log(user);

    return (
      <div>
        <MainNav />
        <Container fluid>
          {loggedInUser ? (
            <Userwrap />
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

export default User;
