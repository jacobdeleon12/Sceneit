import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import Wrapper from "../components/Wrapper";
import NavBar from "../components/Nav/MainNav";
import Iframe from "../components/Iframe";
// import JumboIframe from "../components/JumboIframe"
// import SaveBtn from "../components/Buttons/SaveBtn";
//import Carousel from "../components/Carousel"
import { DeleteBtn } from "../components/Buttons/VideoBtns";

class User extends Component {
  state = {
    user: [],
    videos: []
    // movieVideos: [],
    // featuredVid: [],
    // selectedVideo: [{}]
  };
  componentDidMount() {
    this.loadUser();


  }

  loadUser = () => {
    API.getUser((document.cookie).split("=0; ")[1])
      .then(res => {
        // console.log(res.data)
        this.setState({ user: res.data, videos: res.data.savedVideos })
      })
      .catch(err => console.log(err));
  };

  deleteVideo = _id => {
    API.deleteVideo(
      this.state.user.savedVideos._id,
      {
        useFindAndModify: false
      })
      .then(res => this.loadUser())
      .catch(err => console.log(err));
  };
  loadVideos = () => {
    // API.getVideos().then(res => {
    //   console.log(res.data);

    //   const redditdata = res.data.data.children;
    //   let YTtitle = [];
    //   let YTHotStr = [];
    //   let reddit = [];
    //   for (let i = 0; i < redditdata.length; i++) {
    //     if (redditdata[i].data.domain === "youtube.com") {
    //       //getting just the infromaion we need from huge string
    //       const redditSplit = redditdata[i].data.media_embed.content.split(
    //         "embed/"
    //       )[1];
    //       if (typeof redditSplit != "undefined") {
    //         //title
    //         YTtitle = redditdata[i].data.title;
    //         //getting just the infromaion we need after ? in string
    //         YTHotStr = redditSplit.substring(0, redditSplit.indexOf("?"));
    //         //pushing to obj
    //         reddit.push({ name: YTtitle, YTstr: YTHotStr });
    //       }
    //     }
    //   }
    //   this.setState({ featuredVid: reddit[0] });
    //   reddit.shift();
    //   this.setState({ videos: reddit });
    //   //console.log(this.state.featuredVid);
    // });
  };
  // =======================================
  //for movie vidoes, and anything else we want to come up with
  //must .split(" ").join("+") string for query to work correctly.
  // loadMovieInfo = (query) => {
  // API.getMovieInfo(query).then(res => {
  //   // console.log(res.data.results);
  //   const searchResult = res.data.results[0].id;
  //   //second call for api video results
  //   API.getMovieVideo(searchResult).then(res => {
  //     // console.log(res.data);
  //     const videoResults = res.data.results;
  //     let YTMovieKey = [];
  //     let YTMovieName = [];
  //     let movieSearch = [];

  //     //max of 10 for video search
  //     for (let i = 0; i < 10 && i < videoResults.length; i++) {
  //       YTMovieKey = videoResults[i].key;
  //       YTMovieName = videoResults[i].name
  //       movieSearch.push({ name: YTMovieName, YTstr: YTMovieKey })
  //     }
  //     this.setState({ movieVideos: movieSearch });
  //     // console.log(this.state);

  //   })
  // })
  // };
  // =======================================
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
  // =======================================
  // handleSaveFormSubmit = event => {
  //   event.preventDefault();
  //   console.log(this.state.selectedVideo);
  //   console.log(event.target.id);
  //   console.log(event.target.value);

  //   console.log(this.state.videos);

  //   let selectedVid = { id: event.target.value, name: event.target.id };
  //   // console.log(selectedVid);

  //   // let selectedVideo = [];
  //   const vStr = selectedVid.id;
  //   const vName = selectedVid.name;
  //   // console.log(vStr);
  //   // console.log(vName);

  //   console.log(this.state.user);

  //   API.saveVideo(this.state.user._id, {
  //     $push: {
  //       savedVideos: { vStr, vName }
  //     }
  //   })
  //     .then(res => { console.log("this happened") })
  //     .catch(err => console.log(err));
  // };

  render() {
    console.log(this.state);

    return (
      <div>
        <NavBar />
        <Container fluid>
          <Row>
            <Col size="md-12">
              <Jumbotron>

              </Jumbotron>
            </Col>
          </Row>
          <Wrapper>
            {this.state.videos.map(video => (
              <div className="text-center">
                <Iframe
                  key={video.vName}
                  YTstr={video.vStr}
                />
                <DeleteBtn onClick={() => this.deleteVideo(video._id)} />
              </div>
            ))}

            {/* {this.state.movieVideos.map(video => (
              <div className="text-center">
                <Iframe
                  key={video.name}
                  YTstr={video.YTstr}
                />
                <DeleteBtn onClick={() => this.deleteBook(video._id)} />
              </div>
            ))} */}

          </Wrapper>
        </Container>
      </div>
    );
  }
}

export default User;