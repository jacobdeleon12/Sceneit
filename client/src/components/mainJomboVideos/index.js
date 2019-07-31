import React, { Component } from "react";
import { Col, Row } from "../Grid";
import Jumbotron from "../Jumbotron";
import { JumboIframe } from "../Iframe";
import { SaveBtn, CommentBtn, BtnContainer } from "../Buttons/VideoBtns";
import API from "../../utils/API";
import { positions, Provider, transitions } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
  timeout: 3000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE
};

class mainJombo extends Component {
  state = {
    user: [],
    redditVideos: [],
    featuredVid: []
  };

  // =======================================
  componentDidMount() {
    this.loadUser();
    this.loadVideos();
  }

  // =======================================
  loadUser = () => {
    API.getUser(document.cookie.split("=0; ")[1])
      .then(res => {
        // console.log(res.data)
        this.setState({ user: res.data, savedVideos: res.data.savedVideos });
      })
      .catch(err => console.log(err));
  };

  // =======================================

  // load videos from local storage into state to pull from in render
  loadVideos = () => {
    var redditVids = JSON.parse(localStorage.getItem("reddit"));
    this.setState({ featuredVid: redditVids[0] });
  };

  render() {
    return (
      <div className="mainJombo">
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>{this.state.featuredVid.name}</h1>
              <div>
                <JumboIframe
                  key={this.state.featuredVid.name}
                  movieUrl={this.state.featuredVid.url}
                  thumbUrl={this.state.featuredVid.bigImg}
                />
                <br />
                <BtnContainer>
                  {/* provider is for alert. must encompass  button */}
                  <Provider template={AlertTemplate} {...options}>
                    <SaveBtn
                      key={this.state.featuredVid.name + "-save"}
                      value={this.state.featuredVid.url}
                      id={this.state.featuredVid.name}
                      name="saveVid"
                      onClick={this.handleSaveFormSubmit}
                    />
                  </Provider>
                  <CommentBtn
                    key={this.state.featuredVid.name + "-comment"}
                    value={this.state.featuredVid.url}
                    name="CommentVid"
                    onClick={this.handleCommentSubmit}
                  />
                </BtnContainer>
              </div>
            </Jumbotron>
          </Col>
        </Row>
      </div>
    );
  }
}

export default mainJombo;
