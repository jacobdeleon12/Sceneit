import React from "react";
import "./style.css";

function Wrapper(props) {
  const left = () => {
    scrollLeft(document.getElementById(props.ID), -300, 500);
  };

  const right = () => {
    scrollLeft(document.getElementById(props.ID), 300, 500);
  };

  function scrollLeft(element, change, duration) {
    var start = element.scrollLeft,
      currentTime = 0,
      increment = 20;

    var animateScroll = function() {
      currentTime += increment;
      var val = Math.easeInOutQuad(currentTime, start, change, duration);
      element.scrollLeft = val;
      if (currentTime < duration) {
        setTimeout(animateScroll, increment);
      }
    };
    animateScroll();
  }

  //t = current time
  //b = start value
  //c = change in value
  //d = duration
  Math.easeInOutQuad = function(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  return (
    <div className="scrollWrapper ">
      <div className="scrollBtn" id="left-button" onClick={left}>
        <span className="scrollArrow">&lt;</span>
      </div>
      <div className="scroll_menu row__inner" id={props.ID}>
        {props.children}
      </div>
      <div className="scrollBtn" id="right-button" onClick={right}>
        <span className="scrollArrow"> &gt;</span>
      </div>
    </div>
  );
}

export default Wrapper;
