import React from "react";

const tile = props => {
  return (
    <div
      className="tile"
      onMouseEnter={props.hoverOn}
      onMouseLeave={props.hoverOff}
    >
      {props.children}
    </div>
  );
};

export default tile;
