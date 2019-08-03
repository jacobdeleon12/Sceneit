import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { Container } from "../components/Grid";
import API from "../utils/API";
import { MainNav } from "../components/Nav";
import Wrapper from "../components/Wrapper";

class SearchResults extends Component {
  state = {
    user: {}
  };
  componentDidMount() {
    this.loadUsers();
  }

  loadUsers = () => {
    API.getUser(window.sessionStorage.getItem("loggedInUser"))
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
        <MainNav />
        <Container fluid>
          <Wrapper></Wrapper>
        </Container>
      </div>
    );
  }
}

export default SearchResults;
