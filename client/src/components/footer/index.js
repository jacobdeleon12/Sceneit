import React from "react";
import { Link } from "react-router-dom"
import "./style.css";

function footer() {
  const name = "<Scene/IT>™"
  return (
    <div className="footer">
      <footer class="site-footer">
        <div class="container">
          <div class="row">
            <div class="col-sm-12 col-md-6">
              <h6>About</h6>
              <p class="text-justify">
                {name} <i>WANTS TO BE THE YOUR BEST VIDEO STREAMING SITE. </i>
                We are here to provide the a network that will connect users to many video services as a one stop shop of video enjoyment.
                <br/>
                Jacob - “I LOVE internet videos and HATE having multiple tabs/windows open on my browser. I want one place to find all my videos, and to save the ones that I want to view again. “
                <br/>
                Jacob is a typical internet user that wants an enjoyable experience viewing all of his videos without being interrupted by switching between different sites.
                <br/>
                We at {name} will provide this experience for him and anyone like him.
    

              </p>
            </div>

            <div class="col-xs-6 col-md-3">
              <h6>Categories</h6>
              <ul class="footer-links">
                <li>
                  <Link to="http://scanfcode.com/category/c-language/"></Link>
                </li>
                <li>
                  <Link to="http://scanfcode.com/category/front-end-development/">
                    UI Design
                 </Link>
                </li>
                <li>
                  <Link to="http://scanfcode.com/category/back-end-development/">
                    PHP
                 </Link>
                </li>
                <li>
                  <Link to="http://scanfcode.com/category/java-programming-language/">
                    Java
                 </Link>
                </li>
                <li>
                  <Link to="http://scanfcode.com/category/android/">Android</Link>
                </li>
                <li>
                  <Link to="http://scanfcode.com/category/templates/">
                    Templates
                 </Link>
                </li>
              </ul>
            </div>

            <div class="col-xs-6 col-md-3">
              <h6>Quick Links</h6>
              <ul class="footer-links">
                <li>
                  <Link to="http://scanfcode.com/about/">About Us</Link>
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
        <div class="container">
          <div class="row">
            <div class="col-md-8 col-sm-6 col-xs-12">
              <p class="copyright-text">
                Copyright &copy; 2017 All Rights Reserved by
                <Link to="https://github.com/jacobdeleon12/Sceneit">{name}</Link>.
              </p>
            </div>

            <div class="col-md-4 col-sm-6 col-xs-12">
              <ul class="social-icons">
                <li>
                  <Link class="facebook" to="#">
                    <i class="fa fa-facebook"></i>
                 </Link>
                </li>
                <li>
                  <Link class="twitter" to="#">
                    <i class="fa fa-twitter"></i>
                 </Link>
                </li>
                <li>
                  <Link class="dribbble" to="#">
                    <i class="fa fa-dribbble"></i>
                 </Link>
                </li>
                <li>
                  <Link class="linkedin" to="#">
                    <i class="fa fa-linkedin"></i>
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

export default footer;