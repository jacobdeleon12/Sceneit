import React, { Component } from "react";
import Wrapper from "../Wrapper";
import { Thumb, Title, Iframe } from "../Iframe";
import { SaveBtn, CommentBtn, BtnContainer } from "../Buttons/VideoBtns";
import API from "../../utils/API";
import { positions, Provider, transitions } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import VidWrapper from "../vidWraper";
import Tile from "../tile";

const options = {
  timeout: 3000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE
};

class mainWrapper extends Component {
  state = {
    user: [],
    tmdbVideos: [],
    redditVideos: [],
    youtubeVideos: [],
    vevoVideos: [],
    featuredVid: [],
    savedVideos: [],
    vidStateID: "",
    hover: false
  };

  // =======================================
  componentDidMount() {
    this.loadUser();
    this.loadVideos();
  }

  // =======================================
  loadUser = () => {
    API.getUser(document.cookie.split("=0; ")[1])
      .then(res => {
        // console.log(res.data)
        this.setState({ user: res.data, savedVideos: res.data.savedVideos });
      })
      .catch(err => console.log(err));
  };

  // =======================================

  // load videos from local storage into state to pull from in render
  loadVideos = () => {
    var tmdbVids = JSON.parse(localStorage.getItem("tmdb"));
    var youtubeVids = JSON.parse(localStorage.getItem("youtube"));
    var redditVids = JSON.parse(localStorage.getItem("reddit"));
    var vevoVids = JSON.parse(localStorage.getItem("vevo"));

    // console.log(tmdbVids);
    // console.log(youtubeVids);
    // console.log(redditVids);
    // console.log(vevoVids);

    this.setState({ featuredVid: redditVids[0] });
    redditVids.shift();
    this.setState({
      tmdbVideos: tmdbVids,
      redditVideos: redditVids,
      youtubeVideos: youtubeVids,
      vevoVideos: vevoVids
    });
  };
  //=========================================
  handleSaveFormSubmit = (event, video) => {
    event.preventDefault();
    // this.refs.savebtn.setAttribute("disabled", "disabled");
    console.log("event", event);

    const vStr = video.url;
    const vName = video.name;
    const vImg = video.bigImg;
    console.log(video);

    API.saveVideo(this.state.user._id, {
      $push: {
        savedVideos: { vStr, vName, vImg }
      }
    })
      .then(response => {
        console.log(response);

        this.setState({
          savedVideos: response.data.savedVideo
        });
      })
      .catch(err => console.log(err));

    event.target.disabled = true;
  };

  loadUser = () => {
    API.getUser(document.cookie.split("profId=")[1])
      .then(res => {
        console.log(res.data);
        this.setState({ user: res.data, savedVideos: res.data.savedVideos });
      })
      .catch(err => console.log(err));
  };

  hoverOn = () => {
    console.log("we are hovering");

    this.setState({ hover: true });
  };

  hoverOff = () => {
    this.setState({ hover: false });
  };

  renderRedditVids = () =>
    this.state.redditVideos.map(video => {

      return (
        <Tile key={video.name} hoverOn={this.hoverOn} hoverOff={this.hoverOff}>
          <VidWrapper>
            {this.state.hover ? (
              <Iframe
                key={video.name}
                name={video.name}
                movieUrl={video.url}
                thumbUrl={video.bigImg}
              />
            ) : (
              <Thumb
                key={video.name}
                id={video.name}
                movieUrl={video.url}
                thumbUrl={video.bigImg}
                name="thumbnail"
              />
            )}

            <Title title={video.name} />
            {/* <br /> */}
          </VidWrapper>
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
            {/* <CommentBtn
              key={`${video.url}-comment`}
              value={this.state.featuredVid.url}
              name="CommentVid"
              onClick={this.handleCommentSubmit}
            /> */}
          </BtnContainer>
        </Tile>
      );
    });

  renderIMDBVids = () =>
    this.state.tmdbVideos.map(video => {

      return (
        <Tile key={video.name} hoverOn={this.hoverOn} hoverOff={this.hoverOff}>
          <VidWrapper>
            {this.state.hover ? (
              <Iframe
                key={video.name}
                name={video.name}
                movieUrl={video.url}
                thumbUrl={video.bigImg}
              />
            ) : (
              <Thumb
                key={video.name}
                id={video.name}
                movieUrl={video.url}
                thumbUrl={video.bigImg}
                name="thumbnail"
              />
            )}

            <Title title={video.name} />
            <br />
          </VidWrapper>
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
            {/* <CommentBtn
              key={`${video.url}-comment`}
              value={this.state.featuredVid.url}
              name="CommentVid"
              onClick={this.handleCommentSubmit}
            /> */}
          </BtnContainer>
        </Tile>
      );
    });

  render() {
    console.log(this.state.hover);

    return (
      <div className="mainWraper">
        <h1 className="">Reddit Hot</h1>
        <Wrapper ID="reddit">{this.renderRedditVids()}</Wrapper>
        <h1 className="">IMDB Popular</h1>
        <Wrapper ID="imdb">{this.renderIMDBVids()}</Wrapper>
        {/* <h1 className="">Youtube Popular</h1>
          <Wrapper ID="youtube">
            {this.state.youtubeVideos.map(video => (
              <div className="tile" key={video.url}>
                <Iframe
                  key={video.name}
                  name={video.name}
                  movieUrl={video.url}
                  thumbUrl={video.bigImg}
                />
                <Title title={video.name} />
                <Thumb
                  key={video.name}
                  movieUrl={video.url}
                  thumbUrl={video.bigImg}
                  onClick={this.imageSwap}
                />
                <br />
                <BtnContainer>
                  <Provider template={AlertTemplate} {...options}>
                    <SaveBtn
                      value={video.url}
                      key={`${video.url}-save`}
                      id={video.name}
                      name="saveVid"
                      onClick={(event) => { this.handleSaveFormSubmit(event, video) }}
                    />
                  </Provider>
                  <CommentBtn
                    key={`${video.url}-comment`}
                    value={this.state.featuredVid.url}
                    name="CommentVid"
                    onClick={this.handleCommentSubmit}
                  />
                </BtnContainer>
              </div>
            ))}
          </Wrapper>
          <h1 className="">Hot on Vevo</h1>
          <Wrapper ID="vevo">
            {this.state.vevoVideos.map(video => (
              <div className="tile" key={video.url}>
                <Iframe
                  key={video.name}
                  name={video.name}
                  movieUrl={video.url}
                  thumbUrl={video.bigImg}
                />
                <Title title={video.name} />
                <Thumb
                  key={video.name}
                  movieUrl={video.url}
                  thumbUrl={video.bigImg}
                  onClick={this.imageSwap}
                />
                <br />
                <BtnContainer>
                  <Provider template={AlertTemplate} {...options}>
                    <SaveBtn
                      value={video.url}
                      key={`${video.url}-save`}
                      id={video.name}
                      name="saveVid"
                      onClick={(event) => { this.handleSaveFormSubmit(event, video) }}
                    />
                  </Provider>
                  <CommentBtn
                    key={`${video.url}-comment`}
                    value={this.state.featuredVid.url}
                    name="CommentVid"
                    onClick={this.handleCommentSubmit}
                  />
                </BtnContainer>
              </div>
            ))}
          </Wrapper> */}
      </div>
    );
  }
}
export default mainWrapper;
