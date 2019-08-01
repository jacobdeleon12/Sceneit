import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { Container } from "../components/Grid";
import API from "../utils/API";
import NavBar from "../components/Nav/MainNav";
import Wrapper from "../components/Wrapper";

class SearchResults extends Component {
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
        <NavBar />
        <Container fluid>
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

export default SearchResults;
