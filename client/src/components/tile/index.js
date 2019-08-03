import React from "./node_modules/react";

export function Tile(props) {
  return <div className="tile">{props.children}</div>;
};

export function JumboTile({ children }) {
  return (
    <div
      style={{ clear: "both", paddingTop: "2rem", paddingBottom: "2rem", textAlign: "center", marginTop: "1rem", }}
      className="jumbotron justify-content-center text-center"
    >
      {children}
    </div>
  );
}

