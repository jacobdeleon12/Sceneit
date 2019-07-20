import React from "react";
import "./style.css";

function Iframe(props) {
  return (
    <div className="card">
      {/* <div className="img-container"> */}
      {/* <img alt={props.name} src={props.image} /> */}
      <iframe width="560" height="315" src={"https://www.youtube.com/embed/" + props.id} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      {/* </div> */}
    </div>
  );
}

export default Iframe;
