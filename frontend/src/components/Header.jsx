import "../assets/styles/header.css";
import { Link } from "react-router-dom";
function Header(props) {
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

						<li>
							<a href="#" className="navigation-link">
								Product
							</a>
						</li>

						<li>
							<Link to="/about" className="navigation-link">
								About
							</Link>
						</li>

						<li>
							<Link to="/login" className="navigation-link join">
								Login
							</Link>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
}
export default Header;
