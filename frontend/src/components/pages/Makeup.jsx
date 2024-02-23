import React from "react";
import Header from "../Header";
import "../../assets/styles/makeup.css";

export default function Services() {
  return (
    <div>
      <Header />
      <div className="makeup-container">
        <img src="./images/G9.jpg" alt="" className="makeup-image" />

        <div className="makeup-content">
          <p className="makeup-name">Bridal Makeup</p>
          <p className="makeup-desc">
            ensuring you radiate elegance and confidence as you walk down the
            aisle
          </p>
          <div className="pricess">
            <span className="home-price">15000 Birr</span>
            <a href="" className="home">
              Home
            </a>
            <span className="salon-price">15000 Birr</span>
            <a href="" className="salon">
              Salon
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
