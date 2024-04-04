import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/styles/header.css";
import { useAuthContext } from "../context/Autcontext";
import { useUserContext } from "../context/UserContext";
import { useCartContext } from "../context/cartcontext";
function Header(props) {
	const { token, setToken, setUserType, usertype } = useAuthContext();
	const { cartLength } = useCartContext();
	const { userId, userName } = useUserContext();
	const navigate = useNavigate();

	const logout = () => {
		localStorage.removeItem("token");
		setToken("");
		setUserType("");
		navigate("/", { replace: true });
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
							<Link to="/" className="navigation-link">
								Home
							</Link>
						</li>

						<li>
							<a href="#" className="navigation-link" onClick={services}>
								Service
							</a>
						</li>

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

						{token && usertype === "user" && (
							<li>
								<Link className="navigation-link join" to="/cart">
									cart {cartLength}
								</Link>
							</li>
						)}
						{token && usertype === "user" && (
							<li>
								<Link
									className="navigation-link join"
									to="/customerappointment">
									appointment
								</Link>
							</li>
						)}
						{token && usertype && (
							<>
								<li>
									<div class="dropdown">
										<button class="dropbtn">
											<p className="userProfile">Hello,{userName}</p>
											<p className="userProfile">Account &#9660;</p>
										</button>
										<div class="dropdown-content">
											<button onClick={logout}>sign out</button>
										</div>
									</div>
								</li>
							</>
						)}
					</ul>
				</nav>
			</div>
		</header>
	);
}

export default Header;
