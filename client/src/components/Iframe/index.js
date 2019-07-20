import React from "react";
import "./style.css";

function Iframe(props) {
  return (
    <div className="pb-0 card text-center" style={{width: "18rem", height: "152px"}}>
      {/* <div className="img-container"> */}
      {/* <img alt={props.name} src={props.image} /> */}
      <iframe title={props.name} src={"https://www.youtube.com/embed/" + props.YTstr} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      {/* </div> */}
    </div>
  );
}

export default Iframe;