import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import Wrapper from "../components/Wrapper";
import NavBar from "../components/Nav/MainNav";
import Iframe from "../components/Iframe";
import JumboIframe from "../components/JumboIframe";
import SaveBtn from "../components/Buttons/SaveBtn";
//import Carousel from "../components/Carousel"

class Main extends Component {
  state = {
    user: {},
    videos: [],
    movieVideos: [],
    featuredVid: []
  };
  componentDidMount() {
    this.loadVideos();
    this.loadMovieInfo("endgame");
  }

  loadVideos = () => {
    API.getRedditHot().then(response => {
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
            reddit.push({ name: YTtitle, YTstr: YTHotStr });
          }
        }
      }
      this.setState({ featuredVid: reddit[0] });
      reddit.shift();
      this.setState({ videos: reddit });
      //console.log(this.state.featuredVid);
    });
  };

  //for movie vidoes, and anything else we want to come up with
  //must .split(" ").join("+") string for query to work correctly.
  loadMovieInfo = query => {
    API.getTmdbInfo(query).then(response => {
      console.log(response.data.results);
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
          movieSearch.push({ name: YTMovieName, YTstr: YTMovieKey });
        }
        this.setState({ movieVideos: movieSearch });
        // console.log(this.state);
      });
    });
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSaveFormSubmit = event => {
    let selectedVideo = [];
    this.state.videos.map(video => {
      if (event.target.value === video.YTstr) {
        selectedVideo = video;
      }
      return video;
    });
    console.log(selectedVideo);
    const vStr = selectedVideo.YTstr;
    const vName = selectedVideo.name;
    console.log(this.user);

    event.preventDefault();
    API.saveVideo({
      savedVideoStr: vStr,
      savedVideoName: vName
    })
      .then(response => {
        console.log("this happened");
      })
      .catch(err => console.log(err));
    this.setState({ clicked: true });
  };

  render() {
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
                  <SaveBtn
                    value={this.state.featuredVid.YTstr}
                    name="saveVid"
                    onClick={this.handleSaveFormSubmit}
                  />
                </div>
              </Jumbotron>
            </Col>
          </Row>
          <Wrapper>
            {this.state.videos.map(video => (
              <div className="text-center">
                <Iframe key={video.name} YTstr={video.YTstr} />
                <SaveBtn />
              </div>
            ))}
          </Wrapper>
          <Wrapper>
            {this.state.movieVideos.map(video => (
              <div className="text-center">
                <Iframe key={video.name} YTstr={video.YTstr} />
                <SaveBtn
                  value={video.YTstr}
                  name="saveVid"
                  onClick={this.handleSaveFormSubmit}
                />
              </div>
            ))}
            ;
          </Wrapper>
        </Container>
      </div>
    );
  }
}

export default Main;
