import "../../assets/styles/Admin/editProduct.css";
import { useState, useEffect } from "react";

function EditProduct(props) {
	const [productData, setProductData] = useState([]);
	const nameRegx = /^[a-z]+$/i;
	const numberRegex = /^\d+(\.\d+)?$/;

	const [errName, showErrName] = useState(false);
	const [errDesc, showErrDesc] = useState(false);
	const [errPrice, showErrPrice] = useState(false);
	const [errImg, showErrImg] = useState(false);

	useEffect(() => {
		// Function to retrieve data from local storage
		const retrieveProductDataFromLocalStorage = () => {
			const storedData = localStorage.getItem("productData");
			if (storedData) {
				setProductData(JSON.parse(storedData));
			}
		};
		// Call the function when component mounts
		retrieveProductDataFromLocalStorage();
	}, []);

	const [productName, setProductName] = useState("");
	const [productDesc, setProductDesc] = useState("");
	const [productPrice, setProductPrice] = useState("");
	const [productImage, setProductImage] = useState("");

	useEffect(() => {
		// Update state with local storage data
		if (productData.length > 0) {
			setProductName(productData[0].productname);
			setProductDesc(productData[0].productdesc);
			setProductPrice(productData[0].productprice);
		}
	}, [productData]);

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

		// Create a new FormData object
		const formData = new FormData();

		// Append each property of addProduct to the FormData object
		formData.append("productName", productName);
		formData.append("productDesc", productDesc);
		formData.append("productPrice", productPrice);
		formData.append("productImage", productImage);
		formData.append("productId", productData[0].id);

		try {
			const response = await fetch("http://127.0.0.1:5000/editProduct", {
				method: "PUT",
				body: formData,
			});

			if (response.ok) {
				console.log("Product edited successfully");
				const responseData = await response.json();
				console.log(responseData.message);
			} else {
				console.log("Failed to edit product:", response.statusText);
			}
		} catch (error) {
			console.error("Error editing product:", error);
		}
	};

	return (
		<div>
			<div className="conatnerforeditproduct">
				{/* <button className="add">&#43;</button> */}
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
							value={productDesc}
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
							value={productPrice}
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
							placeholder="Your Address"
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
						<button className="editProduct-a">Edit Product </button>
					</div>
				</div>
			</form>
		</div>
	);
}

export default EditProduct;
