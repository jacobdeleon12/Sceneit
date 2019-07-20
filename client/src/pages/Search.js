import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import NavBar from "../components/Nav/SearchResultNav";
import MovieCard from "../components/MovieCard";
import Wrapper from "../components/Wrapper";
import { Input, FormBtn } from "../components/Form";

class Search extends Component {
  state = {
    user: {}
  };
  componentDidMount() {
    this.loadUsers();
  }

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
        .then(res => console.log("this happened"))
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <div>
        <NavBar />
        <Container fluid>
          <Jumbotron>
            <Input></Input>
            <FormBtn></FormBtn>
          </Jumbotron>
        </Container>
      </div>
    );
  }
}

export default Search;