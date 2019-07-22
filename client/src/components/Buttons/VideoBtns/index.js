import React from "react";
import "./style.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
export function DeleteBtn(props) {
  return (
    <button className="vidBtn delete-btn" {...props} role="button" tabIndex="0">
      ✗
    </button>
  );
}

export function SaveBtn(props) {
  return (
    <button className="vidBtn save-btn" {...props} role="button" tabIndex="0">
      Save &#10004;
    </button>
  );
}

export function ViewBtn(props) {
  return (
    <button className="vidBtn view-btn" {...props} role="button" tabIndex="0">
      View &#10004;
    </button>
  );
}