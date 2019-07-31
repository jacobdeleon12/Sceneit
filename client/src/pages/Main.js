import React, { Component } from "react";
import { Container } from "../components/Grid";
import API from "../utils/API";
import NavBar from "../components/Nav/MainNav";
import Footer from "../components/footer";
import MainWrapper from "../components/mainWrapperVideos";
import MainJombo from "../components/mainJomboVideos";

class Main extends Component {
  state = {
    user: [],
    savedVideos: [],
    clicked: false,
    vidStateID: ""
  };

  componentDidMount() {
    this.loadUser();
  }
  // =======================================
  loadUser = () => {
    API.getUser(document.cookie.split("profId=")[1])
      .then(res => {
        console.log(res.data);
        this.setState({ user: res.data, savedVideos: res.data.savedVideos });
      })
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // =======================================

  handleSaveFormSubmit = (event, video) => {
    event.preventDefault();
    // this.refs.savebtn.setAttribute("disabled", "disabled");
    console.log("event", event);

    const vStr = video.url;
    const vName = video.name;
    const vImg = video.bigImg;
    console.log(video);

    API.saveVideo(this.state.user._id, {
      $push: {
        savedVideos: { vStr, vName, vImg }
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
