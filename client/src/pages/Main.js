import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
// import MovieCard from "../components/MovieCard";
import Wrapper from "../components/Wrapper";
import Navbar from "../components/Nav";
import { GLogin, GLogout } from "../components/Buttons/Google/login";


class Main extends Component {
  state = {
    user: {}
  };
  componentDidMount() {
    this.loadUsers();
  }

  loadUsers = () => {
    API.getUsers()
      .then(res =>
        this.setState({ users: res.data, title: "", author: "", synopsis: "" })
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
        <Navbar>
        <GLogout />
        </Navbar>
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
            {/* {this.state.friends.map(friend => ( */}
            {/* <MovieCard
              remixFriends={this.remixFriends}
              id={friend.id}
              key={friend.id}
              name={friend.name}
              image={friend.image}
            /> */}
            {/* ))} */}
          </Wrapper>
        </Container>
      </div>
    );
  }
}

export default Main;
