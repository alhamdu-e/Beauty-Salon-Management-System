import React, { useState } from "react";
import Header from "../Header";
import "../../assets/styles/makeup.css";
import { useEffect } from "react";

export default function Makeup() {
  const [service, SetService] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/service", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => SetService(data));
  }, []);

  return (
    <div>
      <Header />

      <div className="serviceall">
        {service.length > 0 &&
          service.map((service) => (
            <div className="makeup-container">
              <div>
                <img
                  src={service.serviceimage}
                  alt=""
                  className="makeup-image"
                />
              </div>
              <div className="makeup-content">
                <p className="makeup-name">{service.servicename}</p>
                <p className="makeup-desc">{service.servicedesc}</p>
                <p className="makeup-duration">
                  Duration:{service.serviceduration}hrs
                </p>
                <div className="price1">
                  <span className="home-price">
                    Salon Price:{service.serviceprice} Birr
                  </span>
                </div>
                <div className="price2">
                  <span className="salon-price">
                    Home Price:{service.servicehomeprice} Birr
                  </span>
                </div>
                <div className="link-cont">
                  <a href="" className="home">
                    Home
                  </a>
                  <a href="" className="salon">
                    Salon
                  </a>
                </div>
              </div>
            </div>
          ))}
        {service.length == 0 && <h1>No Service Added</h1>}
      </div>
    </div>
  );
}
