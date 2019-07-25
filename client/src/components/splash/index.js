import "./style.css";
import React from "react";
import { Col, Row, Container } from "../Grid/index";
import Img from "./img/down-arrow2.png";

function background({ children }) {
  const Logo = "<Scene/ IT>"

  return (
    <div className="background">
      {children}
      <Container>
        <Row>
          <Col size="sm-12">
            <div className="m-3 p-3 ">
              <h1 className="splashHeadder1">Have you {Logo}?</h1>
              <h2 className="splashHeadder2">Its Time to catch up on Trending Videos</h2>
            </div>
          </Col>
        </Row>
        <Row>
          <Col size="sm-12">
            <div className="m-3 p-3 text-center">
              <img className="splashImg ball" alt="arrow" src={Img} />
              <br />
              <br />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default background;
