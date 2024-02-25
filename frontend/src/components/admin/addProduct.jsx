import "../../assets/styles/Admin/addProduct.css";
import { useState, useEffect } from "react";
function AddProduct(props) {
	const nameRegx = /^[a-z\s]+$/i;

	const numberRegex = /^\d+(\.\d+)?$/;

	const [errName, showErrName] = useState(false);
	const [errDesc, showErrDesc] = useState(false);
	const [errPrice, showErrPrice] = useState(false);
	const [errImg, showErrImg] = useState(false);

	const [productName, setProductName] = useState("");
	const [productDesc, setProductDesc] = useState("");
	const [productPrice, setProductPrice] = useState("");
	const [productImage, setProductImage] = useState("");

	const handleProductName = (event) => {
		setProductName(event.target.value);
	};
	const handleProductDesc = (event) => {
		setProductDesc(event.target.value);
	};
	const handleProductPrice = (event) => {
		setProductPrice(event.target.value);
	};
	const handleProductImage = (event) => {
		setProductImage(event.target.files[0]);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		// Create a new FormData object
		const formData = new FormData();

		// Append each property of addProduct to the FormData object
		formData.append("productName", productName);
		formData.append("productDesc", productDesc);
		formData.append("productPrice", productPrice);
		formData.append("productImage", productImage);
		if (!nameRegx.test(productName)) {
			showErrName(true);
			return;
		}
		if (nameRegx.test(productName)) {
			showErrName(false);
		}
		if (!nameRegx.test(productDesc)) {
			showErrDesc(true);
			return;
		}
		if (nameRegx.test(productDesc)) {
			showErrDesc(false);
		}
		if (!numberRegex.test(productPrice)) {
			showErrPrice(true);
			return;
		}
		if (numberRegex.test(productPrice)) {
			showErrPrice(false);
		}
		if (!productImage) {
			showErrImg(true);
			return;
		}
		if (productImage) {
			showErrImg(false);
		}

		// if (formIsValid) {
		// 	console.log(formIsValid);
		// 	return;
		// }

		try {
			const response = await fetch("http://127.0.0.1:5000/addProduct", {
				method: "POST",
				body: formData,
			});

			if (response.ok) {
				console.log("Product added successfully");
				const responseData = await response.json();
				console.log(responseData.message);
			} else {
				console.log("Failed to add product:", response.statusText);
			}
		} catch (error) {
			console.error("Error adding product:", error);
		}
	};

	return (
		<div>
			<div className="conatnerforaddproduct">
				<button className="add">&#43;</button>
				<button className="manage-employe-button" onClick={props.handleProduct}>
					Manage Product
				</button>
			</div>
			<form encType="multipart/form-data" onSubmit={handleSubmit}>
				<div className="addProduct container">
					<div>
						<label htmlFor="productname">Product Name</label>
						<input
							type="text"
							name="productname"
							id="productname"
							placeholder="Product Name"
							onChange={handleProductName}
						/>
						<p
							className={`${
								errName ? "block erro-message" : "none erro-message"
							}`}>
							only charcter are allowed!
						</p>
					</div>

					<div>
						<label htmlFor="productdesc">Product Description</label>
						<input
							type="text"
							name="productdesc"
							id="productdesc"
							placeholder="Product Description"
							onChange={handleProductDesc}
						/>
						<p
							className={`${
								errDesc ? "block erro-message" : "none erro-message"
							}`}>
							only charcter are allowed!
						</p>
					</div>

					<div>
						<label htmlFor="product-price">Product Price</label>
						<input
							type="text"
							name="productprice"
							id="productprice"
							placeholder="Product Price"
							onChange={handleProductPrice}
						/>
						<p
							className={`${
								errPrice ? "block erro-message" : "none erro-message"
							}`}>
							only Positive Number are allowed!
						</p>
					</div>
					<div>
						<label htmlFor="product-image">Product Image</label>
						<input
							type="file"
							name="productimage"
							id="productimage"
							placeholder="Your Adress"
							onChange={handleProductImage}
						/>
						<p
							className={`${
								errImg ? "block erro-message" : "none erro-message"
							}`}>
							Please select a product image.
						</p>
					</div>
					<div>
						<button className="addProduct-a">Add Product </button>
					</div>
				</div>
			</form>
		</div>
	);
}
export default AddProduct;
