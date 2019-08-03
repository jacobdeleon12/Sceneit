import React, { Component } from "react";
import API from "../utils/API";

import { Col, Row, Container } from "../components/Grid";
// import Userwrap from "../components/Userwrap";
import { MainNav } from "../components/Nav";
import Footer from "../components/Footer";
import { Iframe, Title, Thumbnail } from "../components/Iframe";
import { DeleteBtn } from "../components/Buttons/VideoBtns";
import { Tile } from "../components/Tile";
import Wrapper from "../components/Wrapper";

//NPM alert options
import { positions, Provider, transitions } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
const options = {
  timeout: 3000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALEs
};

const loggedInUser = window.sessionStorage.getItem("loggedInUser");
const user = JSON.parse(window.sessionStorage.getItem("UserInfo"));

class User extends Component {
  state = {
    user: user,
    savedVideos: [],
    videos: [],
    movieVideos: [],
    keyCard: ""
  };

  componentDidMount() {
    this.loadUser();
    this.loadVideos();
    // console.log(user);
  }

  loadUser = () => {
    console.log(loggedInUser);
    this.setState({ user: user });
  };

  loadVideos = () => {
    API.getUser(loggedInUser)
      .then(res => {
        // console.log(res.data.savedVideos);
        this.setState({ savedVideos: res.data.savedVideos });
      })
      .catch(err => console.log(err));
  };

  deleteVideo = _id => {
    API.deleteVideo(this.state.user.savedVideos._id, {
      useFindAndModify: false
    })
      .then(res => this.loadUser())
      .catch(err => console.log(err));
  };
  // =======================================
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // =======================================
  handleDeleteFormSubmit = (event, video) => {
    event.preventDefault();
    const vStr = video.vStr;
    const vName = video.vName;
    console.log(vStr);
    console.log(vName);

    API.deleteVideo(user.googleId, {
      $pull: {
        savedVideos: { vStr }
      }
    })
      .then(res => {
        window.location.reload();
        console.log("deleted video");
      })
      .catch(err => console.log(err));
  };

  constructor() {
    super();
    this.state = {};
  }

  determineItemStyle(video, i) {
    const isItemSelected = this.state.selectedItem === video.vStr;
    return isItemSelected ? (
      <Iframe name={video.vName} url={video.vStr} id={i} />
    ) : (
      <Thumbnail img={video.vImg} id={i} />
    );
  }

  renderVideos = data => {
    return (
      <ul>
        {data.map((video, i) => (
          <Tile key={i}>
            <Title title={video.vName} />
            <br />
            <div
              className="sml_iframe_container sml_iframe"
              onMouseEnter={() => {
                this.setState({ selectedItem: video.vStr });
              }}
              onMouseLeave={() => {
                this.setState({ selectedItem: "" });
              }}
            >
              {this.determineItemStyle(video, i)}
            </div>
            <br />
            <Provider template={AlertTemplate} {...options}>
              <DeleteBtn
                value={video.vStr}
                key={`${video.vStr}-delete`}
                id={video.vName}
                name="deleteVid"
                onClick={event => {
                  this.handleSaveFormSubmit(event, video);
                }}
              />
            </Provider>
          </Tile>
        ))}
      </ul>
    );
  };

  render() {
    // console.log(this.state.user);
    // console.log(this.state.savedVideos);

    // console.log(loggedInUser);
    // console.log(user);

    if (this.state.user) {
      return (
        <div>
          <MainNav />
          <Container fluid>
            <Row>
              <Col size="md-12">
                <div className="row justify-content-center">
                  <Col size="md-2">
                    <Container fluid>
                      <img src={this.state.user.imageUrl} alt="googleImage" />
                    </Container>
                  </Col>
                  <Col size="md-3">
                    <Container fluid>
                      <Row fluid>
                        <Col size="md-12">
                          <h4>
                            {this.state.user.givenName +
                              " " +
                              this.state.user.familyName}
                          </h4>
                        </Col>
                      </Row>
                      <Row fluid>
                        <Col size="md-12">
                          <h5>{this.state.user.email}</h5>
                        </Col>
                      </Row>
                    </Container>
                  </Col>
                </div>
              </Col>
            </Row>
            <div>
              {this.state.savedVideos !== undefined ? (
                <div className="mainWraper">
                  <h3 className="">Saved Videos</h3>
                  <Wrapper ID="saved">
                    {this.renderVideos(this.state.savedVideos)}
                  </Wrapper>
                </div>
              ) : this.state.savedVideos === undefined ? (
                <h5>Loading...</h5>
              ) : (
                <h5>You have no saved videos. Womp Womp!</h5>
              )}
            </div>
          </Container>
        </div>
      );
    } else {
      return (
        <div>
          <MainNav />
          <Container fluid>
            <h5>
              You must be logged in to visit the Profile page. Womp Womp! Click{" "}
              <a href="https://sceneitapp.herokuapp.com/">here</a> to visit the
              login page.
            </h5>
          </Container>
          <Footer />
        </div>
      );
    }
  }
}

export default User;
