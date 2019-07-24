import React from "react";
import "./style.css";

function Userwrap(props) {
  return (
    <div className="wrapper container">
      {props.children}
    </div>
  );
}

export default Userwrap;
