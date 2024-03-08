import React from "react";
import Header from "../Header";
import "../../assets/styles/professionalappoin.css";
import { useEffect, useState, useRef } from "react";

const Professionalappoin = () => {
	const [shwoprofileupdate, setShowProfileUpdate] = useState(false);
	const fileInputRef = useRef(null);
	const submitButton = useRef(null);
	const [appointment, setAppointment] = useState([]);
	const [img, setImg] = useState("");
	const [updatedPhoto, setUpdatedPhoto] = useState("");

	const [profesionaImage, setProfesionaImage] = useState("");
	const [profesionalData, setProfesionalData] = useState([]);
	const openFile = () => {
		fileInputRef.current.click();
	};
	const hhh = () => {
		setShowProfileUpdate(!shwoprofileupdate);
		submitButton.current.click();
	};

	const handleProductImage = (event) => {
		setProfesionaImage(event.target.files[0]);
		const file = event.target.files[0];
		// setProductImage(file);

		// Handle file upload immediately after selecting the file
		const reader = new FileReader();
		if (file) {
			reader.readAsDataURL(file);
			reader.onloadend = () => {
				setImg(reader.result);
				setShowProfileUpdate(true);
			};
		}
	};

	useEffect(() => {
		const profesionaID = localStorage.getItem("userId");
		fetch(`http://127.0.0.1:5000/profesionalAppointed/${profesionaID}`, {
			method: "Get",
		})
			.then((response) => response.json())
			.then((data) => {
				setAppointment(data);
			});

		fetch(`http://127.0.0.1:5000/profesionalData/${profesionaID}`, {
			method: "Get",
		})
			.then((response) => response.json())
			.then((data) => {
				setProfesionalData(data);
				setUpdatedPhoto(data[0].address);
			});
	}, []);

	const handleSubmit = async (event) => {
		event.preventDefault();
		const profesionaID = localStorage.getItem("userId");
		// Create a new FormData object
		const formData = new FormData();
		formData.append("profesionaID", profesionaID);
		formData.append("profesionaImage", profesionaImage);

		try {
			const response = await fetch(
				"http://127.0.0.1:5000/updatprofesionalphoto",
				{
					method: "PUT",
					body: formData,
				}
			);

			if (response.ok) {
				console.log("Product edited successfully");
				const responseData = await response.json();
				setUpdatedPhoto(responseData[0].address);
			} else {
				console.log("Failed to edit product:", response.statusText);
			}
		} catch (error) {
			console.error("Error editing product:", error);
		}
	};

	return (
		<div className="prof-main-cont">
			<div className="dddd">
				<div>
					<img src={updatedPhoto} alt="" className="imgg" onClick={openFile} />
					{profesionalData.length > 0 && (
						<p className="p">
							{profesionalData[0].fname + " " + profesionalData[0].lname}
						</p>
					)}
				</div>
				<h2 className="protitle">Appointments</h2>
				<form encType="multipart/form-data" onSubmit={handleSubmit}>
					<input
						type="file"
						ref={fileInputRef}
						style={{ display: "none" }}
						onChange={handleProductImage}
					/>
					<button type="submit" style={{ display: "none" }} ref={submitButton}>
						{" "}
						submit
					</button>
				</form>
			</div>
			{appointment.map((appointment) => (
				<div className="procontainer">
					<div className="proinfo">
						<div className="prow">
							<div className="plabel customer ">Customer Name</div>
							<div className="plabel">Service Name</div>
							<div className="plabel">Date</div>
							<div className="plabel">Start Time</div>
							<div className="plabel">EndTime</div>
						</div>
						<div className="porow">
							<div className="pinfo name">
								{appointment.userFname + " " + appointment.userLname}
							</div>
							<div className="pinfo name">{appointment.servicename}</div>
							<div className="pinfo">{appointment.appointmentDate}</div>
							<div className="pinfo">{appointment.startTime}</div>
							<div className="pinfo">{appointment.endTime}</div>
						</div>
					</div>
				</div>
			))}
			{shwoprofileupdate && (
				<div className="profileshow">
					<div className="prof-cont">
						<img src={img} alt="" className="updateprofile" />
						<button className="update-button" onClick={hhh}>
							Set Profile
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default Professionalappoin;
