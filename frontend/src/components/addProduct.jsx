import "../assets/styles/addProduct.css";
function AddProduct(props) {
	return (
		<div>
			<div className="conatnerforaddproduct">
				<button className="add">&#43;</button>
				<button className="manage-employe-button" onClick={props.handleProduct}>
					Manage Product
				</button>
			</div>
			<div className="addProduct container">
				<div>
					<label htmlFor="firstname">Product Name</label>
					<input
						type="text"
						name="firstname"
						id="firstname"
						placeholder="Product Name"
					/>
				</div>

				<div>
					<label htmlFor="lastname">Product Description</label>
					<input
						type="text"
						name="lastname"
						id="lastname"
						placeholder="Product Description"
					/>
				</div>

				<div>
					<label htmlFor="product-price">Product Price</label>
					<input
						type="text"
						name="product-price"
						id="product-price"
						placeholder="Product Price"
					/>
				</div>
				<div>
					<label htmlFor="product-image">Product Image</label>
					<input
						type="file"
						name="product-image"
						id="product-image"
						placeholder="Your Adress"
					/>
				</div>
				<div>
					<a href="#" className="addProduct-a">
						Add Product{" "}
					</a>
				</div>
				<div>
					{" "}
					<img src="./images/G8.jpg" alt="" className="image-admin" />
				</div>
			</div>
		</div>
	);
}
export default AddProduct;
