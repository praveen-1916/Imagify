import React from "react";
import NavBar from "../components/Navbar";
import Home from "../components/Home";
import Working from "../components/Working";
import CoustomerReviews from "../components/CoustomerReviews";
import About from "../components/About";
import Footer from "../components/Footer";

function Landing() {
  // background: linear-gradient(180deg, #F2FFF9 0%, #FFF6F1 100%);
  return (
    <>
      <NavBar />
      <Home />
      <Working />
      <About />
      <CoustomerReviews />
      <Footer />
    </>
  );
}

export default Landing;
