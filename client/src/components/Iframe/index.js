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

export function Iframe(props) {
  return (
    <iframe
      onMouseEnter={props.hoverOn}
      onMouseLeave={props.hoverOff}
      title={props.name}
      className="sml_iframe"
      src={props.url}
      // thumb-url={props.thumbUrl}
      // video-url={props.videoUrl}
      frameBorder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  );
}

export function Title(props) {
  return (
    <div className="tile__details">
      <div className="sml_title tile__title">{props.title}</div>
    </div>
  );
}
