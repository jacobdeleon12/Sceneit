import React from "react";
import "./style.css";

function Wrapper(props) {
  return <div className="scrollmenu wrapper container">{props.children}</div>;
}

export default Wrapper;
