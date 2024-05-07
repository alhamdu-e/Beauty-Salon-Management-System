import React from "react";
import { Link } from "react-router-dom";

export default function PayementForm() {
	var raw = JSON.stringify({
		amount: "100",
		currency: "ETB",
		email: "abebech_bekele@gmail.com",
		first_name: "Bilen",
		last_name: "Gizachew",
		phone_number: "0912345678",
		tx_ref: "chewatatest-6669",
		callback_url: "https://webhook.site/077164d6-29cb-40df-ba29-8a00e59a7e60",
		return_url: "https://www.google.com/",
		"customization[title]": "Payment for my favourite merchant",
		"customization[description]": "I love online payments",
	});

	var requestOptions = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer CHASECK_TEST-zHKZRqbDbugj6X4dAVxF7AOFzYI8UKqm",
		},
		body: raw,
	};

	const handleSubmit = () => {
		fetch("https://api.chapa.co/v1/transaction/initialize", requestOptions)
			.then((response) => response.text())
			.then((result) => console.log(result))
			.catch((error) => console.log("error", error));
	};
	return (
		<div className="container-confirm">
			<div className="content-confirm">
				<span className="check-mark"> &#10003;</span>
				<p className="sucessconfirm">Payment successful! </p>
				<p className="detailconfirm">
					Detail of transaction are included below
				</p>

				<hr className="confirmhr" />

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
