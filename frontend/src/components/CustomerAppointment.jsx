import Header from "./Header";
import "../assets/styles/customerappointment.css";
import { FaStar } from "react-icons/fa";
import { useUserContext } from "../context/UserContext";
import { useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";
import { useSearchParams } from "react-router-dom";
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

	useEffect(() => {
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
		if (!isSorted) {
			statusOrder = {
				["In Progress"]: 1,
				["Completed"]: 2,
			};
		}
		if (isSorted) {
			statusOrder = {
				["In Progress"]: 2,
				["Completed"]: 1,
			};
		}

		return statusOrder[a.status] - statusOrder[b.status];
	};
	const handleSort = () => {
		const sortedAppointments = [...appointment].sort(compareStatus);
		setAppointment(sortedAppointments);
		setSorted(!isSorted);
	};
	// Calculate the average rating
	const averageRating = (totalRating / ratings.length).toFixed(2);
	return (
		<div>
			<Header />
			<button onClick={handleSort} className="sort">
				<TbArrowsSort size={30} />
			</button>{" "}
			<span className="sortp" onClick={handleSort}>
				Sort
			</span>
			{appointment.map((appoint) => (
				<div className="customerappointment">
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
					{appoint.status === "In Progress" && (
						<button className="customerappointment-button">
							Cancel Appointment
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
								}}>
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
		</div>
	);
}
