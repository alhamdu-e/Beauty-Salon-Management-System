import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from "react";
import "../../assets/styles/appointment.css";
import Header from "../Header";
import { useAuth } from "../../context/Autcontext";

function Appointment() {
	const [selectedDate, setSelectedDate] = useState(null);
	const [selectedStartTime, setSelectedStartTime] = useState(null);
	const [startTime, setStartTime] = useState(null);
	const [selectedEndTime, setSelectedEndTime] = useState(null);
	const [userData, setUserData] = useState([]);

	const [availableProfessional, SetAvailableProfessional] = useState([]);
	const [selectedProfessionalId, setSelectedProfessionalId] = useState("");

	const userId = localStorage.getItem("userId");

	useEffect(() => {
		fetch(`http://127.0.0.1:5000/user/${userId}`, {
			method: "GET",
		})
			.then((response) => response.json())
			.then((data) => {
				setUserData(data);
			});

		fetch(`http://127.0.0.1:5000/profesional/available`, {
			method: "GET",
		})
			.then((response) => response.json())
			.then((data) => {
				SetAvailableProfessional(data);
			});
	}, []);

	const handleDateChange = (date) => {
		setSelectedDate(date);
		console.log("Selected Date:", date); // Log selected date to console
	};

	const handleStartTimeChange = (time) => {
		setSelectedStartTime(time);
		// Extracting hours and minutes from selectedStartTime
		// const selectedStartTimeString = time.toLocaleTimeString();
		// console.log(selectedStartTimeString);
		// const selectedStartTimeFormatted = selectedStartTimeString
		// 	.split(":")
		// 	.slice(0, 2)
		// 	.join(":");
		const hours = time.getHours();
		const minutes = time.getMinutes();
		const meridian = hours >= 12 ? "PM" : "AM";
		// console.log("Selected Time:", selectedStartTimeFormatted);
		const formatedDate = `${hours}:${meridian}`;
		setStartTime(formatedDate);
	};

	const handleEndTimeChange = (time) => {
		setSelectedEndTime(time);
		console.log("Selected End Time:", time); // Log selected end time to console
	};

	const handleProfessionalChange = (e) => {
		setSelectedProfessionalId(parseInt(e.target.value)); // Update selected professional ID state
	};
	let selectedProfessional = [];
	if (availableProfessional) {
		selectedProfessional = availableProfessional.filter(
			(user) => user.id === selectedProfessionalId
		);
		console.log(selectedProfessional);
	}
	return (
		<div className="main-cont-for-appointment">
			<Header />

			<div className="appointment-container">
				<form action="">
					<div className="appointmentform container">
						<input type="text" value={startTime} />
						<div>
							<label htmlFor="service">Select professional</label>
							<select
								name="service"
								id="service"
								className="appointmentform-select"
								onChange={handleProfessionalChange} // Added onChange handler
							>
								{availableProfessional &&
									availableProfessional.map((professional) => (
										<option key={professional.id} value={professional.id}>
											{professional.fname}
										</option>
									))}
							</select>
						</div>
						<div>
							<label htmlFor="date">Select Date</label>
							<DatePicker
								selected={selectedDate}
								onChange={handleDateChange}
								dateFormat="MM/dd/yyyy"
								placeholderText="Select date"
								minDate={new Date()}
								wrapperClassName="input"
							/>
						</div>

						<div>
							<label htmlFor="time">Select Start Time</label>
							<DatePicker
								selected={selectedStartTime}
								onChange={handleStartTimeChange}
								showTimeSelect
								showTimeSelectOnly
								timeIntervals={30} // Updated to 60 minutes (1 hour)
								dateFormat="h:mm aa"
								placeholderText="Select time"
								minTime={new Date().setHours(2, 0)} // 2:00 AM
								maxTime={new Date().setHours(13, 0)} // 5:00 PM
								wrapperClassName="input"
							/>
						</div>

						<div>
							<label htmlFor="time">Select End Time</label>
							<DatePicker
								selected={selectedEndTime}
								onChange={handleEndTimeChange}
								showTimeSelect
								showTimeSelectOnly
								timeIntervals={120}
								dateFormat="h:mm aa"
								placeholderText="Select time"
								minTime={new Date().setHours(2, 0)} // 2:00 AM
								maxTime={new Date().setHours(17, 0)} // 5:00 PM
								wrapperClassName="input"
							/>
						</div>
						<div>
							<button className="appointmentform-button">Appoint Now</button>
						</div>
					</div>
				</form>
				<div>
					<div className="image-cont">
						{selectedProfessional.length > 0 && (
							<>
								<img
									src="./images/G22.jpg"
									className="profesional-image"
									alt=""
								/>
								<div className="service-prof-cont">
									<p>
										<span>Name: </span>
										{selectedProfessional[0].fname}
									</p>
									<p>
										<span>Email: </span>
										{selectedProfessional[0].email}
									</p>
									<p>
										<span>Rating(⭐)</span>5
									</p>
								</div>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
export default Appointment;
