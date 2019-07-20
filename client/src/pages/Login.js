import React, { Component } from "react";
import { Col, Row, Container } from "../components/Grid";
<<<<<<< HEAD
import { GLogin } from "../components/Buttons/Google/index";
import NavBar from "../components/Nav/index";
=======
import { GLogin, GLogout } from "../components/Buttons/Google/login";
>>>>>>> master

class Login extends Component {

    render() {
        return (
<<<<<<< HEAD
            <div>
                <NavBar />
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
=======
            <Container fluid>
                <Row>
                    <Col size="sm-12">
                        <div className="m-3 p-3 text-center">
                            <GLogin />
                            <GLogout />
                        </div>
                    </Col>
                </Row>
            </Container>
>>>>>>> master
        );
    };
};

export default Login;