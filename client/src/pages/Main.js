import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";

import Wrapper from "../components/Wrapper";
import NavBar from "../components/Nav/MainNav";
import { JumboIframe, Iframe, Thumb, Title } from "../components/Iframe";
import {
  SaveBtn,
  CommentBtn,
  BtnContainer
} from "../components/Buttons/VideoBtns";
//import Carousel from "../components/Carousel"

//NPM alert options
import { positions, Provider, transitions } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import Footer from "../components/footer";

const options = {
  timeout: 3000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE
};

class Main extends Component {
  state = {
    user: [],
    tmdbVideos: [],
    redditVideos: [],
    youtubeVideos: [],
    vevoVideos: [],
    featuredVid: [],
    alertFade: ""
  };

  // =======================================
  componentDidMount() {
    this.loadUser();
    this.loadVideos();
    // console.log(document.cookie.split("=0; ")[1]);

    // this.loadMovieInfo("endgame");
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
    var tmdbVids = JSON.parse(localStorage.getItem("tmdb"));
    var youtubeVids = JSON.parse(localStorage.getItem("youtube"));
    var redditVids = JSON.parse(localStorage.getItem("reddit"));
    var vevoVids = JSON.parse(localStorage.getItem("vevo"));

    // console.log(tmdbVids);
    // console.log(youtubeVids);
    // console.log(redditVids);
    // console.log(vevoVids);

    this.setState({ featuredVid: redditVids[0] });
    redditVids.shift();
    this.setState({
      tmdbVideos: tmdbVids,
      redditVideos: redditVids,
      youtubeVideos: youtubeVids,
      vevoVideos: vevoVids
    });
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
      })
      .catch(err => console.log(err));

    event.target.disabled = true;
  };

  imageSwap = event => {
    event.preventDefault();
    // this.refs.savebtn.setAttribute("disabled", "disabled");
    console.log(event.target.movieUrl);
    console.log(event.target.id);
  };

  // mouseUp = event => {
  //   // event.preventDefault();
  //   console.log(event.target.disabled);
  //   event.target.disabled = true;

  // }

  // left = () => {
  //   scrollLeft(document.getElementById("content"), -1500, 1000);
  // };

  // right = () => {
  //   scrollLeft(document.getElementById("content"), 1500, 1000);
  // };

  // scrollLeft = (element, change, duration) => {
  //   var start = element.scrollLeft,
  //     currentTime = 0,
  //     increment = 20;

  //   console.log(start);

  //   var animateScroll = function() {
  //     currentTime += increment;
  //     var val = Math.easeInOutQuad(currentTime, start, change, duration);
  //     element.scrollLeft = val;
  //     if (currentTime < duration) {
  //       setTimeout(animateScroll, increment);
  //     }
  //   };
  //   animateScroll();
  // }

  // //t = current time
  // //b = start value
  // //c = change in value
  // //d = duration
  // Math.easeInOutQuad = function(t, b, c, d) {
  //   t /= d / 2;
  //   if (t < 1) return (c / 2) * t * t + b;
  //   t--;
  //   return (-c / 2) * (t * (t - 2) - 1) + b;
  // };

  render() {
    // console.log(this.state);
    // console.log(this.state.savedVideos);
    // console.log(this.state.videos.reddit);
    // console.log(this.state.vevoVideos);

    return (
      <div>
        <NavBar />
        <Container fluid>
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
                        onClick={(event) => { this.handleSaveFormSubmit(event, this.state.featuredVid) }}
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
          <h1 className="">Reddit Hot</h1>
          <Wrapper ID="reddit">
            {this.state.redditVideos.map(video => (
              <div className="tile" key={video.url}>
                {/* <Iframe
                  key={video.name}
                  name={video.name}
                  movieUrl={video.url}
                  thumbUrl={video.bigImg}
                /> */}
                <Title title={video.name} />
                
                <Thumb
                  key={video.name}
                  id={video.name}
                  movieUrl={video.url}
                  thumbUrl={video.bigImg}
                  name="thumbnail"
                  onmouseover={console.log("I am a thumbnail")}
                />
                <br />
                <BtnContainer>
                  <Provider template={AlertTemplate} {...options}>
                    <SaveBtn
                      value={video.url}
                      key={`${video.url}-save`}
                      id={video.name}
                      name="saveVid"
                      onClick={(event) => { this.handleSaveFormSubmit(event, video) }}
                    />
                  </Provider>
                  <CommentBtn
                    key={`${video.url}-comment`}
                    value={this.state.featuredVid.url}
                    name="CommentVid"
                    onClick={this.handleCommentSubmit}
                  />
                </BtnContainer>
              </div>
            ))}
          </Wrapper>
          <h1 className="">IMDB Popular</h1>
          <Wrapper ID="imdb">
            {this.state.tmdbVideos.map(video => (
              <div className="tile" key={video.url}>
                {/* <Iframe
                  key={video.name}
                  name={video.name}
                  movieUrl={video.url}
                  thumbUrl={video.bigImg}
                /> */}
                <Title title={video.name} />
                <Thumb
                  key={video.name}
                  movieUrl={video.url}
                  thumbUrl={video.bigImg}
                  onClick={this.imageSwap}
                />
                <br />
                <BtnContainer>
                  <Provider template={AlertTemplate} {...options}>
                    <SaveBtn
                      value={video.url}
                      key={`${video.url}-save`}
                      id={video.name}
                      name="saveVid"
                      onClick={(event) => { this.handleSaveFormSubmit(event, video) }}
                    />
                  </Provider>
                  <CommentBtn
                    key={`${video.url}-comment`}
                    value={this.state.featuredVid.url}
                    name="CommentVid"
                    onClick={this.handleCommentSubmit}
                  />
                </BtnContainer>
              </div>
            ))}
          </Wrapper>
          {/* <h1 className="">Youtube Popular</h1>
          <Wrapper ID="youtube">
            {this.state.youtubeVideos.map(video => (
              <div className="tile" key={video.url}>
                <Iframe
                  key={video.name}
                  name={video.name}
                  movieUrl={video.url}
                  thumbUrl={video.bigImg}
                />
                <Title title={video.name} />
                <Thumb
                  key={video.name}
                  movieUrl={video.url}
                  thumbUrl={video.bigImg}
                  onClick={this.imageSwap}
                />
                <br />
                <BtnContainer>
                  <Provider template={AlertTemplate} {...options}>
                    <SaveBtn
                      value={video.url}
                      key={`${video.url}-save`}
                      id={video.name}
                      name="saveVid"
                      onClick={(event) => { this.handleSaveFormSubmit(event, video) }}
                    />
                  </Provider>
                  <CommentBtn
                    key={`${video.url}-comment`}
                    value={this.state.featuredVid.url}
                    name="CommentVid"
                    onClick={this.handleCommentSubmit}
                  />
                </BtnContainer>
              </div>
            ))}
          </Wrapper>
          <h1 className="">Hot on Vevo</h1>
          <Wrapper ID="vevo">
            {this.state.vevoVideos.map(video => (
              <div className="tile" key={video.url}>
                <Iframe
                  key={video.name}
                  name={video.name}
                  movieUrl={video.url}
                  thumbUrl={video.bigImg}
                />
                <Title title={video.name} />
                <Thumb
                  key={video.name}
                  movieUrl={video.url}
                  thumbUrl={video.bigImg}
                  onClick={this.imageSwap}
                />
                <br />
                <BtnContainer>
                  <Provider template={AlertTemplate} {...options}>
                    <SaveBtn
                      value={video.url}
                      key={`${video.url}-save`}
                      id={video.name}
                      name="saveVid"
                      onClick={(event) => { this.handleSaveFormSubmit(event, video) }}
                    />
                  </Provider>
                  <CommentBtn
                    key={`${video.url}-comment`}
                    value={this.state.featuredVid.url}
                    name="CommentVid"
                    onClick={this.handleCommentSubmit}
                  />
                </BtnContainer>
              </div>
            ))}
          </Wrapper> */}
        </Container>
        <Footer />
      </div>
    );
  }
}

export default Main;
