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
	const [endTime, setEndTime] = useState(null);
	const [date, setDate] = useState(null);

	const [userData, setUserData] = useState([]);
	const [classfier, setClassfier] = useState(0);

	const [availableProfessional, SetAvailableProfessional] = useState([]);
	const [selectedProfessionalId, setSelectedProfessionalId] = useState("");
	const [errPro, setErrProf] = useState(false);
	const [errDate, setErrDate] = useState(false);
	const [errTime, setErrTime] = useState(false);

	const userId = localStorage.getItem("userId");
	const [appointmetDate, setAppointmentDate] = useState([]);

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
	useEffect(() => {
		fetch(
			`http://127.0.0.1:5000/profesionalAppointed/${selectedProfessionalId}`,
			{
				method: "GET",
			}
		)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setAppointmentDate(data);
			});
	}, [selectedProfessionalId]);

	const handleDateChange = (date) => {
		setSelectedDate(date);
		const day = date.getDate(); // Get the day of the month
		const month = date.getMonth() + 1; // Get the month (add 1 since it's 0-indexed)
		const year = date.getFullYear(); // Get the full year
		const formatedDate = `${day}/${month}/${year}`;
		setDate(formatedDate);
	};

	const handleStartTimeChange = (time) => {
		setSelectedStartTime(time);
		console.log(time);
		const hours = time.getHours();
		let startmeridian = "";
		console.log("ji");
		let endHour;
		let startHour;
		if (hours >= 9 && hours <= 10) {
			endHour = hours + 2;
			startHour = hours;
			startmeridian = "AM";
		} else if (hours === 11) {
			endHour = 1;
			startHour = hours;
			startmeridian = "PM";
		} else if (hours === 12) {
			endHour = 2;
			startHour = hours;
			startmeridian = "PM";
		} else if (hours === 13) {
			endHour = 3;
			startHour = 1;
			startmeridian = "PM";
		} else if (hours === 14) {
			endHour = 4;
			startHour = 2;
			startmeridian = "PM";
		} else if (hours === 15) {
			endHour = 5;
			startHour = 3;
			startmeridian = "PM";
		} else if (hours === 16) {
			endHour = 6;
			startHour = 4;
			startmeridian = "PM";
		} else if (hours === 17) {
			endHour = 7;
			startHour = 5;
			startmeridian = "PM";
		}

		setClassfier(hours + 2);
		const minutes = time.getMinutes();
		const meridian = hours >= 12 ? "PM" : "AM";
		const formattedMinutes = minutes.toString().padStart(2, "0");
		const formattedStratTime = `${startHour}:${formattedMinutes} ${meridian}`;
		const formattedEndTime = `${endHour}:${formattedMinutes} ${startmeridian}`;

		setStartTime(formattedStratTime);
		setEndTime(formattedEndTime);
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
	const appointData = {
		selectedProfessionalId,
		userId,
		date,
		startTime,
		endTime,
	};
	const handleSubmit = async (event) => {
		event.preventDefault();
		// if (!selectedProfessionalId || !selectedDate || !selectedStartTime) {
		// 	alert("Please fill out all required fields.");
		// 	return;
		// }
		if (!selectedProfessionalId) {
			setErrProf(true);
			return;
		}
		if (selectedProfessionalId) {
			setErrProf(false);
		}
		if (!selectedDate) {
			setErrDate(true);
			return;
		}
		if (selectedDate) {
			setErrDate(false);
		}
		if (!selectedStartTime) {
			setErrTime(true);
			return;
		}

		if (selectedStartTime) {
			setErrTime(false);
		}
		// Check for overlapping appointments
		const overlappingAppointments = appointmetDate.filter((appointment) => {
			// Format the stored appointment date and time
			const storedAppointmentDate = appointment.appointmentDate;
			const storedAppointmentStartTime = appointment.startTime;
			const storedAppointmentEndTime = appointment.endTime;
			// Check if the selected time slot overlaps with the current appointment
			return (
				storedAppointmentDate === date &&
				storedAppointmentStartTime === startTime &&
				storedAppointmentEndTime === endTime
			);
		});

		// If there are overlapping appointments, prevent submission
		if (overlappingAppointments.length > 0) {
			alert(
				"Selected time slot overlaps with an existing appointment. Please choose a different time."
			);
			return;
		}

		console.log(appointData);
		try {
			const response = await fetch("http://127.0.0.1:5000/appointment", {
				method: "POST",
				body: JSON.stringify(appointData),
				headers: { "Content-Type": "application/json" },
			});
			if (response.ok) {
				console.log("user registered");
			} else {
				console.log("user not registered", response.statusText);
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className="main-cont-for-appointment">
			<Header />

			<div className="appointment-container">
				<form onSubmit={handleSubmit}>
					<div className="appointmentform container">
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
							<p className={errPro ? "block err" : "err"}>
								Please Select Profesional
							</p>
						</div>
						<div>
							<label htmlFor="date">Select Date</label>
							<DatePicker
								selected={selectedDate}
								onChange={handleDateChange}
								dateFormat="dd/MM/yyyy"
								placeholderText="Select date"
								minDate={new Date()}
								wrapperClassName="input"
							/>
							<p className={errDate ? "block err" : "err"}>
								Please Select Date
							</p>
						</div>

						<div>
							<label htmlFor="time">Select Start Time</label>
							<DatePicker
								selected={selectedStartTime}
								onChange={handleStartTimeChange}
								showTimeSelect
								showTimeSelectOnly
								timeIntervals={15}
								dateFormat="h:mm aa"
								placeholderText="Select time"
								minTime={new Date().setHours(9, 0)} // Set your minimum time
								maxTime={new Date().setHours(17, 0)} // Set your maximum time
								wrapperClassName="input"
							/>
							<p className={errTime ? "block err" : "err"}>
								Please Select Start time
							</p>
						</div>

						<div>
							<label htmlFor="time">End Time</label>
							<input type="text" value={endTime} readOnly className="input" />
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
									<p className="srrv-name">
										<span className="spanpro">Name: </span>
										{selectedProfessional[0].fname}
									</p>
									<p className="srrv-name">
										<span className="spanpro">Email: </span>
										{selectedProfessional[0].email}
									</p>
									<p className="srrv-name">
										<span className="spanpro">Rating(⭐)</span>5
									</p>
								</div>
							</>
						)}
					</div>
					{appointmetDate.length > 0 && (
						<div>
							<h2 className="schedile">Selected ptofessional schedule</h2>
							<table className="apooointment-table">
								<thead>
									<tr className="th">
										<th className="th">Date</th>
										<th className="th">Start time</th>
										<th className="th">end Time</th>
									</tr>
								</thead>
								{appointmetDate.length > 0 &&
									appointmetDate.map((appointData) => (
										<>
											<tr className="th">
												<td className="td">{appointData.appointmentDate}</td>
												<td className="td">{appointData.startTime}</td>
												<td className="td">{appointData.endTime}</td>
											</tr>
										</>
									))}
							</table>
						</div>
					)}
					{appointmetDate.length == 0 && (
						<h1 className="selectedPro">
							Selected Profesional have no Schedule
						</h1>
					)}
				</div>
			</div>
		</div>
	);
}
export default Appointment;
