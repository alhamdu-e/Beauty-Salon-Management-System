import React from "react";
import Header from "../Header";
import "../../assets/styles/professionalappoin.css";
import { useEffect, useState, useRef } from "react";
import { useProfesionalContext } from "../../context/profesionalcontext";
import { json } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/Autcontext";
import { useCartContext } from "../../context/cartcontext";
import { useUserContext } from "../../context/UserContext";
const Professionalappoin = () => {
	const { profesionalId } = useProfesionalContext();
	const [shwoprofileupdate, setShowProfileUpdate] = useState(false);
	const fileInputRef = useRef(null);
	const submitButton = useRef(null);
	const [appointment, setAppointment] = useState([]);
	const [img, setImg] = useState("");
	const [updatedPhoto, setUpdatedPhoto] = useState("");

	const { token, setToken, setUserType, usertype } = useAuthContext();
	const navigate = useNavigate();

	const PName = localStorage.getItem("profesionalName");
	const PId = localStorage.getItem("profesionalId");

	const logout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("profesionalName");
		localStorage.removeItem("profesionalId");
		setToken("");
		setUserType("");
		navigate("/", { replace: true });
	};

	const [profesionaImage, setProfesionaImage] = useState("");
	const [profesionalData, setProfesionalData] = useState([]);
	const openFile = () => {
		fileInputRef.current.click();
	};
	const handleUpdateProblem = () => {
		setShowProfileUpdate(!shwoprofileupdate);
		submitButton.current.click();
	};

	const handleProductImage = (event) => {
		setProfesionaImage(event.target.files[0]);
		const file = event.target.files[0];

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
		fetch(`http://127.0.0.1:5000/profesionalAppointed/${PId}`, {
			method: "Get",
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setAppointment(data);
			});

		fetch(`http://127.0.0.1:5000/profesionalData/${PId}`, {
			method: "Get",
		})
			.then((response) => response.json())
			.then((data) => {
				setProfesionalData(data);
				setUpdatedPhoto(data[0].pimage);
			});
	}, []);

	const handleChangeStatus = async (id, status) => {
		console.log(id);
		const response = await fetch(
			"http://127.0.0.1:5000/chengeappointmentStatus",
			{
				method: "PUT",
				body: JSON.stringify({ PId, status }),
				headers: { "Content-Type": "application/json" },
			}
		);
		if (response.ok) {
			fetch(`http://127.0.0.1:5000/profesionalAppointed/${PId}`, {
				method: "Get",
			})
				.then((response) => response.json())
				.then((data) => {
					setAppointment(data);
				});
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		// Create a new FormData object
		const formData = new FormData();
		formData.append("profesionaID", PId);
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
				const responseData = await response.json();
				setUpdatedPhoto(responseData[0].pimage);
			} else {
				console.log("Failed to edit product:", response.statusText);
			}
		} catch (error) {
			console.error("Error editing product:", error);
		}
	};

	return (
		<div>
			<header>
				<div className="header-container">
					<div>
						<span className="logo">Glowcity</span>
					</div>
					<nav>
						<ul className="navigation">
							<li>
								<Link to="/" className="navigation-link">
									Home
								</Link>
							</li>

							<li>
								<p className="navigation-link">View FeedBack</p>
							</li>

							<li>
								<img src={updatedPhoto} alt="" className="profimage" />
							</li>
							{token && (
								<>
									<li>
										<div class="dropdown">
											<button class="dropbtn">
												<p className="userProfile">Hello,{PName}</p>
												<p className="userProfile">Account &#9660;</p>
											</button>
											<div class="dropdown-content">
												<button onClick={logout}>sign out</button>
												<button onClick={openFile}>Update Photo</button>
											</div>
										</div>
									</li>
								</>
							)}
						</ul>
					</nav>
				</div>
			</header>

			<div className="prof-main-cont">
				<div className="dddd">
					<div></div>
					<h2 className="protitle">Appointments</h2>
					<form encType="multipart/form-data" onSubmit={handleSubmit}>
						<input
							type="file"
							ref={fileInputRef}
							style={{ display: "none" }}
							onChange={handleProductImage}
						/>
						<button
							type="submit"
							style={{ display: "none" }}
							ref={submitButton}>
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
								<div className="plabel">Status</div>
							</div>
							<div className="porow">
								<div className="pinfo name">
									{appointment.userFname + " " + appointment.userLname}
								</div>
								<div className="pinfo name">{appointment.servicename}</div>
								<div className="pinfo">{appointment.appointmentDate}</div>
								<div className="pinfo">{appointment.startTime}</div>
								<div className="pinfo">{appointment.endTime}</div>
								<div className="pinfo">
									{appointment.status}{" "}
									<button
										className="changeStatusbtn"
										onClick={() =>
											handleChangeStatus(appointment.id, appointment.status)
										}>
										Change Status
									</button>
								</div>
							</div>
						</div>
					</div>
				))}
				{shwoprofileupdate && (
					<div className="profileshow">
						<div className="prof-cont">
							<img src={img} alt="" className="updateprofile" />
							<button className="update-button" onClick={handleUpdateProblem}>
								Set Profile
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Professionalappoin;
