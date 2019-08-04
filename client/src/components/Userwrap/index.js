import React from "react";
import API from "../../utils/API";
import Wrapper from "../Wrapper";
import { DeleteBtn } from "../Buttons/VideoBtns";
import { Title, Iframe, Thumbnail } from "../Iframe";
import { Tile } from "../Tile";
import { Col, Row, Container } from "../Grid";
// import { JumboIframe } from "../Iframe";
import "./style.css";

//NPM alert options
import { positions, Provider, transitions } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
const options = {
  timeout: 3000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE
};
const loggedInUser = window.sessionStorage.getItem("loggedInUser");
const user = JSON.parse(sessionStorage.getItem("UserInfo"));
export default class UserWrapper extends React.Component {
  state = {
    // videos: {},
    user: [],
    savedVideos: [],
    vidStateID: "",
    selectedItem: -1
  };

  componentDidMount() {
    this.loadVideos();
    this.loadUser();
  };

  loadUser = () => {
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
        this.setState({ savedVideos: res.data.savedVideos });
        this.forceUpdate(this.loadVideos);
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
                name="delVid"
                onClick={event => {
                  this.handleDeleteFormSubmit(event, video);
                }}
              />
            </Provider>
          </Tile>
        ))}
      </ul>
    );
  };

  isEmpty = obj => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  };

  render() {

    return (
      <div>
        <Row>
          <Col size="md-12">
            <div className="row justify-content-center">
              <Col size="md-2">
                <Container fluid>
                  <img src={user.imageUrl} alt="googleImage" />
                </Container>
              </Col>
              <Col size="md-3">
                <Container fluid>
                  <Row fluid>
                    <Col size="md-12">
                      <h4>
                        {user.givenName +
                          " " +
                          user.familyName}
                      </h4>
                    </Col>
                  </Row>
                  <Row fluid>
                    <Col size="md-12">
                      <h5>{user.email}</h5>
                    </Col>
                  </Row>
                </Container>
              </Col>
            </div>
          </Col>
        </Row>
        <div className="mainWraper">
          <h3 className="">Saved Videos</h3>
          <Wrapper ID="saved">
            {this.isEmpty(this.state.savedVideos) === true ? (
              <div>
                <h5 classname="load text-center">You have no saved videos. Womp Womp!</h5>
              </div>
            ) : (
                <div>
                  {this.renderVideos(this.state.savedVideos)}
                </div>
              )
            }
          </Wrapper>
        </div>
      </div>
    );

  }
}
