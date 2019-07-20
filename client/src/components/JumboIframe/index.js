import React from "react";
import "./style.css";

function JumboIframe(props) {
  return (
    <div className="pb-0 card text-center justify-content-center" style={{width: "100%", margin: "auto"}}>
      {/* <div className="img-container"> */}
      {/* <img alt={props.name} src={props.image} /> */}
      <iframe title={props.name} style={{height: "100%"}} src={"https://www.youtube.com/embed/" + props.YTstr } frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      {/* </div> */}
    </div>
  );
}

export default JumboIframe;