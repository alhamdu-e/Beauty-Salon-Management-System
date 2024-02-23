import React from "react";
import Header from "../Header";
import "../../assets/styles/about.css";
export default function About() {
  return (
    <div>
      <Header />
      <div className="about-whole">
        <img src="./images/about22.png" alt="" className="about-image" />
      </div>
      <div className="downone">
        {" "}
        <img src="./images/G9.jpg" alt="" className="about-image2" />
        <p className="aboutpar">
          Glow City Salon is a premier destination for beauty and wellness,
          where we believe in enhancing your natural glow. Our talented team of
          experienced stylists and estheticians is dedicated to providing
          personalized services that leave you feeling confident and radiant. We
          strive to create a haven of relaxation and self-care. Step into Glow
          City Salon and let us help you embrace your inner and outer beauty.
        </p>
        <hr className="abouthr" />
      </div>
    </div>
  );
}
