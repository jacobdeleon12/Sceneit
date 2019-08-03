import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

function Footer() {
  const name = "<Scene/IT>™";
  return (
    <div className="footer">
      <footer className="site-footer">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-6">
              <h6>About</h6>
              <p className="text-justify">
                {name} <i>WANTS TO BE YOUR FAVORITE VIDEO STREAMING SITE. </i>
                We are here to provide the a network that will connect users to
                many video services as a one stop shop of video enjoyment.
                <br />
                Jacob - “I LOVE internet videos and HATE having multiple
                tabs/windows open on my browser. I want one place to find all my
                videos, and to save the ones that I want to view again. “
                <br />
                Jacob is a typical internet user that wants an enjoyable
                experience viewing all of his videos without being interrupted
                by switching between different sites.
                <br />
                We at {name} will provide this experience for him and anyone
                like him.
              </p>
            </div>

            <div className="col-xs-6 col-md-3">
              <h6>Technologies Used</h6>
              <ul className="footer-links">
                <li>
                  <Link
                    target="_blank"
                    to="http://scanfcode.com/category/c-language/"
                  ></Link>
                </li>
                <li>
                  <a href="https://reactjs.org/">React</a>
                </li>
                <li>
                  <a href="https://nodejs.org/en/about/">Node</a>
                </li>
                <li>
                  <a href="https://en.wikipedia.org/wiki/JavaScript">
                    JavaScript
                  </a>
                </li>
                <li>
                  <a href="https://www.npmjs.com/">npmjs</a>
                </li>
                <li>
                  <a href="https://developers.google.com/identity/sign-in/web/sign-in">
                    Google Authentication
                  </a>
                </li>
                <li>
                  <a href="https://www.mongodb.com/">Mongo DB</a>
                </li>
              </ul>
            </div>

            <div className="col-xs-6 col-md-3">
              <h6>Quick Links</h6>
              <ul className="footer-links">
                <li>
                  <Link to="/AboutUs">About Us</Link>
                </li>
                <li>
                  <Link to="http://scanfcode.com/contact/">Contact Us</Link>
                </li>
                <li>
                  <Link to="http://scanfcode.com/contribute-at-scanfcode/">
                    Contribute
                  </Link>
                </li>
                <li>
                  <Link to="http://scanfcode.com/privacy-policy/">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="http://scanfcode.com/sitemap/">Sitemap</Link>
                </li>
              </ul>
            </div>
          </div>
          <hr />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-sm-6 col-xs-12">
              <p className="copyright-text">
                Copyright &copy; 2017 All Rights Reserved by
                <Link to="https://github.com/jacobdeleon12/Sceneit">
                  {name}
                </Link>
                .
              </p>
            </div>

            <div className="col-md-4 col-sm-6 col-xs-12">
              <ul className="social-icons">
                <li>
                  <Link className="facebook" to="#">
                    <i className="fa fa-facebook"></i>
                  </Link>
                </li>
                <li>
                  <Link className="twitter" to="#">
                    <i className="fa fa-twitter"></i>
                  </Link>
                </li>
                <li>
                  <Link className="dribbble" to="#">
                    <i className="fa fa-dribbble"></i>
                  </Link>
                </li>
                <li>
                  <Link className="linkedin" to="#">
                    <i className="fa fa-linkedin"></i>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
