import React, { useEffect } from "react";
import "../../assets/styles/confirmation.css";
import { Link } from "react-router-dom";
export default function Confirmation() {
	useEffect(() => {
		localStorage.removeItem("cart");
	}, []);
	return (
		<div className="container-confirm">
			<div className="content-confirm">
				<span className="check-mark"> &#10003;</span>
				<p className="sucessconfirm">Payment successful! </p>
				<p className="detailconfirm">
					Detail of transaction are included below
				</p>

				{/* <hr className="confirmhr" /> */}

				<p className="confirmprice">
					<span className="bold">Name:</span>{" "}
					{localStorage.getItem("userName") +
						" " +
						localStorage.getItem("userLName")}
				</p>
				<p className="confirmtotal">
					<span className="bold">Email:</span> {localStorage.getItem("email")}
				</p>
				<p className="confirmprice">
					<span className="bold">Total Price:</span>{" "}
					{localStorage.getItem("totalPrice")}
				</p>
				<p className="confirmtotal">
					<span className="bold">Quantity:</span>{" "}
					{localStorage.getItem("totalQuantity")}
				</p>
				<p className="confirmtotal">
					<span className="bold">TransactionRef:</span>{" "}
					{localStorage.getItem("ref")}
				</p>
				<p className="confirmdate">
					<span className="bold">Date:</span> 2024-04-12
				</p>

				<Link to="/" className="gohome">
					{" "}
					Go to Home
				</Link>
			</div>
		</div>
	);
}
