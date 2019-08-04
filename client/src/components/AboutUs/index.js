import React from "react";
import "./style.css";
import { Container, Col, Row } from "../Grid";

function AboutUS() {
  return (
    <div className="About">
      <Container className="fluid">
        <h1 className="text-center aboutHeader">The Dev Team</h1>

        <Row className="">
          <div className="text-left aboutEach">
            <img
              className="headShots mt-2"
              src="./Images/JacobHeadShot.JPG"
              alt="placeholder"
            ></img>
            <ul className="icons about-icons">
              <li>
                <a
                  href="https://github.com/jacobdeleon12"
                  target="blank"
                  className="github"
                >
                  <i className="fab fa-github" aria-hidden="false"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/jacob-deleon-65105892/"
                  target="blank"
                  className="linkedin"
                >
                  <i className="fab fa-linkedin-in" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a
                  className="user-circle"
                  href="https://jacobdeleonportfolio.herokuapp.com/"
                  target="blank"
                >
                  <i className="fa fa-user-circle" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a
                  className="envelope-square"
                  target="blank"
                  href="mailto:jacobdeleon122@gmail.com"
                >
                  <i className="fa fa-envelope-square" aria-hidden="true"></i>
                </a>
              </li>
            </ul>
          </div>
          <div className="Description">
            <h3>Jacob DeLeon</h3>
            <p>
              Full Stack Web Developer with a Background in design and
              animation. Attended Both Washington State University and
              University of Washington and to obtain a bachelor’s in Digital
              Technology and Full Stack Web Development certificate. Passionate
              about technology and creativity which led to a path of schooling,
              work experience, and teamwork which strengthened communication
              skills, and the ability to connect with all individuals. This
              combination enabled proficiencies in: Html, CSS, JavaScript,
              jQuery, Node, React. As a result, I built many successful
              projects. Currently, pursuing a position as a Full Stack Web
              Developer molded and sculpted from education and experience to be
              one of the very best developers a technological company would
              desire.
            </p>
          </div>
        </Row>

        <Row>
          <Col size="12">
            <div className="text-left row aboutEach">
              <img
                className="col-12 col-sm-4 col-md-3 headShots mt-2"
                src="./Images/KaiHeadShot.JPG"
                alt="placeholder"
                style={{ height: "250px" }}
              ></img>

              <p className="col Description">
                <h3 className="headerName">Kai Richardson</h3>
                <p>
                  I'm a Solutions-driven Back End Web Developer applying IT
                  background and strong technical skill set towards building
                  functional server-side applications, currently based in
                  Shoreline WA. I love everything that has to do with web design
                  and development, server design, graphic design, CGI and am
                  currently attending a full-stack web dev bootcamp through UW.
                </p>
                <p>
                  I have three years of experience working as a Tech Support
                  agent focused on providing an optimal customer experience for
                  a local videogame company and am ready to expand my career to
                  a more web-centric environment. I love working with people,
                  especially if they have the same passion I have, for what they
                  do.
                </p>
              </p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col size="12">
            <div className="text-left row aboutEach">
              <img
                className="col-12 col-sm-4 col-md-3 headShots mt-2"
                src="./Images/BlakeHeadShot.png"
                alt="placeholder"
                style={{ height: "250px" }}
              ></img>

              <h3 className="headerName">
                Hello world! My name is Blake Marter.
              </h3>
              <p className="col Description">
                <p>
                  As a driven and tech-savvy Web Developer, I have always had a
                  strong gravitational pull towards technology. I am currently
                  pursuing an intensive Web Development Coding Certification at
                  the University of Washington.
                </p>
                <p>
                  I am gaining experience in the foundations of web development
                  while honing my skills in HTML5, CSS, Bootstrap, Javascript,
                  jQuery, Node.js, MySQL & Mongo. Having an appetite for
                  continuous learning, collaboration, and problem-solving, I
                  plan to create and maintain websites, while also developing
                  iOS & Android apps. Equally passionate about building
                  applications that assist everyday people to make their lives
                  easier. Looking to bring my attention to detail and technical
                  skills to a company to grow and become a valuable asset.
                </p>
              </p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col size="12">
            <div className="text-left row aboutEach">
              <img
                className="col-12 col-sm-4 col-md-3 headShots mt-2"
                src="./Images/KalebHeadShot.jpg"
                alt="placeholder"
                style={{ height: "250px" }}
              ></img>

              <h3 className="headerName">Kaleb Merriman</h3>
              <p className="col Description">
                Full stack web developer with great time management skills as
                well as a great teammate and co-worker. in SQL and Javascript
                environments. Very adaptive and fast with the intake of new
                concepts and languages. Comprehensive and able to debug code
                quickly and cleanly. Task oriented, prioritizes code to get the
                necessary tasks done first, then moves on to upgradeable
                features.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AboutUS;
