import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import { Container, Col, Row } from "../Grid";

function AboutUS() {
  const name = "<Scene/IT>™";
  return (
    <div className="About">
      <Container className="fluid">
        <Row>
          <Col size="12">
          <img src = "https://via.placeholder.com/150" alt="placeholder"></img>
          <p>here is some text</p>

          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AboutUS;
