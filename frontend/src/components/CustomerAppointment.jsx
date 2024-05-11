import Header from "./Header";
import "../assets/styles/customerappointment.css";
import { FaStar } from "react-icons/fa";
import { useUserContext } from "../context/UserContext";
import { useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";
import { useSearchParams} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { TbArrowsSort } from "react-icons/tb";
export default function CustomerAppointment() {
	const { userId } = useUserContext();
	const [appointment, setAppointment] = useState([]);
	const [rating, setRating] = useState(null);
	const [hover, setHover] = useState(null);
	const [showRating, setShowRating] = useState(false);
	const [isVisible, setIsVisible] = useState(false);
	const [profesionalData, setProfesionalData] = useState([]);
	const navigate = useNavigate();
	const [feedback, setFeedback] = useState("");
	const [profesionalId, setProfesionalId] = useState("");
	const [error, setError] = useState(false);
	const [ratings, setRatings] = useState([]);
	const [isSorted, setSorted] = useState(false);
	const [showm, setShowm] = useState(false);
	const [showbtn, setShowbtn] = useState(false);
	const [ratingSubmitted, setRatingSubmitted] = useState({});
	const [id, setId] = useState("");
	const [showCancel, setShowCancel] = useState(false);

	const [servicePrice, setServicePrice] = useState("");

	const [remainingDays, setRemainingDays] = useState([]);

	const getRemainingDays = (appointmentDateStr) => {
		const parts = appointmentDateStr.split("/");
		const day = parseInt(parts[0], 10);
		const month = parseInt(parts[1], 10);
		const year = parseInt(parts[2], 10);
		const appointmentDate = new Date(year, month - 1, day); // Month is 0-based in JavaScript Date

		// Calculate remaining days
		const currentDate = new Date();
		const remainingTime = appointmentDate.getTime() - currentDate.getTime();
		const remainingDays = Math.ceil(remainingTime / (1000 * 60 * 60 * 24));
		return remainingDays;
	};
	useEffect(() => {
		// Calculate remaining days for each appointment
		const calculateRemainingDays = () => {
			const remainingDaysArray = appointment.map((appoint) => {
				const remaining = getRemainingDays(appoint.appointmentDate);
				console.log(remaining);
				return remaining;
			});

			setRemainingDays(remainingDaysArray);
		};

		if (appointment && appointment.length > 0) {
			calculateRemainingDays();
		}
	}, [appointment]);

	useEffect(() => {
		if (remainingDays && remainingDays.length > 0) {
			// Filter appointments with negative remaining days
			const appointmentsWithNegativeDays = appointment.filter(
				(appoint, index) => {
					return remainingDays[index] < -3;
				}
			);

			appointmentsWithNegativeDays.forEach(async (appoint) => {
				try {
					const response = await fetch(
						`http://127.0.0.1:5000/appointment/${appoint.id}`,
						{
							method: "Delete",
							headers: {
								"Content-Type": "application/json",
							},
						}
					);
					if (response.ok) {
						const data = await response.json();
						setAppointment(data);
					} else {
						// Handle non-OK responses
						console.error("Error deleting appointment:", response.status);
					}
				} catch (error) {
					console.error("Error deleting appointment:", error);
				}
			});
		}
	}, [remainingDays]);

	const [fname, setFname] = useState("");
	const [lname, setLname] = useState("");
	const [email, setEmail] = useState("");
	const [validationErrors, setValidationErrors] = useState({});
	const [errorMessage, setErrMessage] = useState(false);
	const [SelectedBank, setSelectedBank] = useState(
		"80a510ea-7497-4499-8b49-ac13a3ab7d07"
	);
	const [phone, setPhone] = useState("");
	const [accountCBE, setAccountCBE] = useState("");
	const [accountAbysiniya, setAccountAbysiniya] = useState("");
	const [accountAwash, setAccountAwash] = useState("");
	const [
		showAppointmentCanlationMessagee,
		setShowAppointmentCanlationMessagee,
	] = useState(false);
	const handleChangeFirstName = (event) => {
		setFname(event.target.value);
	};
	const handleChangeLastName = (event) => {
		setLname(event.target.value);
	};
	const handleChangeAccountCBE = (event) => {
		setAccountCBE(event.target.value);
		setAccountAbysiniya("");
		setAccountAwash("");
		setPhone("");
	};
	const handleChangeAccountAwash = (event) => {
		setAccountAwash(event.target.value);
		setPhone("");
		setAccountCBE("");
		setAccountAbysiniya("");
	};
	const handleChangeAccountAbysi = (event) => {
		setAccountAbysiniya(event.target.value);
		setAccountAwash("");
		setPhone("");
		setAccountCBE("");
		setAccountAwash("");
	};

	const handleChangePhone = (event) => {
		setPhone(event.target.value);
		setAccountCBE("");
		setAccountAbysiniya("");
	};
	const handleSelectedBank = (event) => {
		setValidationErrors({});
		setSelectedBank(event.target.value);
	};

	if (showAppointmentCanlationMessagee) {
		setTimeout(() => {
			setShowAppointmentCanlationMessagee(false);
		}, 3000);
	}

	if (errorMessage) {
		setTimeout(() => {
			setErrMessage(false);
		}, 3000);
	}
	const fetchProduct = async () => {
		try {
			const response = await fetch(
				`http://127.0.0.1:5000/customerappointment/${userId}`,
				{
					method: "Get",
				}
			);
			const data = await response.json();
			console.log("data,", data);
			setAppointment(data);
		} catch (e) {
			console.log(e);
		}
	};
	useEffect(() => {
		fetchProduct();
	}, []);
	const fetchProfesionalData = async (profesionalId) => {
		setProfesionalId(profesionalId);
		const response = await fetch(
			`http://127.0.0.1:5000/profesionalData/${profesionalId}`,
			{
				method: "Get",
			}
		);
		if (response.ok) {
			const data = await response.json();
			setProfesionalData(data);
			console.log(data);
		}
		if (!response.ok) {
			navigate("/serverError");
		}
		fetch(`http://127.0.0.1:5000/profesionalRating/${profesionalId}`, {
			method: "GET",
		})
			.then((response) => response.json())
			.then((data) => {
				setRatings(data.result);
				console.log(data);
			});
	};

	if (showm) {
		setTimeout(() => {
			setShowm(!showm);
		}, 3000);
	}
	const handleRating = async () => {
		if (!rating) {
			setError(true);
			return false;
		}
		const response = await fetch("http://127.0.0.1:5000/rating", {
			method: "POST",
			body: JSON.stringify({ rating, feedback, profesionalId }),
			headers: { "Content-Type": "application/json" },
		});
		if (response.ok) {
			setRatingSubmitted((prevState) => ({
				[id]: true, // Set submission status for current appointment
			}));
			setShowRating(false);
			setShowbtn(true);
			setShowm(true);
			setRating(null);

			console.log("hi");
		}
	};
	const totalRating = ratings.reduce(
		(sum, rating) => sum + parseInt(rating.rating),
		0
	);
	const compareStatus = (a, b) => {
		let statusOrder = {};

		statusOrder = {
			["In Progress"]: 1,
			["Completed"]: 2,
			["Canceled"]: 3,
		};

		return statusOrder[a.status] - statusOrder[b.status];
	};
	const handleSort = () => {
		const sortedAppointments = [...appointment].sort(compareStatus);
		setAppointment(sortedAppointments);
		setSorted(!isSorted);
	};
	// Calculate the average rating
	const averageRating = (totalRating / ratings.length).toFixed(2);
	let errors = {};
	const validateForm = () => {
		if (!fname) {
			errors.fname = "Firstname is required";
		} else if (!fname.match(/^[A-Za-z]+$/)) {
			errors.fname = "First name must contain only characters.";
		}

		if (!lname) {
			errors.lname = "Lastname is required";
		} else if (!lname.match(/^[A-Za-z]+$/)) {
			errors.lname = "Last name must contain only characters.";
		}
		if (!SelectedBank) {
			errors.bank = "Select a bank";
		}
		if (
			SelectedBank == "153d0598-4e01-41ab-a693-t9e2g4da6u13" ||
			SelectedBank == "853d0598-9c01-41ab-ac99-48eab4da1513"
		) {
			if (!phone) {
				errors.phone = "Phone is required";
			} else if (!phone.match(/^(09)\d{8}$/)) {
				errors.phone = "Invalid phone number format.";
			}
		}
		if (SelectedBank == "96e41186-29ba-4e30-b013-2ca36d7e7025") {
			if (!accountCBE) {
				errors.cbe = "Account is required";
			} else if (!accountCBE.match(/^\d+$/)) {
				errors.cbe = "Invalid Account format.";
			} else if (accountCBE.length !== 13) {
				errors.cbe = "Account number must be 13.";
			}
		}
		if (SelectedBank == "32735b19-bb36-4cd7-b226-fb7451cd98f0") {
			if (!accountAbysiniya) {
				errors.abs = "Account is required";
			} else if (!accountAbysiniya.match(/^\d+$/)) {
				errors.abs = "Invalid Account format.";
			} else if (accountAbysiniya.length !== 8) {
				errors.abs = "Account number must be 8.";
			}
		}
		if (SelectedBank == "80a510ea-7497-4499-8b49-ac13a3ab7d07") {
			if (!accountAwash) {
				errors.awash = "Account is required";
			} else if (!accountAwash.match(/^\d+$/)) {
				errors.awash = "Invalid Account format.";
			} else if (accountAwash.length !== 14) {
				errors.awash = "Account number must be 14.";
			}
		}

		setValidationErrors(errors);
		return Object.keys(errors).length === 0;
	};
	const handleChangeStatus = async (event) => {
		event.preventDefault();
		alert(phone);
		let acc = "";
		if (accountAbysiniya) {
			acc = accountAbysiniya;
		} else if (accountAwash) {
			acc = accountAwash;
		} else if (accountCBE) {
			acc = accountCBE;
		} else if (phone) {
			if (phone.length == 8) {
				acc = "09" + phone;
			} else {
				acc = phone;
			}
		}

		console.log(validationErrors);
		if (validateForm()) {
			setValidationErrors({});
			const response = await fetch("http://127.0.0.1:5000/cancelAppointment", {
				method: "PUT",
				body: JSON.stringify({
					id,
					fname,
					lname,
					SelectedBank,
					acc,
					servicePrice,
				}),
				headers: { "Content-Type": "application/json" },
			});
			if (response.ok) {
				setShowCancel(false);
				fetchProduct();
				setShowAppointmentCanlationMessagee(true);
				setFname("");
				setLname("");
				setAccountAwash("");
				setAccountAbysiniya("");
				setAccountCBE("");
				setPhone("");
				setSelectedBank("80a510ea-7497-4499-8b49-ac13a3ab7d07");
			} else {
				setErrMessage(true);
			}
		}
	};

	return (
		<div>
			<Header />
			{/* <button onClick={handleSort} className="sort">
				<TbArrowsSort size={30} />
			</button>{" "}
			<span className="sortp" onClick={handleSort}>
				Sort
			</span> */}
			{appointment.sort(compareStatus).map((appoint, index) => (
				<div
					className="customerappointment"
					style={{
						backgroundColor: appoint.status === "Canceled" ? "#f05f46" : "",
					}}>
					<p className="customerappointment-p">
						Date:
						<span className="customerappointment-span">
							{appoint.appointmentDate}
						</span>
					</p>
					<p className="customerappointment-p">
						Start Time:
						<span className="customerappointment-span">
							{appoint.startTime}
						</span>
					</p>
					<p className="customerappointment-p">
						End Time:
						<span className="customerappointment-span">{appoint.endTime}</span>
					</p>
					<p className="customerappointment-p">
						Status:
						<span className="customerappointment-span">{appoint.status}</span>
					</p>
					{remainingDays[index] > 1 && appoint.status === "In Progress" && (
						<button
							className="customerappointment-button"
							onClick={() => {
								const fetchProduct = async () => {
									try {
										const response = await fetch(
											`http://127.0.0.1:5000/serviceInfo/${appoint.serviceId}`,
											{
												method: "Get",
											}
										);
										const data = await response.json();
										const price = Math.round(data[0].serviceprice * 0.3);
										setServicePrice(price);
									} catch (e) {
										console.log(e);
									}
								};
								fetchProduct();
								setId(appoint.id);
								setShowCancel(true);
							}}
							style={{ width: "180px" }}>
							Cancel Appointment
						</button>
					)}
					{remainingDays[index] < 0 && appoint.status === "In Progress" && (
						<button
							className="rateprofesioanl-button"
							style={{ width: "180px" }}>
							Time Passed
						</button>
					)}
					{remainingDays[index] === 0 && appoint.status === "In Progress" && (
						<button
							className="rateprofesioanl-button"
							style={{ width: "180px" }}>
							Appointment is today
						</button>
					)}

					{remainingDays[index] === 1 && appoint.status === "In Progress" && (
						<button
							className="rateprofesioanl-button"
							style={{ width: "180px" }}>
							1 day Left
						</button>
					)}

					<>
						{appoint.status === "Completed" && (
							<button
								className="rateprofesioanl-button rotate-outline"
								onClick={() => {
									fetchProfesionalData(appoint.professionalId);
									setShowRating(true);
									setId(appoint.id);
								}}
								style={{ width: "180px" }}>
								Rate Professional
							</button>
						)}
					</>
				</div>
			))}
			{profesionalData.length > 0 && showRating && (
				<div className="profileshow">
					<div className="prof-rate-cont">
						<>
							<div>
								<img
									src={profesionalData[0].pimage}
									className="ratingPhoto"
									alt=""
								/>
							</div>
							<div>
								<p className="pName">
									{profesionalData[0]?.fname + " " + profesionalData[0].lname}
								</p>
								<p className="pEmail">{profesionalData[0]?.email}</p>
								<p className="pProfesion">
									{profesionalData[0].profession} Profesional
								</p>

								{averageRating == 0 && <p className="rating">Not Rated</p>}
								{averageRating > 0 && (
									<p className="rating">Rating:({averageRating})⭐</p>
								)}
								{isNaN(averageRating) && <p className="rating">Not Rated</p>}
							</div>
							<div className="startdiv">
								<p className="pName">Rate Profesional From 5</p>
								{[...Array(5)].map((star, index) => {
									const currentRating = index + 1;
									return (
										<label>
											<input
												type="radio"
												name="rating"
												value={currentRating}
												onClick={() => setRating(currentRating)}></input>
											<FaStar
												size={20}
												className="star"
												color={
													currentRating <= (hover || rating)
														? "#ffc107"
														: "#e66700"
												}
												onMouseEnter={() => setHover(currentRating)}
												onMouseLeave={() => setHover(null)}></FaStar>
										</label>
									);
								})}
								{error && <p className="errorrr">please Rate profesional!</p>}
								<p className="pName">Provides Feedback</p>
								<textarea
									className="textarea"
									name=""
									id=""
									cols="35"
									rows="7"
									onChange={(e) => {
										setFeedback(e.target.value);
									}}></textarea>
								<button className="startRatingbutton" onClick={handleRating}>
									Finish Rating
								</button>
							</div>
						</>
					</div>
					<MdCancel
						className="cancelrating"
						size={40}
						onMouseEnter={() => setIsVisible(true)}
						onMouseLeave={() => setIsVisible(false)}
						onClick={() => setShowRating(false)}
					/>
					{isVisible && <span className="tooltipCancel">cancel</span>}
				</div>
			)}
			{showm && (
				<div className="llnn">
					<div className="thanks-cont">
						<p className="feedbackmess">Thanks for Your FeedBack And Rating</p>
					</div>
				</div>
			)}
			{showCancel && (
				<div className="cancecont">
					<form onSubmit={handleChangeStatus}>
						<div className="fullsignnn">
							<div className="signlogin-container">
								<div
									className="signup"
									style={{ marginLeft: "200px", marginTop: "50px" }}>
									<div className="signupform container">
										<div>
											<label htmlFor="firstname">Select Bank</label>
											<select
												id="servicecatagory"
												name="servicecatagory"
												className="serviceform-select"
												onChange={handleSelectedBank}
												value={SelectedBank}>
												<option value="80a510ea-7497-4499-8b49-ac13a3ab7d07">
													Awash Bank
												</option>
												<option value="32735b19-bb36-4cd7-b226-fb7451cd98f0">
													Bank of Abyssinia
												</option>
												<option
													value="96e41186-29ba-4e30-b013-2ca36d7e7025"
													selected>
													Commercial Bank of Ethiopia (CBE)
												</option>
												<option value="153d0598-4e01-41ab-a693-t9e2g4da6u13">
													CBEBir
												</option>
												<option value="853d0598-9c01-41ab-ac99-48eab4da1513">
													telebirr
												</option>
											</select>
											{validationErrors.bank && (
												<span className="error">{validationErrors.bank}</span>
											)}
										</div>

										<div>
											<label htmlFor="firstname">Account First Name</label>
											<input
												type="text"
												name="firstname"
												id="firstname"
												placeholder="FirstName"
												onChange={handleChangeFirstName}
											/>{" "}
											{validationErrors.fname && (
												<span className="error">{validationErrors.fname}</span>
											)}
										</div>

										<div>
											<label htmlFor="lastname">Account Last Name</label>
											<input
												type="text"
												name="lastname"
												id="lastname"
												placeholder="LastName"
												onChange={handleChangeLastName}
											/>{" "}
											{validationErrors.lname && (
												<span className="error">{validationErrors.lname}</span>
											)}
										</div>
										{SelectedBank == "153d0598-4e01-41ab-a693-t9e2g4da6u13" && (
											<div>
												<label htmlFor="age">Phone</label>
												<input
													type="number"
													name="age"
													id="age"
													placeholder="your age"
													onChange={handleChangePhone}
												/>
												{validationErrors.phone && (
													<span className="error">
														{validationErrors.phone}
													</span>
												)}
											</div>
										)}
										{SelectedBank == "853d0598-9c01-41ab-ac99-48eab4da1513" && (
											<div>
												<label htmlFor="age">Phone</label>
												<input
													type="number"
													name="age"
													id="age"
													placeholder="your age"
													onChange={handleChangePhone}
												/>
												{validationErrors.phone && (
													<span className="error">
														{validationErrors.phone}
													</span>
												)}
											</div>
										)}
										{SelectedBank == "96e41186-29ba-4e30-b013-2ca36d7e7025" && (
											<div>
												<label htmlFor="age">CBE Account</label>
												<input
													type="text"
													name="age"
													id="age"
													placeholder="your age"
													onChange={handleChangeAccountCBE}
												/>
												{validationErrors.cbe && (
													<span className="error">{validationErrors.cbe}</span>
												)}
											</div>
										)}
										{SelectedBank == "32735b19-bb36-4cd7-b226-fb7451cd98f0" && (
											<div>
												<label htmlFor="age">Abyssinia Bank Account</label>
												<input
													type="text"
													name="age"
													id="age"
													placeholder="your age"
													onChange={handleChangeAccountAbysi}
												/>
												{validationErrors.abs && (
													<span className="error">{validationErrors.abs}</span>
												)}
											</div>
										)}
										{SelectedBank == "80a510ea-7497-4499-8b49-ac13a3ab7d07" && (
											<div>
												<label htmlFor="age">Awash Bank Account</label>
												<input
													type="text"
													name="age"
													id="age"
													placeholder="your age"
													onChange={handleChangeAccountAwash}
												/>
												{validationErrors.awash && (
													<span className="error">
														{validationErrors.awash}
													</span>
												)}
											</div>
										)}

										<button type="submit" className="signupform-a">
											Submit
										</button>
										<button
											type="button"
											className="signupform-a"
											style={{ backgroundColor: "Green" }}
											onClick={() => setShowCancel(false)}>
											Cancel
										</button>
									</div>
								</div>
							</div>
						</div>
					</form>
				</div>
			)}
			{showAppointmentCanlationMessagee && (
				<>
					<div className="popup-container">
						<div className="popup">
							<span className="check-mark"> &#10003;</span>
							<p>
								Your Appointment is Canceled and your Many is Returned To your
								Account
							</p>
						</div>
					</div>
				</>
			)}
			{errorMessage && (
				<>
					<div className="popup-container">
						<div className="popup">
							<span className="appointment-check-mark"> &#9888;</span>
							<p>Your Account Information Is Incorrect Please Try Again</p>
						</div>
					</div>
				</>
			)}
		</div>
	);
}
