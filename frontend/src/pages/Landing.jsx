import React from "react";
import NavBar from "../components/Navbar";
import Home from "../components/Home";

function Landing() {
  // background: linear-gradient(180deg, #F2FFF9 0%, #FFF6F1 100%);
  return (
    <>
      <div className="bg-gradient-to-b from-[#F2FFF9] to-[#FFF6F1]">
        <NavBar />
        <Home />
      </div>
    </>
  );
}

export default Landing;
