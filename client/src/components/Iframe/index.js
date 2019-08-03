import React from "react";
import "./style.css";

export function JumboIframe(props) {
  return (
    <iframe
      title={props.name}
      className="big_iframe"
      src={props.url}
      name={`iframe_video${props.id}`}
      frameBorder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  );
}

export function Iframe(props) {
  return (
    <iframe
      title={props.name}
      className="sml_iframe"
      src={props.url}
      name={`iframe_video${props.id}`}
      frameBorder="0"
      allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
}
export function Thumbnail(props) {
  return (
    <a href={props.img} target={`iframe_video${props.id}`}>
      <img alt={props.alt} src={props.img} />
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
