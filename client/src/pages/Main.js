import React, { Component } from "react";
import { Container } from "../components/Grid";
import API from "../utils/API";
import NavBar from "../components/Nav/MainNav";
import Footer from "../components/footer";
import MainWrapper from "../components/mainWrapperVideos";
import MainJombo from "../components/mainJomboVideos";

class Main extends Component {
  state = {
    savedVideos: [],
    clicked: false,
    vidStateID: ""
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // =======================================

  handleSaveFormSubmit = event => {
    event.preventDefault();
    // this.refs.savebtn.setAttribute("disabled", "disabled");
    console.log("event", event);

    const vStr = event.target.value;
    const vName = event.target.id;
    console.log(event.target.value);
    console.log(event.target.id);

    API.saveVideo(this.state.user._id, {
      $push: {
        savedVideos: { vStr, vName, clicked: true }
      }
    })
      .then(response => {
        console.log(response);

        this.setState({
          savedVideos: response.data.savedVideo
        });
      })
      .catch(err => console.log(err));

    event.target.disabled = true;
  };

  // imageSwap = (event, vidURl) => {
  //   console.log("we made it here ");

  //   this.setState({ vidStateID: vidURl });
  //   console.log(this.state);
  // };

  render() {
    return (
      <div>
        <NavBar />
        <Container fluid>
          <MainJombo />
          <MainWrapper />
        </Container>
        <Footer />
      </div>
    );
  }
}

export default Main;
