import "../assets/styles/services.css";
import { Link } from "react-router-dom";
import React from "react";

function Services(props) {
	return (
		<div>
			<p className="servicefeature" ref={props.service}>
				Services
			</p>
			<div className="service-provided">
				<div>
					<img src="./images/G10.jpg" alt="" className="service-image" />
					<p className="servicetype">MakeUp</p>
					<p className="servicetype-description">
						Enhance your natural beauty and take your look to the next level
						with our makeup collection.
					</p>
					<Link className="more" to="/makeup">
						More
					</Link>
				</div>
				<div>
					<img src="./images/G12.jpg" alt="" className="service-image" />
					<p className="servicetype">Nail Design</p>
					<p className="servicetype-description">
						Make statement with our captivating nail designs and let your
						fingertips do the talking
					</p>
					<Link className="more" to="/makeup">
						More
					</Link>
				</div>
				<div>
					<img src="./images/G7.jpg" alt="" className="service-image" />
					<p className="servicetype">Hair Braids</p>
					<p className="servicetype-description">
						Get ready to turn heads with stunning hair braids that elevate your
						look to the next level
					</p>
					<Link className="more" to="/makeup">
						More
					</Link>
				</div>
			</div>
		</div>
	);
}
export default Services;
