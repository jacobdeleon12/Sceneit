import "./style.css";
import React from "react";
import { Col, Row, Container } from "../Grid/index";
import Img from "./img/down-arrow2.png";

function background({ children }) {
  return (
    <div className="background">
      {children}
      <Container>
        <Row>
          <Col size="sm-12">
            <div className="m-3 p-3 ">
              <h1 className = "splashHeadder1">Are You Ready?</h1>
              <h2 className = "splashHeadder2">Its Time to catch up on Trending Videos</h2>
            </div>
          </Col>
        </Row>
        <Row>
          <Col size="sm-12">
            <div className="m-3 p-3 text-center">
              <img className="splashImg" alt="arrow" src={Img} className = "ball"></img>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default background;
