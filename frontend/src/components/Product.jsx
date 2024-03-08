import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../assets/styles/product.css";

import React, { useRef } from "react";

function Product() {
	let sliderRef = useRef(null);
	function SampleNextArrow(props) {
		const { className, style, onClick } = props;
		return (
			<div
				className={className}
				style={{
					...style,
					display: "block",
					background: "black",
					width: "40px",
					height: "40px",
					textAlign: "center",
					padding: "10px 0 0 0",
					borderRadius: "50%",
					zIndex: "4",
				}}
				onClick={onClick}
			/>
		);
	}

	function SamplePrevArrow(props) {
		const { className, style, onClick } = props;
		return (
			<div
				className={className}
				style={{
					...style,
					display: "block",
					display: "block",
					background: "black",
					width: "40px",
					height: "40px",
					textAlign: "center",
					padding: "10px 0 0 0",
					borderRadius: "50%",
					zIndex: "4",
				}}
				onClick={onClick}
			/>
		);
	}
	const settings = {
		dots: true,
		infinite: true,
		slidesToShow: 5,
		slidesToScroll: 1,
		nextArrow: <SampleNextArrow />,
		prevArrow: <SamplePrevArrow />,
		autoplay: true,
		autoplaySpeed: 4000,
		cssEase: "linear",
		// centerMode: true,
	};

	return (
		<div>
			<div className="productframe">
				<p className="productfeature">Products</p>

				<Slider {...settings}>
					<div className="producteachframe">
						<img
							src="./images/extension.jpg"
							alt=""
							className="product-image"
						/>
						<p className="product-title">Hair Extension</p>
						<p className="product-price">15000 Birr</p>
					</div>
					<div className="producteachframe">
						<img src="./images/masc.jpg" alt="" className="product-image" />
						<p className="product-title">Wonder Mascara</p>
						<p className="product-price">1000 Birr</p>
					</div>
					<div className="producteachframe">
						<img
							src="./images/foundation.png"
							alt=""
							className="product-image"
						/>
						<p className="product-title">MAC Foundation</p>
						<p className="product-price">5000 Birr</p>
					</div>
					<div className="producteachframe">
						<img src="./images/neutro.jpg" alt="" className="product-image" />
						<p className="product-title">Facial Wash </p>
						<p className="product-price">3000 Birr</p>
					</div>
					<div className="producteachframe">
						<img src="./images/OIP.jpg" alt="" className="product-image" />
						<p className="product-title">Makeup Brushes</p>
						<p className="product-price">1100 Birr</p>
					</div>
				</Slider>
				{/* <button onClick={previous}>Previous</button> */}
				{/* <button onClick={next}>Next</button> */}
			</div>
		</div>
	);
}
export default Product;
