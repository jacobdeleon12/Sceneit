import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import Iframe from "../components/Iframe";
// import Wrapper from "../components/Wrapper";
import NavBar from "../components/Nav/MainNav";
import Iframe from "../components/Iframe";

class Main extends Component {
  state = {
    user: {},
    videos: []
  };
  componentDidMount() {
    this.loadVideos();
  }

  loadVideos = () => {
    API.getVideos().then(res => {
      const redditdata = res.data.data.children;
      let YTtitle = [];
      let YTHotStr = [];
      let reddit = [];
      for (let i = 0; i < redditdata.length; i++) {
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
      this.setState({ videos: reddit });
      console.log(this.state);
    });
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <div>
        <NavBar />
        <Container fluid>
          <Row>
            <Col size="md-12">
              <Jumbotron>
                <h1>
                  Featured Title
              </h1>
                {/* insert other shit */}
              </Jumbotron>
            </Col>
          </Row>
          <Wrapper>
            {this.state.videos.map(video => (
              <Iframe
                key={video.name}
                YTstr={video.YTstr}
              />
            ))};
          </Wrapper>
        </Container>
      </div>
    );
  }
}

export default Main;
