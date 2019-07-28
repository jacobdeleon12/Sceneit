import React from "react";
import "./style.css";

export function JumboIframe(props) {
  return (
    <iframe
      className="big_iframe"
      title={props.name}
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
      className="sml_iframe"
      title={props.name}
      src={props.movieUrl}
      frameBorder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  );
}

export function thumb(props) {
  return (
    <div className="sml_iframe">
      <img src={props.thumbUrl} />
    </div>
  );
}
