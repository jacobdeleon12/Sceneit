import React from "react";
import Contribute from "../components/Contribute";
import { MainNav } from "../components/Nav";
import Footer from "../components/Footer";

function ContributePg() {
  window.scrollTo(0, 0);

  return (
    <div>
      <MainNav />
      <Contribute />
      <Footer />
    </div>
  );
}

export default ContributePg;
