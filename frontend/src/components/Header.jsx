import "../assets/styles/header.css";
function Header() {
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
							<a href="#" className="navigation-link">
								Service
							</a>
						</li>

						<li>
							<a href="#" className="navigation-link">
								Product
							</a>
						</li>

						<li>
							<a href="#" className="navigation-link">
								About
							</a>
						</li>

						<li>
							<a href="#" className="navigation-link join">
								Join Us
							</a>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
}
export default Header;
