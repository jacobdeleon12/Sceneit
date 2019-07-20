import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import Iframe from "../components/Iframe";
// import Wrapper from "../components/Wrapper";
import NavBar from "../components/Nav/MainNav";

class Main extends Component {
  state = {
    user: {},
    redditHot: []
  };
  componentDidMount() {
    // this.loadUsers(); 
    this.reddit();
  }

  reddit = () => {
    API.getRedditHot().then(res => {
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
      this.setState({ redditHot: reddit });
      console.log(this.state);
    });
  };

  loadUsers = () => {
    API.getUsers()
      .then(res =>
        this.setState({ users: res.data })
      )
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title && this.state.author) {
      API.saveUser({
        title: this.state.title,
        author: this.state.author,
        synopsis: this.state.synopsis
      })
        .then(res => this.loadUsers())
        .catch(err => console.log(err));
    }
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
          <Container fluid>
            <Col size="md-3">
              <Row>
                {/* <Iframe /> */}
                {this.state.redditHot.map(video => (
                  <Iframe
                    // remixFriends={this.remixFriends}
                    id={video.YTstr}
                  // key={video.YTstr}
                  // name={video.name}
                  // image={friend.image}
                  />
                ))}
              </ Row>
            </Col>
          </Container>
        </Container>
      </div>
    );
  }
}

export default Main;
