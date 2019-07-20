import React from "react";

function Jumbotron({ children }) {
  return (
    <div
      style={{ clear: "both", paddingTop: "2rem", textAlign: "center",  marginTop: "2rem", }}
      className="jumbotron justify-content-center text-center"
    >
      {children}
    </div>
  );
}

export default Jumbotron;
