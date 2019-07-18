import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import NavBar from "../components/Nav/SearchResultNav";
import MovieCard from "../components/MovieCard";
import Wrapper from "../components/Wrapper";

class SearchResults extends Component {
  state = {
    book: {}
  };
  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ books: res.data, title: "", author: "", synopsis: "" })
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
      API.saveBook({
        title: this.state.title,
        author: this.state.author,
        synopsis: this.state.synopsis
      })
        .then(res => this.loadBooks())
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