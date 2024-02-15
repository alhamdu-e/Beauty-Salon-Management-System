import "../assets/styles/addService.css";
function AddService(props) {
	return (
		<div>
			<div className="conatnerforaddservice">
				<button className="add">&#43;</button>
				<button className="manage-employe-button" onClick={props.handleService}>
					Manage Service
				</button>
			</div>
			<div className="addservice container">
				<div>
					<label htmlFor="firstname">Service Name</label>
					<input
						type="text"
						name="firstname"
						id="firstname"
						placeholder="Product Name"
					/>
				</div>

				<div>
					<label htmlFor="lastname">Service Description</label>
					<input
						type="text"
						name="lastname"
						id="lastname"
						placeholder="Product Description"
					/>
				</div>

				<div>
					<label htmlFor="product-price">Service Price</label>
					<input
						type="text"
						name="product-price"
						id="product-price"
						placeholder="Product Price"
					/>
				</div>
				<div>
					<label htmlFor="adress">Service Catagory</label>
					<select
						id="servicecatagory"
						name="servicecatagory"
						className="serviceform-select">
						<option selected disabled>
							Select Service Catagory
						</option>
						<option value="makeup">Makeup</option>
						<option value="nail">Nail</option>
						<option value="hair">Hair</option>
					</select>
				</div>
				<div>
					<label htmlFor="product-image">Service Image</label>
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
export default AddService;
