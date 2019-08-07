import React from "react";
import "./style.css";


export function Tile(props) {
  return (
    <div
      className="tile"
    >
      {props.children}
    </div>
  );
}

export function JumboTile({ children }) {
  return (
    <div
      style={{
        background: "rgb(52, 58, 64)",
        clear: "both",
        paddingTop: "2rem",
        paddingBottom: "2rem",
        textAlign: "center",
        marginTop: "1rem"
      }}
      className="jumbotron justify-content-center text-center"
    >
      {children}
    </div>
  );
}
