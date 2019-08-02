import React, { Component, Fragment } from "react";
import axios from "axios";
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
  // state = {
  //   user: [],
  //   videos: [],
  //   redditV: [],
  //   user: [],
  //   savedVideos: [],
  //   vidStateID: "",
  //   hover: false
  // };

  // Added this:
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      title: null
    };
  }

  // =======================================
  componentDidMount() {
    // this.loadUser();
    this.loadVideos();
  }

  // =======================================
  loadUser = () => {
    API.getUser(document.cookie.split("=0; ")[1])
      .then(res => {
        // console.log(res.data)
        res.data.savedVideos != null &&
          this.setState({ user: res.data, savedVideos: res.data.savedVideos });
      })
      .catch(err => console.log(err));
  };

  // =======================================

  // load videos from local storage into state to pull from in render
  loadVideos = () => {
    API.getVideos()
      .then(response => response.json())
      .then(json => this.setState({ loading: false, data: json }));
    //   {
    //   // console.log(res.data[0].videos.reddit);

    //   // this.setState({ featuredVid: videoArr.reddit[0] });
    //   // videoArr.reddit[0].shift();
    //   this.setState({
    //     videos: res.data[0].videos
    //   });
    // });
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

  // loadUser = () => {
  //   API.getUser(document.cookie.split("profId=")[1])
  //     .then(res => {
  //       console.log(res.data);
  //       this.setState({ user: res.data, savedVideos: res.data.savedVideos });
  //     })
  //     .catch(err => console.log(err));
  // };

  hoverOn = () => {
    console.log("we are hovering");

    this.setState({ hover: true });
  };

  hoverOff = () => {
    this.setState({ hover: false });
  };

  renderList = data => {
    return (
      <ul>
        {data.map(item => (
          <li style={{ listStyle: "none" }} key={item.name}>
            {item.name}
          </li>
        ))}
      </ul>
    );
  };

  // this.state.videos.reddit.map(video => {
  //   return (
  //     <Tile hoverOn={this.hoverOn} hoverOff={this.hoverOff}>
  //       <VidWrapper>
  //         {this.state.hover ? (
  //           <Iframe
  //             key={video.name}
  //             name={video.name}
  //             movieUrl={video.url}
  //             thumbUrl={video.bigImg}
  //           />
  //         ) : (
  //           <Thumb
  //             key={video.name}
  //             id={video.name}
  //             movieUrl={video.url}
  //             thumbUrl={video.bigImg}
  //             name="thumbnail"
  //           />
  //         )}

  //         <Title title={video.name} />
  //         <br />
  //       </VidWrapper>
  //       <br />
  //       <BtnContainer>
  //         <Provider template={AlertTemplate} {...options}>
  //           <SaveBtn
  //             value={video.url}
  //             key={`${video.url}-save`}
  //             id={video.name}
  //             name="saveVid"
  //             onClick={event => {
  //               this.handleSaveFormSubmit(event, video);
  //             }}
  //           />
  //         </Provider>
  //       </BtnContainer>
  //     </Tile>
  //   );
  // });

  // renderIMDBVids = () =>
  //   this.state.tmdbVideos.map(video => {
  //     return (
  //       <Tile hoverOn={this.hoverOn} hoverOff={this.hoverOff}>
  //         <VidWrapper>
  //           {this.state.hover ? (
  //             <Iframe
  //               key={video.name}
  //               name={video.name}
  //               movieUrl={video.url}
  //               thumbUrl={video.bigImg}
  //             />
  //           ) : (
  //             <Thumb
  //               key={video.name}
  //               id={video.name}
  //               movieUrl={video.url}
  //               thumbUrl={video.bigImg}
  //               name="thumbnail"
  //             />
  //           )}

  //           <Title title={video.name} />
  //           <br />
  //         </VidWrapper>
  //         <br />
  //         <BtnContainer>
  //           <Provider template={AlertTemplate} {...options}>
  //             <SaveBtn
  //               value={video.url}
  //               key={`${video.url}-save`}
  //               id={video.name}
  //               name="saveVid"
  //               onClick={event => {
  //                 this.handleSaveFormSubmit(event, video);
  //               }}
  //             />
  //           </Provider>
  //           {/* <CommentBtn
  //             key={`${video.url}-comment`}
  //             value={this.state.featuredVid.url}
  //             name="CommentVid"
  //             onClick={this.handleCommentSubmit}
  //           /> */}
  //         </BtnContainer>
  //       </Tile>
  //     );
  //   });

  render() {
    // console.log(this.state.videosArr);
    const { loading, data } = this.state;

    return (
      <Fragment>
        <div className="mainWraper">
          <h1 className="">Reddit Hot</h1>
          <Wrapper ID="reddit">
            {loading ? "classic loading placeholder" : this.renderList(data)}
          </Wrapper>
        </div>
      </Fragment>
    );
    
      <h1 className="">IMDB Popular</h1>
        <Wrapper ID="imdb">{this.renderIMDBVids()}</Wrapper> 
    
    {
      /* <h1 className="">Youtube Popular</h1>
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
          </Wrapper> */
    }
    //     </div>
    //   );
  }
}
export default mainWrapper;
