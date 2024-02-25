import React from "react";
import Header from "../Header";
import "../../assets/styles/makeup.css";

export default function Makeup() {
  return (
    <div className="serviceall">
      <Header />
      <div className="makeup-container">
        <img src="./images/G9.jpg" alt="" className="makeup-image" />
        <div className="makeup-content">
          <p className="makeup-name">Bridal Makeup</p>
          <p className="makeup-desc">
            Ensuring you Radiate Elegance and confidence as you walk down the
            Aisle
          </p>
          {/* <p className="makeup-duration">Duartion: 2hrs</p> */}
          <div className="price1">
            <span className="home-price">15000 Birr</span>
            <a href="" className="home">
              Home
            </a>
          </div>
          <div className="price2">
            <span className="salon-price">15000 Birr</span>
            <a href="" className="salon">
              Salon
            </a>
          </div>
        </div>
      </div>
      <div className="makeup-container">
        <img src="./images/G9.jpg" alt="" className="makeup-image" />
        <div className="makeup-content">
          <p className="makeup-name">Bridal Makeup</p>
          <p className="makeup-desc">
            Ensuring you Radiate Elegance and confidence as you walk down the
            Aisle
          </p>
          {/* <p className="makeup-duration">Duartion: 2hrs</p> */}
          <div className="price1">
            <span className="home-price">15000 Birr</span>
            <a href="" className="home">
              Home
            </a>
          </div>
          <div className="price2">
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
