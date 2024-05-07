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
import { MdCancel } from "react-icons/md";
import { FaLock } from "react-icons/fa6";

const Professionalappoin = () => {
	const { profesionalId } = useProfesionalContext();
	const [shwoprofileupdate, setShowProfileUpdate] = useState(false);
	const [shwoo, setShowoo] = useState(false);
	const [shwonn, setShownn] = useState(false);
	const fileInputRef = useRef(null);
	const submitButton = useRef(null);
	const [appointment, setAppointment] = useState([]);
	const [img, setImg] = useState("");
	const [updatedPhoto, setUpdatedPhoto] = useState("");
	const [viewFeedBack, setViewFeedBack] = useState("");
	const [feedbacks, setFeedBacks] = useState("");
	const [showUpdatePassword, setShowUpdatePassword] = useState(false);
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confiremPassword, setConfiremPassword] = useState("");
	const [usertEnterdeOldPassword, setUserEnteredOldPassword] = useState("");
	const [showMessage, setShowMessage] = useState(false);

	const { token, setToken, setUserType, usertype } = useAuthContext();
	const navigate = useNavigate();

	const PName = localStorage.getItem("profesionalName");
	const PId = localStorage.getItem("profesionalId");

	const logout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("profesionalName");
		localStorage.removeItem("profesionalId");
		localStorage.removeItem("userType");
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
		setOldPassword(localStorage.getItem("password"));
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

		fetch(`http://127.0.0.1:5000/profesionalRating/${PId}`, {
			method: "Get",
		})
			.then((response) => response.json())
			.then((data) => {
				const mmm = data.result.filter((r) => r.feedback !== "");
				setFeedBacks(mmm);
			});
	}, []);

	const handleChangeStatus = async (id, status) => {
		const response = await fetch(
			"http://127.0.0.1:5000/chengeappointmentStatus",
			{
				method: "PUT",
				body: JSON.stringify({ id, status }),
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
	if (showMessage) {
		setTimeout(() => {
			setShowMessage(false);
		}, 3000);
	}
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
	const errors = {};
	const handeleUpdatePassword = async () => {
		setShownn(false);
		setShowoo(false);
		if (oldPassword !== usertEnterdeOldPassword) {
			setShowoo(true);
			return;
		}
		if (newPassword !== confiremPassword) {
			setShownn(true);
			return;
		}

		const response = await fetch(
			"http://127.0.0.1:5000/updatprofesionalpassword",
			{
				method: "PUT",
				body: JSON.stringify({ newPassword, PId }),
				headers: { "Content-Type": "application/json" },
			}
		);
		console.log(response);

		if (response.ok) {
			localStorage.setItem("password", newPassword);

			setShowUpdatePassword(false);
			setShowMessage(true);
		} else {
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

							{!viewFeedBack && (
								<li>
									<p
										className="navigation-link feedbacklink"
										onClick={() => setViewFeedBack(true)}>
										View FeedBack
									</p>
								</li>
							)}
							{viewFeedBack && (
								<li>
									<p
										className="navigation-link feedbacklink"
										onClick={() => setViewFeedBack(false)}>
										Appointment
									</p>
								</li>
							)}

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
												<button onClick={logout}>Sign out</button>
												<button onClick={openFile}>Update Photo</button>
												<button onClick={() => setShowUpdatePassword(true)}>
													Change <FaLock size={15} />
												</button>
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
				{!viewFeedBack && (
					<>
						<div className="dddd">
							<h2 className="protitle">Appointments</h2>
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
					</>
				)}
				<form encType="multipart/form-data" onSubmit={handleSubmit}>
					<input
						type="file"
						ref={fileInputRef}
						style={{ display: "none" }}
						onChange={handleProductImage}
						accept="image/*"
					/>
					<button type="submit" style={{ display: "none" }} ref={submitButton}>
						{" "}
						submit
					</button>
				</form>
				{viewFeedBack && (
					<>
						<h2 className="protitle">Your FeedBack</h2>
						{feedbacks.length > 0 &&
							feedbacks.map((feedback) => (
								<div className="feedbackcontainer">
									<h2 className="feedback">{feedback.feedback}</h2>
								</div>
							))}
					</>
				)}
				{shwoprofileupdate && (
					<div
						className="profileshow"
						onClick={() => setShowProfileUpdate(false)}>
						<div className="prof-cont">
							<img src={img} alt="" className="updateprofile" />
							<button className="update-button" onClick={handleUpdateProblem}>
								Set Profile
							</button>
						</div>
					</div>
				)}
			</div>
			{showUpdatePassword && (
				<div className="profileshow">
					<div className="prof-contt">
						<MdCancel
							size={40}
							style={{ marginLeft: "405px", cursor: "pointer" }}
							onClick={() => setShowUpdatePassword(false)}
						/>
						<div>
							<label htmlFor="" className="passwordlabel">
								old Password
							</label>

							<input
								type="text"
								name=""
								id=""
								className="passwordinput"
								onChange={(e) => {
									setUserEnteredOldPassword(e.target.value);
								}}
							/>
							{shwoo && (
								<label className="errorrr">
									{" "}
									Your Old Password is Incorrect!
								</label>
							)}
						</div>
						<div>
							<label htmlFor="" className="passwordlabel">
								New Password
							</label>

							<input
								type="text"
								name=""
								id=""
								className="passwordinput"
								onChange={(e) => {
									setNewPassword(e.target.value);
								}}
							/>
						</div>
						<div>
							<label htmlFor="" className="passwordlabel">
								Coniferm New Password
							</label>

							<input
								type="text"
								name=""
								id=""
								className="passwordinput"
								onChange={(e) => {
									setConfiremPassword(e.target.value);
								}}
							/>
							{shwonn && (
								<label className="errorrr">PassWord doesn't Match!</label>
							)}
						</div>
						<div>
							<button
								className="passwordbutton"
								onClick={handeleUpdatePassword}>
								Update Password
							</button>
						</div>
					</div>
				</div>
			)}
			{showMessage && (
				<div
					className="popup-container"
					style={{ zIndex: 100 }}
					onClick={() => setShowMessage(false)}>
					<div className="popup">
						<p className="itemisAlready">
							{" "}
							Password Updated Succesfully<br></br>
							✅✅✅✅✅✅✅✅✅✅✔
						</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default Professionalappoin;
