import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import Wrapper from "../components/Wrapper";
import NavBar from "../components/Nav/MainNav";
import Iframe from "../components/Iframe";
// import JumboIframe from "../components/JumboIframe"
import SaveBtn from "../components/Buttons/SaveBtn";
//import Carousel from "../components/Carousel"
import DeleteBtn from "../components/Buttons/DeleteBtn";

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
                <DeleteBtn onClick={() => this.deleteBook(video._id)} />
              </div>
            ))}

            {this.state.movieVideos.map(video => (
              <div className="text-center">
                <Iframe
                  key={video.name}
                  YTstr={video.YTstr}
                />
                <SaveBtn
                  value={video.YTstr}
                  key={video.name}
                  name="saveVid"
                  onClick={this.handleSaveFormSubmit} />
              </div>
            ))}

          </Wrapper>
        </Container>
      </div>
    );
  }
}

export default User;