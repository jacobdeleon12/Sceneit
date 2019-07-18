import React, { Component } from "react";
import DeleteBtn from "../components/Buttons/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea } from "../components/Form";
import { GLogin } from "../components/Buttons/Google/index";

class Books extends Component {
  state = {
    books: [],
    title: "",
    author: "",
    synopsis: "",
    redditHot:[],
    redditSearch:[]
  };

  componentDidMount() {
    this.loadBooks();
    this.reddit();
  }

  reddit= () => {
    API.getRedditHot().then(res => {

        let redditdata = res.data.data.children;
        let YTtitle=[]
        let YTHotStr=[]
        for (let i = 0; i < redditdata.length; i++) {
          // console.log(redditdata[i].data.title);
          //  console.log(YTtitle);
          
          let redditSplit = redditdata[i].data.media_embed.content
          .split("embed/")[1];
          if (typeof redditSplit != "undefined"){
            YTHotStr.push(redditSplit.substring(0, redditSplit.indexOf('?')))
            YTtitle.push( redditdata[i].data.title)
          }
        }
        // console.log(YTtitle);
  
      this.setState({redditHot:{name: YTtitle , YTstr: YTHotStr}})
      console.log(this.state.redditHot);
    });
  };

  // redditSearch = (query) =>{
  //   API.getRedditSearch().then(res =>{
      
  //   })
  // }



  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ books: res.data, title: "", author: "", synopsis: "" })
      )
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
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
    // const responseGoogle = (response) => {
    //   console.log(response);
    // }
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>What Books Should I Read?</h1>
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
              <h1>Books On My List</h1>
            </Jumbotron>
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book._id}>
                    <Link to={"/books/" + book._id}>
                      <strong>
                        {book.title} by {book.author}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteBook(book._id)} />
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

export default Books;
