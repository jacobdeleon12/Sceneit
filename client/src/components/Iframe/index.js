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
      // width="800"
      // height="400"
      title={props.name}
      className="sml_iframe"
      src={props.url}
      name={`iframe_video${props.id}`}
      frameBorder="0"
      allow="accelerometer; gyroscope; autoplay; picture-in-picture; fullscreen"
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
    <div className="title_wrap">
      <h3 className="sml_title">{props.title}</h3>
    </div>
  );
}
