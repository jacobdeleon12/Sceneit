import React from "react";
import "./style.css";
import { Container, Row } from "../Grid";
import { Link } from "react-router-dom";

function Contribute() {
  const name = "<Scene/ IT> ";
  return (
    <div className="About">
      <Container className="fluid">
        <Row>
          <h1 className="header">Do want to join our team?!</h1>
        </Row>
        <Row>
          <p className="txt">
            {name} was our last project for our FullStack Web Development class.
            If you would like to Contribute to our page please reach out to one
            of us <Link to="/AboutUs">HERE.</Link>
          </p>
        </Row>
      </Container>
    </div>
  );
}

export default Contribute;
