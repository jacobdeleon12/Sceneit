import React from "react";
import "./style.css";

export function JumboIframe(props) {
  return (
    <iframe
      title={props.name}
      className="big_iframe"
      name-video={props.name}
      src={props.movieUrl}
      frameBorder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  );
}

// export function FrameWrap(props) {
//   const frame = '';
//   return (
//     <div
//       className="sml_iframe_container"
//       onMouseEnter={frame = <Iframe name={video.name} url={video.url} id={i}/>}
//       onMouseLeave={frame = <Thumbnail img={video.bigImg} id={i} />}
//     >{frame}</div>
//   );
// }
export function Iframe(props) {
  return (
    <iframe
      title={props.name}
      className="sml_iframe"
      src={props.url}
      frameBorder="0"
      name={`iframe_video${props.id}`}
      allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
}
export function Thumbnail(props) {
  return (
    <a href={props.img} target={`iframe_video${props.id}`}>
      <img src={props.img} />
    </a>
  );
}

export function Title(props) {
  return (
    <div className="tile__details">
      <div className="sml_title tile__title">{props.title}</div>
    </div>
  );
}
