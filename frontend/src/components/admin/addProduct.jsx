import React from "react";
import "../../assets/styles/Admin/addProduct.css";
import { useState } from "react";
import { useAuthContext } from "../../context/Autcontext";
import { useNavigate } from "react-router-dom";
function AddProduct(props) {
	const { token } = useAuthContext();

	const [productName, setProductName] = useState("");
	const [productDesc, setProductDesc] = useState("");
	const [productPrice, setProductPrice] = useState("");
	const [productQuantity, setProductQunatity] = useState("");
	const [productImage, setProductImage] = useState("");
	const [errors, setErrors] = useState({});
	const [errM, setErr] = useState(false);
	const [errMM, setErrr] = useState(false);

	const navigate = useNavigate();
	const handleProductName = (event) => {
		setProductName(event.target.value);
	};

	const handleProductDesc = (event) => {
		setProductDesc(event.target.value);
	};

	const handleProductPrice = (event) => {
		setProductPrice(event.target.value);
	};
	const handleProductQuantity = (event) => {
		setProductQunatity(event.target.value);
	};

	const handleProductImage = (event) => {
		setProductImage(event.target.files[0]);
	};

	const validateForm = () => {
		const errors = {};

		if (!productName.trim()) {
			errors.productName = "Product Name is required";
		} else if (!isNaN(productName.trim())) {
			errors.productName = "Product Name cannot be a number";
		}

		if (!productDesc.trim()) {
			errors.productDesc = "Product Description is required";
		} else if (productDesc.trim().length < 20) {
			errors.productDesc =
				"Product Description should be at least 20 characters long";
		} else if (!isNaN(productDesc.trim())) {
			errors.productDesc = "Product Description cannot be a number";
		}

		if (!productPrice) {
			errors.productPrice = "Product Price is required";
		} else if (Number(productPrice) < 100) {
			errors.productPrice = "Product Price must be at least 200 birr";
		}

		if (!productQuantity) {
			errors.productqunatity = "Product Quantity is required";
		}
		if (!productImage) {
			errors.productImage = "Product Image is required";
		}

		setErrors(errors);

		return Object.keys(errors).length === 0;
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (!validateForm()) {
			return;
		}

		// Create a new FormData object
		const formData = new FormData();

		// Append each property of addProduct to the FormData object
		formData.append("productName", productName);
		formData.append("productDesc", productDesc);
		formData.append("productPrice", productPrice);
		formData.append("productImage", productImage);
		formData.append("productQuantity", productQuantity);

		try {
			const response = await fetch("http://127.0.0.1:5000/addProduct", {
				method: "POST",
				body: formData,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			console.log(response);

			if (response.ok) {
				setErr(false);
				props.handleShowPopup();
			} else if (response.status === 400) {
				setErr(true);
			} else if (response.status === 403) {
				setErrr(true);
			} else {
				navigate("/servererror");
			}
		} catch (error) {
			console.error("Error adding product:", error);
		}
	};

	return (
		<div>
			<div className="conatnerforaddproduct">
				<p className="userExist" style={!errM ? { visibility: "hidden" } : {}}>
					File Type Not Supported!
				</p>
				<p className="userExist" style={!errMM ? { visibility: "hidden" } : {}}>
					Product Already Exist!
				</p>
				<button className="add bn">&#43;</button>
				<button
					className="manage-employe-button bn"
					onClick={props.handleProduct}>
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
						{errors.productName && (
							<p className="error">{errors.productName}</p>
						)}
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
						{errors.productDesc && (
							<p className="error">{errors.productDesc}</p>
						)}
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
						{errors.productPrice && (
							<p className="error">{errors.productPrice}</p>
						)}
					</div>

					<div>
						<label htmlFor="product-price">Product Quantity</label>
						<input
							type="number"
							name="productprice"
							id="productprice"
							placeholder="Product Qunatity"
							onChange={handleProductQuantity}
							min={1}
						/>
						{errors.productqunatity && (
							<p className="error">{errors.productqunatity}</p>
						)}
					</div>

					<div>
						<label htmlFor="product-image">Product Image</label>
						<input
							type="file"
							name="productimage"
							id="productimage"
							placeholder="Your Adress"
							onChange={handleProductImage}
							accept="image/*"
						/>
						{errors.productImage && (
							<p className="error">{errors.productImage}</p>
						)}
					</div>

					<div>
						<button className="addProduct-a">Add Product</button>
					</div>
				</div>
			</form>
		</div>
	);
}

export default AddProduct;
