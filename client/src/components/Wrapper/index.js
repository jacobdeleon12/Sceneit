import React from "react";
import "./style.css";

export function Wrapper(props, ref) {
  return (
    <div className="vidContainer">
      <button id="slideLeft"  className="scrollBtn">
        &lt;
      </button>
      <div  className="scroll_menu">
        {props.children}
      </div>
      <button id="slideRight"  className="scrollBtn">
        &gt;
      </button>
    </div>
  );
}
