import React from "react";
import "./style.css";

function Wrapper(props) {
  return (
    <div className=".wrapper">
      <div className="scroll_menu">
        <div id="slideLeft" className="scrollBtn">
          &lt;
        </div>
        {props.children}
        <div id="slideRight" className="scrollBtn">
          &gt;
        </div>
      </div>
    </div>
  );
}

export default Wrapper;
