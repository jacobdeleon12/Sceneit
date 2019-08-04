import React from "react";
import API from "../../utils/API";
import Wrapper from "../Wrapper";
import { SaveBtn } from "../Buttons/VideoBtns";
import { Title, Iframe, Thumbnail } from "../Iframe";
import { Tile, JumboTile } from "../Tile";
import { JumboIframe } from "../Iframe";

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
    selectedItem: -1
  };
  componentDidMount() {
    this.loadVideos();
    this.loadUser();
  }

  loadUser = () => {
    this.setState({ user: user });
  };

  loadVideos = async () => {
    let res = await API.getVideos();
    this.setState({ videos: res.data[0].videos });
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
    return (
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

  renderJumbo = video => {
    return (
      <div className="jumboList">
        {/* <Tile key={1}> */}
        {/* <Title title={video.name} />
          <br /> */}
        <JumboIframe name={video.name} url={video.url} id={1} />
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
        {/* </Tile> */}
      </div>
    );
  };

  render() {
    return this.state.videos === undefined ? (
      <h5 className="load text-center">Loading...</h5>
    ) : (
      <div className="mainWraper">
        <JumboTile>{this.renderJumbo(this.state.videos.reddit[0])}</JumboTile>
        <h3 className="">Reddit</h3>
        <Wrapper ID="reddit">
          {this.renderVideos(this.state.videos.reddit)}
        </Wrapper>
        <h3 className="">TMDB</h3>
        <Wrapper ID="tmdb">{this.renderVideos(this.state.videos.tmdb)}</Wrapper>
        <h3 className="">STEAM</h3>
        <Wrapper ID="steam">
          {this.renderVideos(this.state.videos.steam)}
        </Wrapper>
        <h3 className="">YOUTUBE</h3>
        <Wrapper ID="youtube">
          {this.renderVideos(this.state.videos.youtube)}
        </Wrapper>
        <h3 className="">VEVO</h3>
        <Wrapper ID="vevo">{this.renderVideos(this.state.videos.vevo)}</Wrapper>
        <h3 className="">VIMEO</h3>
        <Wrapper ID="vimeo">
          {this.renderVideos(this.state.videos.vimeo)}
        </Wrapper>
      </div>
    );
  }
}
