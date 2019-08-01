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
    vidStateID: "",
    keyCard: ""
  };

  componentDidMount() {
    // this.setState({ keyCard: document.cookie.split("profId=")[1] })
    this.loadUser();

  }
  // =======================================
  loadUser = () => {
    API.getUser(document.cookie.split("profId=")[1])
      .then(res => {
        console.log(res.data);
        this.setState({ user: res.data, savedVideos: res.data.savedVideos, keyCard: document.cookie.split("profId=")[1] });
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

  // =======================================

  // imageSwap = (event, vidURl) => {
  //   console.log("we made it here ");

  //   this.setState({ vidStateID: vidURl });
  //   console.log(this.state);
  // };

  render() {
    console.log(this.state.keyCard);
    console.log(this.state);

    switch (this.state.keyCard) {
      case this.state.user.googleId:
        return (
          <div>
            <NavBar />
            <Container fluid>
              <MainJombo />
              <MainWrapper />
            </Container>
            <Footer />
          </div>
        )

      default:
        return (
          <div>
            <NavBar />
            <Container fluid>
              <h5>You must be logged in to visit this page. Womp Womp! Click <a href="https://sceneitapp.herokuapp.com/">here</a> to visit the login page.</h5>
            </Container>
            <Footer />
          </div>
        )
    }

    // if (this.state.keyCard === this.state.user.googleId) {
    //   return (
    //     <div>
    //       <NavBar />
    //       <Container fluid>
    //         <MainJombo />
    //         <MainWrapper />
    //       </Container>
    //       <Footer />
    //     </div>
    //   );
    // } else if (this.state.keyCard !== this.state.user.googleId) {
    //   return (
    //     <div>
    //       <NavBar />
    //       <Container fluid>
    //         <h5>You must be logged in to visit the Main page. Womp Womp! Click <a href="https://sceneitapp.herokuapp.com/">here</a> to visit the login page.</h5>
    //       </Container>
    //       <Footer />
    //     </div>
    //   )
    // }
  }
}

export default Main;
