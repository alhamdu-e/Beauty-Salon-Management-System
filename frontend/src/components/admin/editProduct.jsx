import React from "react";
import "../../assets/styles/Admin/editProduct.css";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../context/Autcontext";
import { useServiceProdctContext } from "../../context/productAndServicecomtext";
import { useNavigate } from "react-router-dom";

function EditProduct(props) {
	// const [productData, setProductData] = useState([]);
	const [productName, setProductName] = useState("");
	const [productDesc, setProductDesc] = useState("");
	const [productPrice, setProductPrice] = useState("");
	const [productQuantity, setProductQunatity] = useState("");
	const [productImage, setProductImage] = useState("");
	const [errors, setErrors] = useState({});
	const { token } = useAuthContext();
	const { product } = useServiceProdctContext();
	const [errM, setErr] = useState(false);
	const [errMM, setErrr] = useState(false);
	const navigate = useNavigate();

	// useEffect(() => {
	// 	// Function to retrieve data from local storage
	// 	const retrieveProductDataFromLocalStorage = () => {
	// 		const storedData = localStorage.getItem("productData");
	// 		if (storedData) {
	// 			setProductData(JSON.parse(storedData));
	// 		}
	// 	};
	// 	// Call the function when component mounts
	// 	retrieveProductDataFromLocalStorage();
	// }, []);

	useEffect(() => {
		// Update state with local storage data
		if (product.length > 0) {
			setProductName(product[0].productname);
			setProductDesc(product[0].productdesc);
			setProductPrice(product[0].productprice);
			setProductQunatity(product[0].quantity);
		}
	}, [product]);

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
	const handleProductQuantity = (event) => {
		setProductQunatity(event.target.value);
	};
	const validateForm = () => {
		const errors = {};

		if (!productName.trim()) {
			errors.productName = "Product Name is required";
		} else if (!/^[a-zA-Z]+$/.test(productName)) {
			errors.productName = "Product Name should contain only characters";
		}

		if (!productDesc.trim()) {
			errors.productDesc = "Product Description is required";
		} else if (productDesc.trim().length < 20) {
			errors.productDesc =
				"Product Description should be at least 20 characters long";
		}

		if (!productPrice) {
			errors.productPrice = "Product Price is required";
		} else if (Number(productPrice) < 20) {
			errors.productPrice = "Product Price must be at least 20";
		}
		if (!productQuantity) {
			errors.productqunatity = "Product Quantity is required";
		}

		setErrors(errors);

		return Object.keys(errors).length === 0;
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (!validateForm()) {
			return;
		}

		const formData = new FormData();
		formData.append("productName", productName);
		formData.append("productDesc", productDesc);
		formData.append("productPrice", productPrice);
		formData.append("productImage", productImage);
		formData.append("productId", product[0].id);
		formData.append("productQuantity", productQuantity);

		try {
			const response = await fetch("http://127.0.0.1:5000/editProduct", {
				method: "PUT",
				body: formData,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (response.ok) {
				setErrr(false);
				props.handleShowPopup();
			} else if (response.status === 400) {
				setErrr(true);
			} else {
				navigate("/servererror");
			}
		} catch (error) {
			console.error("Error editing product:", error);
		}
	};

	return (
		<div>
			<div className="conatnerforeditproduct">
				<p className="userExist" style={!errMM ? { visibility: "hidden" } : {}}>
					Product Already Exist!
				</p>
				<button className="manage-product-button" onClick={props.handleProduct}>
					Manage Product
				</button>
			</div>
			<form encType="multipart/form-data" onSubmit={handleSubmit}>
				<div className="editProduct container">
					<div>
						<label htmlFor="productname">Product Name</label>
						<input
							type="text"
							name="productname"
							id="productname"
							placeholder="Product Name"
							onChange={handleProductName}
							value={productName}
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
							value={productDesc}
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
							value={productPrice}
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
							value={productQuantity}
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
							placeholder="Your Address"
							onChange={handleProductImage}
							accept="image/*"
						/>
						{errors.productImage && (
							<p className="error">{errors.productImage}</p>
						)}
					</div>
					<div>
						<button className="editProduct-a">Edit Product</button>
					</div>
				</div>
			</form>
		</div>
	);
}

export default EditProduct;
