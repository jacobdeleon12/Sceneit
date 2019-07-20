import React, { Component } from "react";
import DeleteBtn from "../components/Buttons/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea } from "../components/Form";
import { GLogin } from "../components/Buttons/Google/index";

class Users extends Component {
  state = {
    users: [],
    title: "",
    author: "",
    synopsis: "",
    redditHot: []
  };

  componentDidMount() {
    this.loadBooks();
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

  loadBooks = () => {
    API.getBooks()
    this.loadUsers();
  }

  loadUsers = () => {
    API.getUsers()
      .then(res =>
        this.setState({ users: res.data, title: "", author: "", synopsis: "" })
      )
      .catch(err => console.log(err));
  };

  deleteUser = id => {
    API.deleteUser(id)
      .then(res => this.loadUsers())
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
    // const responseGoogle = (response) => {
    //   console.log(response);
    // }
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>What Users Should I Read?</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              <Input
                value={this.state.author}
                onChange={this.handleInputChange}
                name="author"
                placeholder="Author (required)"
              />
              <TextArea
                value={this.state.synopsis}
                onChange={this.handleInputChange}
                name="synopsis"
                placeholder="Synopsis (Optional)"
              />
            </form>
            <GLogin />
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Users On My List</h1>
            </Jumbotron>
            {this.state.users.length ? (
              <List>
                {this.state.users.map(user => (
                  <ListItem key={user._id}>
                    <Link to={"/users/" + user._id}>
                      <strong>
                        {user.title} by {user.author}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteUser(user._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Users;
