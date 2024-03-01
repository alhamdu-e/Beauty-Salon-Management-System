import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../assets/styles/header.css";
import { useAuth } from "../context/Autcontext";

function Header(props) {
	const [token, setToken] = useState(localStorage.getItem("token"));
	const [userType, setUserType] = useState(localStorage.getItem("userType"));

	const logout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("userType");
		setToken(null);
		setUserType(null);
	};

	const services = () => {
		if (props.service.current) {
			window.scrollTo({
				top: props.service.current.offsetTop,
				behavior: "smooth",
			});
		}
	};

	return (
		<header>
			<div className="header-container">
				<div>
					<span className="logo">Glowcity</span>
				</div>
				<nav>
					<ul className="navigation">
						<li>
							<a href="#" className="navigation-link">
								Home
							</a>
						</li>

						<li>
							<a href="#" className="navigation-link" onClick={services}>
								Service
							</a>
						</li>

						{/* <li>
							<a href="#" className="navigation-link">
								Product
							</a>
						</li> */}

						<li>
							<Link to="/about" className="navigation-link">
								About
							</Link>
						</li>

						{!token && (
							<li>
								<Link to="/login" className="navigation-link join">
									Login
								</Link>
							</li>
						)}
						{token && userType === "user" && (
							<li>
								<Link className="navigation-link join" onClick={logout}>
									Logout
								</Link>
							</li>
						)}
					</ul>
				</nav>
			</div>
		</header>
	);
}

export default Header;
