import "../../assets/styles/Admin/addProduct.css";
import { useState, useEffect } from "react";

function EditProduct(props) {
	const [productData, setProductData] = useState([]);

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
							value={productName}
						/>
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
					</div>
					<div>
						<button className="addProduct-a">Edit Product </button>
					</div>
				</div>
			</form>
		</div>
	);
}

export default EditProduct;
