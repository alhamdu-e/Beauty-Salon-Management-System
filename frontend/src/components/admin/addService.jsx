import "../../assets/styles/Admin/addService.css";
import { useEffect, useState } from "react";
function AddService(props) {
	const [serviceName, setServiceName] = useState("");
	const [serviceDesc, setServiceDesc] = useState("");
	const [servicePrice, setServicePrice] = useState("");
	const [serviceImage, setServiceImage] = useState("");
	const [serviceCatagory, setServiceCatagory] = useState("");

	const handleServiceName = (event) => {
		setServiceName(event.target.value);
	};
	const handleServiceDesc = (event) => {
		setServiceDesc(event.target.value);
	};
	const handleServicePrice = (event) => {
		setServicePrice(event.target.value);
	};
	const handleServiceCatagory = (event) => {
		setServiceCatagory(event.target.value);
	};
	const handleServiceImage = (event) => {
		setServiceImage(event.target.files[0]);
	};

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
					<label htmlFor="servicename">Service Name</label>
					<input
						type="text"
						name="servicename"
						id="servicename"
						placeholder="Service Name"
						onChange={handleServiceName}
					/>
				</div>

				<div>
					<label htmlFor="servicedesc">Service Description</label>
					<input
						type="text"
						name="servicedesc"
						id="servicedesc"
						placeholder="Service Description"
						onChange={handleServiceDesc}
					/>
				</div>

				<div>
					<label htmlFor="serviceprice">Service Price</label>
					<input
						type="text"
						name="serviceprice"
						id="serviceprice"
						placeholder="Service Price"
						onChange={handleServicePrice}
					/>
				</div>
				<div>
					<label htmlFor="adress">Service Catagory</label>
					<select
						id="servicecatagory"
						name="servicecatagory"
						className="serviceform-select"
						onChange={handleServiceCatagory}>
						<option selected disabled>
							Select Service Catagory
						</option>
						<option value="makeup">Makeup</option>
						<option value="nail">Nail</option>
						<option value="hair">Hair</option>
					</select>
				</div>
				<div>
					<label htmlFor="serviceimage">Service Image</label>
					<input
						type="file"
						name="serviceimage"
						id="serviceimage"
						onChange={handleServiceImage}
					/>
				</div>
				<div>
					<button className="addservice-a">Add Product </button>
				</div>
			</div>
		</div>
	);
}
export default AddService;
