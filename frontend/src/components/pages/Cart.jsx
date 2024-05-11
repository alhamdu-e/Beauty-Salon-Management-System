import "../../assets/styles/cart.css";
import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { FaPlus, FaMinus } from "react-icons/fa";
import Header from "../Header";
import { useUserContext } from "../../context/UserContext";
import { useCartContext } from "../../context/cartcontext";
import { useNavigate } from "react-router-dom";

function Cart() {
	const productWithQunatity = JSON.parse(
		localStorage.getItem("productWithQunatity")
	);
	const { userId, userData } = useUserContext();
	const { items, setItems } = useCartContext();
	const [showPopup, setShowPopup] = useState(false);
	const navigate = useNavigate();
	function getItemQuantityById(items, id) {
		const filteredItem = items.find((item) => item.id === id);

		if (filteredItem) {
			return filteredItem.quantity;
		}

		// Return 0 if no item with the given ID is found
	}
	// const[quantityy, setQuantity] = useState(0);
	// const [productid, setProductId] = useState(0);
	const [loading, setLoading] = useState(false);
	const totalPrice = (items ?? []).reduce((acc, item) => {
		const { productprice } = item;
		return acc + productprice * item.quantity;
	}, 0);
	const totalQuantity = (items ?? []).reduce((acc, item) => {
		return acc + item.quantity;
	}, 0);
	function updaeQauantity(info) {
		try {
			const response = fetch("http://127.0.0.1:5000/editcart", {
				method: "Put",
				body: JSON.stringify(info),
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (response.ok) {
				alert("hi");
			} else {
				console.log("user not registered", response.statusText);
			}
		} catch (error) {
			console.log(error);
		}
	}
	const deleteCartItem = (productid, cartid) => {
		const updateditems = items.filter((product) => product.id !== productid);
		setItems(updateditems);
		localStorage.setItem("cart", JSON.stringify(updateditems));
		try {
			const response = fetch(`http://127.0.0.1:5000/deleteCart/${cartid}`, {
				method: "Delete",
				headers: {
					"Content-Type": "application/json",
					// Authorization: `Bearer ${token}`,
				},
			});
			if (response.ok) {
				alert("hi");
			} else {
				console.log("user not registered", response.statusText);
			}
		} catch (error) {
			console.log(error);
		}
	};
	const handleIncrement = (productIndex, productidd, euuy, CartQnatity) => {
		const productQunatity = getItemQuantityById(
			productWithQunatity,
			productidd
		);
		// setProductId(productidd);
		if (productQunatity > CartQnatity) {
			const updatedItems = [...items];
			updatedItems[productIndex].quantity += 1;
			// setQuantity(updatedItems[productIndex].quantity);
			setItems(updatedItems);
			localStorage.setItem("cart", JSON.stringify(updatedItems));
			const info = {
				quantityy: updatedItems[productIndex].quantity,
				productid: productidd,
				userId,
			};
			updaeQauantity(info);
		} else {
			setShowPopup(true);
		}
	};
	const handleDecrement = async (productIndex, productidd) => {
		// setProductId(productidd);

		const updatedItems = [...items];
		if (updatedItems[productIndex].quantity > 1) {
			updatedItems[productIndex].quantity -= 1;
			// setQuantity(updatedItems[productIndex].quantity);
			setItems(updatedItems);
			localStorage.setItem("cart", JSON.stringify(updatedItems));
			const info = {
				quantityy: updatedItems[productIndex].quantity,
				productid: productidd,
				userId,
			};
			updaeQauantity(info);
		}
	};

	const handlePayment = async () => {
		setLoading(true);
		localStorage.setItem("totalPrice", totalPrice);
		localStorage.setItem("totalQuantity", totalQuantity);
		const productName = items.map((item) => ({
			name: item.productname,
			quantity: item.quantity,
		}));
		localStorage.setItem("productName", JSON.stringify(productName));

		const response = await fetch("http://127.0.0.1:5000/payment", {
			method: "Post",
			body: JSON.stringify({
				fname: localStorage.getItem("userName"),
				lname: localStorage.getItem("userLName"),
				email: localStorage.getItem("email"),
				phone: localStorage.getItem("phone"),
				amount: parseInt(totalPrice),
				product: items,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (response.ok) {
			setLoading(false);
			const paymentData = await response.json();
			window.location.replace(paymentData.url);
			localStorage.setItem("ref", paymentData.ref);
		} else {
			navigate("/serverError");
		}
	};

	// const handlePaymentwithStripe = async () => {
	// 	localStorage.setItem("totalPrice", totalPrice);
	// 	localStorage.setItem("totalQuantity", totalQuantity);
	// 	try {
	// 		const response = await fetch("http://localhost:5000/PayWithStripe", {
	// 			method: "POST",
	// 			headers: {
	// 				"Content-Type": "application/json",
	// 			},
	// 			body: JSON.stringify({
	// 				fname: localStorage.getItem("userName"),
	// 				lname: localStorage.getItem("userLName"),
	// 				email: localStorage.getItem("email"),
	// 				phone: localStorage.getItem("phone"),
	// 				amount: totalPrice,
	// 				product: items,
	// 			}),
	// 		});

	// 		if (response.ok) {
	// 			const { url, ref } = await response.json();
	// 			console.log(url, ref);
	// 			window.location = url;
	// 			localStorage.setItem("ref", ref);
	// 		} else {
	// 			navigate("/serverError");
	// 		}
	// 	} catch (error) {
	// 		navigate("/serverError");
	// 	}
	// };

	return (
		<div>
			{" "}
			<Header />
			<div className="whole">
				{items?.length > 0 && (
					<>
						<h1 className="carthead"> Shooping Cart</h1>
						<p className="numberofitems">
							{" "}
							You have {items.length ?? 0} items in your cart{" "}
						</p>
						<div className="cartcontainer">
							<div>
								{items.map((product, index) => (
									<div className="ll">
										<div className="cartcontainer">
											<div className="cart-image-container">
												<img
													src={product.productimage}
													alt=""
													className="cart-image"
												/>
											</div>
										</div>
										<div className="middle">
											<div className="pad">
												<p className="cart-title">{product.productname}</p>
												<div className="boxcart">
													<button
														className="quantityButton plus"
														onClick={() =>
															handleIncrement(
																index,
																product.id,
																product.cart_id,
																product.quantity
															)
														}>
														<FaPlus />
													</button>
													<span className="quantity">{product.quantity}</span>
													<button
														className="quantityButton minus"
														onClick={() => handleDecrement(index, product.id)}>
														<FaMinus />
													</button>
												</div>
												<p className="price">
													{product.productprice}
													&nbsp;ETB
												</p>
												<MdDeleteForever
													className="cancel-icon"
													onClick={() =>
														deleteCartItem(product.id, product.cart_id)
													}
												/>
											</div>
										</div>
									</div>
								))}
							</div>
							<div className="pricingdetails">
								<div className="pricingdetails-div">
									<h1 className="summary-h1">Payment Details</h1>
									<div className="hrr"></div>
									<p className="summary-p"> Quantity: {totalQuantity}</p>
									<p className="summary-p">Total: {totalPrice} ETB</p>
									{/* <Link to="/login"> */}
									<button className="checkout" onClick={handlePayment}>
										Purchuase <FaArrowRight />{" "}
									</button>
									{/* </Link> */}
								</div>
							</div>
						</div>

						{/* <div className="leftside">
						<p className="checkout">CHECK OUT</p>
						<p className="totaltitle">Total price</p>
						<p className="subtotal">1200 Birr</p>
						<hr className="lefthr" />
					</div> */}
					</>
				)}
				{(items === null || items === undefined || items.length === 0) && (
					<h1 className="carthead">Cart is Empty!</h1>
				)}
				{loading && (
					<div className="overlay">
						<div class="loader"></div>
					</div>
				)}
			</div>
			{showPopup && (
				<div className="popup-container" style={{ zIndex: 100 }}>
					<div className="popup">
						<p className="itemisAlready"> Product is Out of Stock</p>
						<span className="check-mark ok" onClick={() => setShowPopup(false)}>
							ok
						</span>
					</div>
				</div>
			)}
		</div>
	);
}
export default Cart;
