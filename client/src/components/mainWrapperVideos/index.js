import React, { Component, Fragment } from "react";
import API from "../../utils/API";

import Wrapper from "../Wrapper";
import { Title, Iframe } from "../Iframe";
import { SaveBtn, BtnContainer } from "../Buttons/VideoBtns";
import VidWrapper from "../vidWraper";
import Tile from "../tile";

//NPM alert options
import { positions, Provider, transitions } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
const options = {
  timeout: 3000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE
};

export default class mainWrapper extends React.Component {
  state = {
    videos: {},
    videoUrl: [],
    user: [],
    savedVideos: [],
    vidStateID: "",
    hover: false
  };
  componentDidMount() {
    this.loadVideos();
    this.loadUser();
  }

  loadUser = () => {
    API.getUser(document.cookie.split("=0; ")[1])
      .then(res => {
        res.data.savedVideos != null &&
          this.setState({ user: res.data, savedVideos: res.data.savedVideos });
      })
      .catch(err => console.log(err));
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

    API.saveVideo(this.state.user._id, {
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

  hoverOn = (event, url) => {
    console.log("im hovering");
    console.log(`event target: ${event.target}`);
    console.log(`target url: ${url}`);
  };

  hoverOff = (event, url) => {
    console.log("im not hovering");
    console.log(`event target: ${event.target}`);
    console.log(`target url: ${url}`);
  };

  renderVideos = data => {
    return data === undefined ? (
      <div>Loading...</div>
    ) : (
      <ul>
        {data.map((video, i) => (
          <Tile key={i}>
            <VidWrapper>
              <Title title={video.name} />
              <br />
              <Iframe
                key={i}
                hoverOn={this.hoverOn(video.url)}
                hoverOff={this.hoverOff(video.bigImg)}
                name={video.name}
                url={video.bigImg}
                // thumbUrl={video.bigImg}
                // videoUrl={video.url}
              />
              <br />
              <BtnContainer>
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
              </BtnContainer>
            </VidWrapper>
          </Tile>
        ))}
      </ul>
    );
  };

  render() {
    return (
      <div className="mainWraper">
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
