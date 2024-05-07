import React from "react";
import { useEffect, useState } from "react";
import "../../assets/styles/Admin/addService.css";
import { useAuthContext } from "../../context/Autcontext";
import { useNavigate } from "react-router-dom";

function AddService(props) {
	const { token } = useAuthContext();

	const [serviceName, setServiceName] = useState("");
	const [serviceDesc, setServiceDesc] = useState("");
	const [servicePrice, setServicePrice] = useState("");
	const [serviceImage, setServiceImage] = useState(null);
	const [serviceCatagory, setServiceCatagory] = useState("");
	const [serviceDuration, setServiceDuration] = useState("");
	const [errors, setErrors] = useState({});
	const [errM, setErr] = useState(false);
	const [errMM, setErrr] = useState(false);
	const navigate = useNavigate();

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

	const handleServiceDuration = (event) => {
		setServiceDuration(event.target.value);
	};

	const handleServiceImage = (event) => {
		setServiceImage(event.target.files[0]);
	};

	const validateForm = () => {
		const errors = {};

		if (!serviceCatagory) {
			errors.serviceCatagory = "Service Category is required";
		}

		if (!serviceName.trim()) {
			errors.serviceName = "Service Name is required";
		} else if (!isNaN(serviceName.trim())) {
			errors.serviceName = "Service Name cannot be a number";
		}

		if (!serviceDesc.trim()) {
			errors.serviceDesc = "Service Description is required";
		} else if (serviceDesc.trim().length < 20) {
			errors.serviceDesc =
				"Service Description should be at least 20 characters long";
		} else if (!isNaN(serviceDesc.trim())) {
			errors.serviceDesc = "Service Description cannot be a number";
		}

		if (!servicePrice) {
			errors.servicePrice = "Service Price is required";
		} else if (Number(servicePrice) < 200) {
			errors.servicePrice = "Service Price must be at least 200";
		}

		if (!serviceImage) {
			errors.serviceImage = "Service Image is required";
		}

		setErrors(errors);

		return Object.keys(errors).length === 0;
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (validateForm()) {
			const formData = new FormData();
			formData.append("serviceName", serviceName);
			formData.append("serviceDesc", serviceDesc);
			formData.append("serviceCatagory", serviceCatagory);
			formData.append("serviceDuration", serviceDuration);
			formData.append("servicePrice", servicePrice);
			formData.append("serviceImage", serviceImage);

			try {
				const response = await fetch("http://127.0.0.1:5000/addService", {
					method: "POST",
					body: formData,
				});
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
				console.log("Error when adding service:", error);
			}
		}
	};

	return (
		<div>
			<div className="conatnerforaddservice">
				<p className="userExist" style={!errM ? { visibility: "hidden" } : {}}>
					File Type Not Supported!
				</p>
				<p className="userExist" style={!errMM ? { visibility: "hidden" } : {}}>
					Service Already Exist!
				</p>
				<button className="add bn">&#43;</button>
				<button
					className="manage-employe-button bn"
					onClick={props.handleService}>
					Manage Service
				</button>
			</div>
			<form onSubmit={handleSubmit} encType="multipart/form-data">
				<div className="addservice container">
					<div>
						<label htmlFor="servicecatagory">Service Category</label>
						<select
							id="servicecatagory"
							name="servicecatagory"
							className="serviceform-select"
							onChange={handleServiceCatagory}
							value={serviceCatagory}>
							<option disabled value="">
								Select Service Category
							</option>
							<option value="makeup">Makeup</option>
							<option value="nail">Nail</option>
							<option value="hair">Hair</option>
						</select>
						{errors.serviceCatagory && (
							<p className="error">{errors.serviceCatagory}</p>
						)}
					</div>

					{serviceCatagory && (
						<div>
							<label htmlFor="servicename">Service Name</label>
							<select
								id="servicename"
								name="servicename"
								className="serviceform-select"
								onChange={handleServiceName}
								value={serviceName}>
								<option disabled value="">
									Select Service Name
								</option>
								{serviceCatagory === "makeup" && (
									<>
										<option value="full makeup">Full Makeup</option>
										<option value="normal makeup">Normal Makeup</option>
										<option value="eyelash extension">Eyelash Extension</option>
										<option value="eyebrow">Eyebrow</option>
									</>
								)}
								{serviceCatagory === "hair" && (
									<>
										<option value="hair extension">Hair Extension</option>
										<option value="hair color">Hair Color</option>
										<option value="hair treatment">Hair Treatment</option>
										<option value="hair braid">Hair Braid</option>
										<option value="hair style">Hair Styling</option>
									</>
								)}
								{serviceCatagory === "nail" && (
									<>
										<option value="manicure">Manicure</option>
										<option value="pedicure">Pedicure</option>
										<option value="gel">Gel Manicure/Pedicure</option>
										<option value="nail extension">Nail Extension</option>
										<option value="nail polish">Nail Polish</option>
										<option value="nail repair">Nail Repair</option>
									</>
								)}
							</select>
							{errors.serviceName && (
								<p className="error">{errors.serviceName}</p>
							)}
						</div>
					)}

					<div>
						<label htmlFor="servicedesc">Service Description</label>
						<input
							type="text"
							name="servicedesc"
							id="servicedesc"
							placeholder="Service Description"
							onChange={handleServiceDesc}
							value={serviceDesc}
						/>
						{errors.serviceDesc && (
							<p className="error">{errors.serviceDesc}</p>
						)}
					</div>

					<div>
						<label htmlFor="serviceprice">Service Price</label>
						<input
							type="text"
							name="serviceprice"
							id="serviceprice"
							placeholder="Service Price"
							onChange={handleServicePrice}
							value={servicePrice}
						/>
						{errors.servicePrice && (
							<p className="error">{errors.servicePrice}</p>
						)}
					</div>

					<div>
						<label htmlFor="serviceimage">Service Image</label>
						<input
							type="file"
							name="serviceimage"
							id="serviceimage"
							onChange={handleServiceImage}
							accept="image/*"
						/>
						{errors.serviceImage && (
							<p className="error">{errors.serviceImage}</p>
						)}
					</div>

					<div>
						<label htmlFor="servicecatagory">Service Duration</label>
						<select
							id="servicecatagory"
							name="servicecatagory"
							className="serviceform-select"
							onChange={handleServiceDuration}
							value={serviceDuration}>
							<option disabled value="">
								Select Service Duration
							</option>
							<option value="1">1 Hour</option>
							<option value="2">2 Hours</option>
							<option value="1:30">1 Hour 30 Minutes</option>
						</select>
					</div>

					<div>
						<button type="submit" className="addservice-a">
							Add Service
						</button>
					</div>
				</div>
			</form>
		</div>
	);
}

export default AddService;
