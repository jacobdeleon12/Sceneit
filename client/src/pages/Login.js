import React, { Component } from "react";
import { Col, Row, Container } from "../components/Grid";
import { GLogin} from "../components/Buttons/Google";
import NavBar from "../components/Nav/index";
import Background from "../components/splash";

class Login extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Background>
        </Background>
          <Container fluid>
            <Row>
              <Col size="sm-12">
                <div className="m-3 p-3 text-center">
                    <GLogin />
                  
                </div>
              </Col>
            </Row>
          </Container>
      </div>
    );
  }
}

export default Login;
