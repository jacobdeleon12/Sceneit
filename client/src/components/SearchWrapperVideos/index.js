import React from "react";
import API from "../../utils/API";
import Wrapper from "../Wrapper";
import { SaveBtn } from "../Buttons/VideoBtns";
import { Title, Iframe, Thumbnail } from "../Iframe";
import {
  Tile
  // JumboTile
} from "../Tile";
// import { JumboIframe } from "../Iframe";

//NPM alert options
import { positions, Provider, transitions } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
const options = {
  timeout: 3000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE
};
const loggedInUser = window.sessionStorage.getItem("loggedInUser");
const user = JSON.parse(sessionStorage.getItem("UserInfo"));

export default class mainWrapper extends React.Component {
  state = {
    videos: {},
    user: [],
    savedVideos: [],
    vidStateID: "",
    selectedItem: -1,
    searchWord: ""
  };

  componentDidMount() {
    this.loadVideos();
    this.loadUser();
  }

  loadUser = () => {
    this.setState({ user: user });
  };

  loadVideos = async () => {
    let pathSnip = window.location.search.substring(1).split("q=")[1];
    // let pathSnip = fullPath.split("q=")[1];
    console.log(`searched word: ${pathSnip}`);

    let res = await API.searchVideos(pathSnip);
    console.log(res.data);

    this.setState({ videos: res.data[0], searchWord: pathSnip });
    console.log(this.state.videos);
  };

  handleSaveFormSubmit = (event, video) => {
    event.preventDefault();
    const vStr = video.url;
    const vName = video.name;
    const vImg = video.bigImg;

    API.saveVideo(loggedInUser, {
      $push: {
        savedVideos: { vStr, vName, vImg }
      }
    })
      .then(response => {
        this.setState({
          savedVideos: response.data.savedVideo
        });
      })
      .catch(err => console.log(err));

    event.target.disabled = true;
  };

  constructor() {
    super();
    this.state = {};
  }

  determineItemStyle(video, i) {
    const isItemSelected = this.state.selectedItem === video.url;
    return isItemSelected ? (
      <Iframe name={video.name} url={video.url} id={i} />
    ) : (
      <Thumbnail alt={video.name} img={video.bigImg} id={i} />
    );
  }

  renderVideos = data => {
    return data === undefined ? (
      <h3>Couldn't find anything for you...</h3>
    ) : (
      <div>
        {data.map((video, i) => (
          <Tile key={i}>
            <Title title={video.name} />
            <br />
            <div
              className="sml_iframe_container sml_iframe"
              onMouseEnter={() => {
                this.setState({ selectedItem: video.url });
              }}
              onMouseLeave={() => {
                this.setState({ selectedItem: "" });
              }}
            >
              {this.determineItemStyle(video, i)}
            </div>
            <br />
            <Provider template={AlertTemplate} {...options}>
              <SaveBtn
                value={video.url}
                key={`${video.url}-save`}
                id={video.name}
                name="saveVid"
                onClick={event => {
                  this.handleSaveFormSubmit(event, video);
                }}
              />
            </Provider>
          </Tile>
        ))}
      </div>
    );
  };

  render() {
    let pathSnip = window.location.search.substring(1).split("q=")[1];

    return this.state.videos === undefined ? (
      <div className="mainWraper">
        <h1>Searching for: {pathSnip}</h1>
        <br />
        <h5 className="load text-center">
          Loading <i className="fas fa-spinner fa-spin"></i>
        </h5>
      </div>
    ) : (
      <div className="mainWraper">
        <h1>Results for: {pathSnip}</h1>
        <br />
        <div className="row-wrapper">
          <h3 className="row-title">Searched Reddit for: {pathSnip}</h3>
          <Wrapper ID="reddit">
            {this.renderVideos(this.state.videos.reddit)}
          </Wrapper>
        </div>
        <div className="row-wrapper">
          <h3 className="row-title">Searched IMDB for: {pathSnip}</h3>
          <Wrapper ID="tmdb">
            {this.renderVideos(this.state.videos.tmdb)}
          </Wrapper>
        </div>
        <div className="row-wrapper">
          <h3 className="row-title">Searched Steam for: {pathSnip}</h3>
          <Wrapper ID="steam">
            {this.renderVideos(this.state.videos.steam)}
          </Wrapper>
        </div>
        {/* <div className="row-wrapper">
          <h3 className="row-title">Searched YouTube for: {pathSnip}</h3>
          <Wrapper ID="youtube">
            {this.renderVideos(this.state.videos.youtube)}
          </Wrapper>
        </div>
        <div className="row-wrapper">
          <h3 className="row-title">Searched Vevo for: {pathSnip}</h3>
          <Wrapper ID="vevo">
            {this.renderVideos(this.state.videos.vevo)}
          </Wrapper>
        </div> */}
        <div className="row-wrapper">
          <h3 className="row-title">Searched Vimeo for: {pathSnip}</h3>
          <Wrapper ID="vimeo">
            {this.renderVideos(this.state.videos.vimeo)}
          </Wrapper>
        </div>
      </div>
    );
  }
}
