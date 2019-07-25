import React from "react";
import "./style.css";

export function JumboIframe(props) {
  return (
    <div className="pb-0 card text-center">
      <iframe
        title={props.name}
        style={{ height: "100%" }}
        src={"https://www.youtube.com/embed/" + props.YTstr}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export function Iframe(props) {
  return (
    <div className="iFrame card pb-0 text-center">
      <iframe
        title={props.name}
        src={"https://www.youtube.com/embed/" + props.YTstr}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}
