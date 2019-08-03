import React, { Component } from "react";
import { Container } from "../components/Grid";
import API from "../utils/API";
import { MainNav } from "../components/Nav";
import Footer from "../components/Footer";
import MainWrapper from "../components/MainWrapperVideos";

class Main extends Component {
  state = {
    user: [],
    savedVideos: [],
    vidStateID: "",
    keyCard: ""
  };

  componentDidMount() {
    this.loadUser();
  }
  // =======================================
  loadUser = () => {
    API.getUser(document.cookie.split("profId=")[1])
      .then(res => {
        console.log(res.data);
        this.setState({
          user: res.data,
          savedVideos: res.data.savedVideos,
          keyCard: document.cookie.split("profId=")[1]
        });
      })
      .catch(err => console.log(err));
    console.log(document.cookie);
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <div>
        <MainNav />
        <Container fluid>
          {this.state.keyCard ? (
            <MainWrapper />
          ) : (
            <h5>
              You must be logged in to visit this page. Womp Womp! Click
              <a href="https://sceneitapp.herokuapp.com/">here</a> to visit the
              login page.
            </h5>
          )}
        </Container>
        <Footer />
      </div>
    );
  }
}

export default Main;
