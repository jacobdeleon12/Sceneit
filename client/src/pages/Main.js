import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import Wrapper from "../components/Wrapper";
import NavBar from "../components/Nav/MainNav";
import { JumboIframe, Iframe } from "../components/Iframe";
import {
  SaveBtn,
  // DeleteBtn,
  // ViewBtn,
  CommentBtn,
  BtnContainer
} from "../components/Buttons/VideoBtns";
//import Carousel from "../components/Carousel"

//NPM alert options
import { positions, Provider, transitions } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
  timeout: 3000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE
};

class Main extends Component {
  state = {
    user: [],
    videos: [],
    movieVideos: [],
    featuredVid: [],
    savedVideos: [],
    clicked: false,
    alertFade: ""
  };
  // =======================================
  componentDidMount() {
    this.loadUser();
    this.loadVideos();
    // console.log(document.cookie.split("=0; ")[1]);

    this.loadMovieInfo("endgame");
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
  loadVideos = () => {
    API.getRedditHot()
      .then(response => {
        console.log("getRedditHot", response.data.data);

        const redditdata = response.data.data.children;
        let YTtitle = [];
        let YTHotStr = [];
        let reddit = [];
        for (let i = 0; i < redditdata.length; i++) {
          if (redditdata[i].data.domain === "youtube.com") {
            //getting just the infromaion we need from huge string
            const redditSplit = redditdata[i].data.media_embed.content.split(
              "embed/"
            )[1];
            if (typeof redditSplit != "undefined") {
              //title
              YTtitle = redditdata[i].data.title;
              //getting just the infromaion we need after ? in string
              YTHotStr = redditSplit.substring(0, redditSplit.indexOf("?"));
              //pushing to obj
              reddit.push({
                name: YTtitle,
                YTstr: YTHotStr,
                vidType: "youtube",
                clicked: false
              });
            }
          }
        }
        this.setState({ featuredVid: reddit[0] });
        reddit.shift();
        this.setState({ videos: reddit });
        //console.log(this.state.featuredVid);
      })
      .catch(err => console.log(err));
  };

  //for movie vidoes, and anything else we want to come up with
  //must .split(" ").join("+") string for query to work correctly.
  loadMovieInfo = query => {
    API.getTmdbInfo(query)
      .then(response => {
        console.log("getTmdbInfo", response.data.results);
        // console.log(response.data);
        const searchResult = response.data.results[0].id;
        //second call for api video results
        API.getTmdbVideos(searchResult).then(response => {
          // console.log(response.data);
          const videoResults = response.data.results;
          let YTMovieKey = [];
          let YTMovieName = [];
          let movieSearch = [];

          //max of 10 for video search
          for (let i = 0; i < 10 && i < videoResults.length; i++) {
            YTMovieKey = videoResults[i].key;
            YTMovieName = videoResults[i].name;
            movieSearch.push({
              name: YTMovieName,
              YTstr: YTMovieKey,
              vidType: "omdb",
              clicked: false
            });
          }
          this.setState({ movieVideos: movieSearch });
          // console.log(this.state);
        });
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
        // console.log(response);

        this.setState({
          savedVideos: response.data.savedVideo
        });
      })
      .catch(err => console.log(err));

    event.target.disabled = true;
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
    console.log(this.state.savedVideos);
    // console.log(this.state.);
    // console.log(this.state.);

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
                    YTstr={this.state.featuredVid.YTstr}
                  />
                  <br />
                  <BtnContainer>
                    {/* provider is for alert. must encompass  button */}
                    <Provider template={AlertTemplate} {...options}>
                      <SaveBtn
                        key={this.state.featuredVid.name + "-save"}
                        value={this.state.featuredVid.YTstr}
                        id={this.state.featuredVid.name}
                        name="saveVid"
                        onClick={this.handleSaveFormSubmit}
                      />
                    </Provider>
                    <CommentBtn
                      key={this.state.featuredVid.name + "-comment"}
                      value={this.state.featuredVid.YTstr}
                      name="CommentVid"
                      onClick={this.handleCommentSubmit}
                    />
                  </BtnContainer>
                </div>
              </Jumbotron>
            </Col>
          </Row>
          <h1 className="text-center">Reddit Hot</h1>
          <Wrapper ID="reddit">
            {this.state.videos.map(video => (
              <div className="text-center" key={video.YTstr}>
                <Iframe key={video.name} YTstr={video.YTstr} />
                <br />
                <BtnContainer>
                  <Provider template={AlertTemplate} {...options}>
                    <SaveBtn
                      value={video.YTstr}
                      key={`${video.YTstr}-save`}
                      id={video.name}
                      name="saveVid"
                      onClick={this.handleSaveFormSubmit}
                    />
                  </Provider>
                  <CommentBtn
                    key={`${video.YTstr}-comment`}
                    value={this.state.featuredVid.YTstr}
                    name="CommentVid"
                    onClick={this.handleCommentSubmit}
                  />
                </BtnContainer>
              </div>
            ))}
          </Wrapper>
          <h1 className="text-center">IMDB Popular</h1>
          <Wrapper ID="imdb">
            {this.state.movieVideos.map(video => (
              <div className="text-center" key={video.YTstr}>
                <Iframe key={video.name} YTstr={video.YTstr} />
                <br />
                <BtnContainer>
                  <Provider template={AlertTemplate} {...options}>
                    <SaveBtn
                      value={video.YTstr}
                      key={`${video.YTstr}-save`}
                      id={video.name}
                      name="saveVid"
                      onClick={this.handleSaveFormSubmit}
                    />
                  </Provider>
                  <CommentBtn
                    key={`${video.YTstr}-comment`}
                    value={this.state.featuredVid.YTstr}
                    name="CommentVid"
                    onClick={this.handleCommentSubmit}
                  />
                </BtnContainer>
              </div>
            ))}
          </Wrapper>
        </Container>
      </div>
    );
  }
}

export default Main;
