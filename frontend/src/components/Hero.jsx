import "../assets/styles/hero.css";
import { Link } from "react-router-dom";
import React from "react";

function Hero() {
	return (
		<div>
			<div className="hero-conatiner">
				<div>
					<h1>Welcome To GlowCity Discover Your True Beauty</h1>
					<p className="desciption">
						Our salon is dedicated to helping you achieve your dream hairstyle
						while providing excellent customer service. We offer a variety of
						services including haircuts, hair treatments, and styling
					</p>
					<a href="" className="explormore">
						Explore More
					</a>
					<Link to="/signup" className="enrolltoday">
						Join Us Today
					</Link>
				</div>
				<div className="hero-image-container">
					<img src="./images/G8.jpg" alt="" className="hero-image" />
				</div>
			</div>
			<div className="best-container">
				<span className="slogan">the Best in the City</span>
			</div>
		</div>
	);
}

export default Hero;
