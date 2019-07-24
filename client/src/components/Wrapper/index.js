import React from "react";
import "./style.css";

function Wrapper(props) {
  return (
    <nav class=".wrapper">
      <div className="scroll_menu">{props.children}</div>
    </nav>
  );
}

export default Wrapper;
