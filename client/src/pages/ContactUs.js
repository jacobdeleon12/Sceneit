import React from "react";
import Contact from "../components/ContactUs";
import { MainNav } from "../components/Nav";
import Footer from "../components/Footer";

function ContactUs() {
  window.scrollTo(0, 0);

  return (
    <div>
      <MainNav />
      <Contact />
      <Footer />
    </div>
  );
}

export default ContactUs;
