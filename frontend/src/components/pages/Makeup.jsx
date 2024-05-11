import React, { useState } from "react";
import Header from "../Header";
import "../../assets/styles/makeup.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Makeup(props) {
	const [service, SetService] = useState([]);

	useEffect(() => {
		fetch("http://127.0.0.1:5000/service", {
			method: "GET",
		})
			.then((response) => response.json())
			.then((data) => {
				SetService(data);
			});
	}, []);
	const handleservicehour = (hour) => {
		props.setServiceHour(hour);
	};
	const handleServiceID = (serviceID) => {
		props.setServiceID(serviceID);
	};
	const handleServicePrice = (servicePrice) => {
		props.setServicePrice(servicePrice);
	};
	const userType = localStorage.getItem("userType");

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
									Duration:
									<span className="duration">{service.serviceduration}hrs</span>
								</p>
								<div className="price1">
									<span className="home-price">
										Salon Price:
										<span className="duration">
											{service.serviceprice} Birr
										</span>
									</span>
								</div>
								{/* <div className="price2">
									<span className="salon-price">
										Home Price:
										<span className="duration">
											{service.servicehomeprice} Birr
										</span>
									</span>
								</div> */}
								<div className="link-cont">
									{/* <Link className="home" to="/appointment">
										Book Home
									</Link> */}

									{userType === "profesional" && (
										<button
											style={{
												margin: "0px",
												border: "none",
												cursor: "not-allowed",
											}}
											disabled
											className="salon">
											Book Salon
										</button>
									)}
									{userType === "admin" && (
										<button
											style={{
												margin: "0px",
												border: "none",
												cursor: "not-allowed",
											}}
											disabled
											className="salon">
											Book Salon
										</button>
									)}
									{userType === "user" && (
										<Link
											className="salon"
											to="/appointment"
											onClick={() => {
												handleservicehour(service.serviceduration);
												handleServiceID(service.id);
												handleServicePrice(service.serviceprice);
												localStorage.setItem(
													"servicceName",
													service.servicename
												);
											}}>
											Book Salon
										</Link>
									)}
									{userType === null && (
										<Link className="salon" to="/login">
											Book Salon
										</Link>
									)}
								</div>
							</div>
						</div>
					))}
				{service.length == 0 && <h1>No Service Added</h1>}
			</div>
		</div>
	);
}
