import React, { Component } from "react";
import { Col, Row, Container } from "../components/Grid";
import { GLogin, GLogout } from "../components/Buttons/Google/login";

class Login extends Component {


    render() {
        // const responseGoogle = (response) => {
        //   console.log(response);
        // }
        return (
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
        );
    }
};

export default Login;