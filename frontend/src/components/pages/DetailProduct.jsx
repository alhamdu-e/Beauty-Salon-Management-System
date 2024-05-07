// import React, { useContext, useEffect, useState } from "react";
// import "../../assets/styles/detailproduct.css";
// import Header from "../Header";
// import { useUserContext } from "../../context/UserContext";

// export default function DetailProduct({ addToCart }) {
// const { productid } = useContext(Authcontext);
// 	const [productDetail, setProductDetail] = useState([]);
// 	const { userId } = useUserContext();

// 	useEffect(() => {
// 		const handleEditProduct = async () => {
// 			const response = await fetch(
// 				`http://127.0.0.1:5000/product/${productId}`,
// 				{
// 					method: "GET",
// 				}
// 			);
// 			const data = await response.json();

// 			setProductDetail(data);
// 		};
// 		handleEditProduct();
// 	}, []);
// 	const handleAddtocart = async () => {
// 		const response = await fetch(
// 			`http://127.0.0.1:5000/addtocart/${productId}`,
// 			{
// 				method: "POST",
// 				body: JSON.stringify({ userId }),
// 				headers: { "Content-Type": "application/json" },
// 			}
// 		);
// 		if (response.ok) {
// 			const getCartItem = await fetch("http://127.0.0.1:5000/carts", {
// 				method: "get",
// 			});
// 			const cart = await getCartItem.json();
// 			console.log(cart);
// 		}
// 	};
// 	const [quantity, setQuantity] = useState(1);

// 	const handleAdd = () => {
// 		setQuantity(quantity + 1);
// 	};

// 	const handleSubtract = () => {
// 		if (quantity > 1) {
// 			setQuantity(quantity - 1);
// 		}
// 	};

// 	return (
// 		<div>
// 			<Header />
// 			<div className="divide">
// 				<div className="image-side">
// 					<img
// 						src={productDetail[0]?.productimage}
// 						alt=""
// 						className="productdetail-image"
// 					/>
// 				</div>
// 				<div>
// 					<p className="detail-title">{productDetail[0]?.productname} </p>

// 					<p className="detailprice">{productDetail[0]?.productprice} Birr</p>
// 					<p className="product-detail">{productDetail[0]?.productdesc}</p>
// 					<div className="detailbox">
// 						<span className="detailplus" onClick={handleAdd}>
// 							&#43;
// 						</span>
// 						<span className="detailquantity">{quantity}</span>
// 						<span className="detailminus" onClick={handleSubtract}>
// 							&#8722;
// 						</span>
// 					</div>
// 					<button className="detailcart" onClick={handleAddtocart}>
// 						{" "}
// 						ADD TO CART
// 					</button>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }
