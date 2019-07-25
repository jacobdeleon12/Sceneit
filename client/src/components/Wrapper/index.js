import React from "react";
import "./style.css";

const left = () => {
  scrollLeft(document.getElementById("content"), -1500, 1000);
};

const right = () => {
  scrollLeft(document.getElementById("content"), 1500, 1000);
};

function scrollLeft(element, change, duration) {
  var start = element.scrollLeft,
    currentTime = 0,
    increment = 20;

  console.log(start);

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

function Wrapper(props) {
  return (
    <div className="wrapper">
      <div className="scrollBtn" id="left-button" onClick={left}>
        &lt;
      </div>
      <div className="scroll_menu" id="content">
        {props.children}
      </div>
      <div className="scrollBtn" id="right-button" onClick={right}>
        &gt;
      </div>
    </div>
  );
}

export default Wrapper;
