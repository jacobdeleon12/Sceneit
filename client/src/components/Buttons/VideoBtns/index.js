import React from "react";
import "./style.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
export function DeleteBtn(props) {
  return (
    <button className="vidBtn delete-btn" {...props} tabIndex="0">
      Delete <span role="img" aria-label="sad-eyes">😭</span>
    </button>
  );
}

export function SaveBtn(props) {
  return (
    <button className="vidBtn save-btn" {...props} tabIndex="0">
      Save <span role="img" aria-label="heart-eyes">😍</span>
    </button>
  );
}

export function ViewBtn(props) {
  return (
    <button className="vidBtn view-btn" {...props} tabIndex="0">
      View <span role="img" aria-label="star-eyes">🤩</span>
    </button>
  );
}

export function CommentBtn(props) {
  return (
    <button className="vidBtn view-btn" {...props} tabIndex="0">
      Comment <span role="img" aria-label="laugh-eyes">😂</span>
    </button>
  );
}

export function BtnContainer({ children }) {
  return <div className="btnGroup">{children}</div>;
}
