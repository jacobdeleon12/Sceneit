import React, { Component } from "react";
import { Col, Row, Container } from "../components/Grid";
import NavBar from "../components/Nav/index";
import Background from "../components/splash";
import { GLogin } from "../components/Buttons/Google";

class Login extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Background>
        </Background>
          <Container fluid>
            <Row>
              <div className="col-sm-12 splash">
                <div className="m-3 p-3 text-center">
                  <GLogin />
                </div>
              </div>
            </Row>
          </Container>
      </div>
    );
  }
}

export default Login;
