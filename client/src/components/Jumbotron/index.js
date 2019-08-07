import React from "react";
import "./style.css";

function Jumbotron({ children }) {
  return (
    <div
      style={{ background: "rgb(52, 58, 64)", clear: "both", paddingTop: "2rem", paddingBottom: "2rem", textAlign: "center", marginTop: "1rem", }}
      className="jumbotron justify-content-center text-center"
    >
      {children}
    </div>
  );
}

export default Jumbotron;
