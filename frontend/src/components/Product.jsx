import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../assets/styles/product.css";
import "../assets/styles/detailproduct.css";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { useCartContext } from "../context/cartcontext";
import { useAuthContext } from "../context/Autcontext";
function Product() {
	const { cartLength, items, setItems, setCartLength } = useCartContext();
	const [product, setProduct] = useState([]);
	const { userId } = useUserContext();
	const navigate = useNavigate();
	// const { usertype } = useAuthContext();
	// console.log(usertype, "hiii");
	// const [cart, setCart] = useState(items);
	// alert(usertype);
	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const response = await fetch("http://127.0.0.1:5000/product", {
					method: "Get",
				});
				const data = await response.json();
				console.log(data);
				setProduct(data);
			} catch (e) {
				console.log(e);
			}
		};
		fetchProduct();
	}, []);

	const handleAddtocart = async () => {
		if (!userId) {
			navigate("/login");
			return false;
		}
		const productId = Number(localStorage.getItem("productDetailID"));
		if (items.length > 0) {
			const isItemIsOnTheCart = items.filter((p) => p.id == productId);
			if (isItemIsOnTheCart.length > 0) {
				alert("item is on the cart");
				return false;
			}
		}

		const response = await fetch(
			`http://127.0.0.1:5000/addtocart/${productId}`,
			{
				method: "POST",
				body: JSON.stringify({ userId }),
				headers: { "Content-Type": "application/json" },
			}
		);

		if (response.ok) {
			const cart = await response.json();
			setItems(cart);
			setCartLength(cart.length);
		}
	};
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
		infinite: true,
		slidesToShow: 2,
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
			{product?.length > 0 && (
				<div className="productframe">
					<p className="productfeature">Products</p>

					<Slider {...settings}>
						{product.map((product) => (
							<div className="producteachframe">
								<img
									src={product.productimage}
									alt=""
									className="product-image"
								/>
								<p className="product-title">{product.productname}</p>
								<p className="product-price">{product.productprice} Birr</p>

								<button
									onClick={() => {
										localStorage.setItem("productDetailID", product.id);
										handleAddtocart();
									}}>
									Add to Cart
								</button>
							</div>
						))}
					</Slider>
				</div>
			)}
		</div>
	);
}
export default Product;
