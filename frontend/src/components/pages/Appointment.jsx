import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from "react";
import "../../assets/styles/appointment.css";
import Header from "../Header";
import { useAuth } from "../../context/Autcontext";

function Appointment(props) {
	const [selectedDate, setSelectedDate] = useState(null);
	const [selectedStartTime, setSelectedStartTime] = useState(null);
	const [startTime, setStartTime] = useState(null);
	const [endTime, setEndTime] = useState(null);
	const [date, setDate] = useState(null);

	const [availableProfessional, SetAvailableProfessional] = useState([]);
	const [selectedProfessionalId, setSelectedProfessionalId] = useState("");
	const [errPro, setErrProf] = useState(false);
	const [errDate, setErrDate] = useState(false);
	const [errTime, setErrTime] = useState(false);
	const [serviceHour, setServiceHour] = useState(props.serviceHour);

	const userId = localStorage.getItem("userId");
	const [appointmetDate, setAppointmentDate] = useState([]);

	useEffect(() => {
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
		let minutes = time.getMinutes();
		let startMinutes = time.getMinutes();
		let startmeridian = "";
		console.log("ji ", hours, minutes + 30);
		let endHour;
		let startHour;
		if (serviceHour === "2") {
			if (hours === 9) {
				endHour = hours + 2;
				startHour = hours;
				startmeridian = "AM";
			} else if (hours === 10) {
				endHour = hours + 2;
				startHour = hours;
				startmeridian = "PM";
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
		}

		if (serviceHour === "1") {
			if (hours >= 9 && hours <= 10) {
				endHour = hours + 1;
				startHour = hours;
				startmeridian = "AM";
			} else if (hours === 11) {
				endHour = hours + 1;
				startHour = hours;
				startmeridian = "PM";
			} else if (hours === 12) {
				endHour = 1;
				startHour = hours;
				startmeridian = "PM";
			} else if (hours === 13) {
				endHour = 2;
				startHour = 1;
				startmeridian = "PM";
			} else if (hours === 14) {
				endHour = 3;
				startHour = 2;
				startmeridian = "PM";
			} else if (hours === 15) {
				endHour = 4;
				startHour = 3;
				startmeridian = "PM";
			} else if (hours === 16) {
				endHour = 5;
				startHour = 4;
				startmeridian = "PM";
			} else if (hours === 17) {
				endHour = 6;
				startHour = 5;
				startmeridian = "PM";
			} else if (hours === 18) {
				endHour = 7;
				startHour = 6;
				startmeridian = "PM";
			}
		}
		if (serviceHour === "1:30") {
			if (hours === 9 && minutes < 30) {
				startHour = hours;
				endHour = hours + 1;
				startMinutes = minutes;
				minutes = minutes + 30;

				startmeridian = "AM";
			} else if (hours === 9 && minutes >= 30) {
				startHour = hours;
				endHour = hours + 2;
				startMinutes = minutes;
				minutes = minutes - 30;
				startmeridian = "AM";
			} else if (hours === 10 && minutes < 30) {
				startHour = hours;
				endHour = hours + 1;
				startMinutes = minutes;
				minutes = minutes + 30;
				startmeridian = "AM";
			} else if (hours === 10 && minutes >= 30) {
				startHour = hours;
				endHour = hours + 2;
				startMinutes = minutes;
				minutes = minutes - 30;
				startmeridian = "PM";
			} else if (hours === 11 && minutes < 30) {
				startHour = hours;
				endHour = hours + 1;
				startMinutes = minutes;
				minutes = minutes + 30;
				startmeridian = "PM";
			} else if (hours === 11 && minutes >= 30) {
				startHour = hours;
				endHour = 1;
				startMinutes = minutes;
				minutes = minutes - 30;
				startmeridian = "PM";
			} else if (hours === 12 && minutes < 30) {
				startHour = hours;
				endHour = 1;
				startMinutes = minutes;
				minutes = minutes + 30;
				startmeridian = "PM";
			} else if (hours === 12 && minutes >= 30) {
				startHour = hours;
				endHour = 2;
				startMinutes = minutes;
				minutes = minutes - 30;
				startmeridian = "PM";
				startMinutes = minutes;
			} else if (hours === 13 && minutes < 30) {
				startHour = 1;
				endHour = startHour + 1;
				startMinutes = minutes;
				minutes = minutes + 30;
				startmeridian = "PM";
			} else if (hours === 13 && minutes >= 30) {
				startHour = 1;
				endHour = startHour + 2;
				startMinutes = minutes;
				minutes = minutes - 30;
				startmeridian = "PM";
			} else if (hours === 14 && minutes < 30) {
				startHour = 2;
				endHour = startHour + 1;
				startMinutes = minutes;
				minutes = minutes + 30;
				startmeridian = "PM";
			} else if (hours === 14 && minutes >= 30) {
				startHour = 2;
				endHour = startHour + 2;
				startMinutes = minutes;
				minutes = minutes - 30;
				startmeridian = "PM";
			} else if (hours === 15 && minutes < 30) {
				startHour = 3;
				endHour = startHour + 1;
				startMinutes = minutes;
				minutes = minutes + 30;
				startmeridian = "PM";
			} else if (hours === 15 && minutes >= 30) {
				startHour = 3;
				endHour = startHour + 2;
				startMinutes = minutes;
				minutes = minutes - 30;
				startmeridian = "PM";
			} else if (hours === 16 && minutes < 30) {
				startHour = 4;
				endHour = startHour + 1;
				startMinutes = minutes;
				minutes = minutes + 30;
				startmeridian = "PM";
			} else if (hours === 16 && minutes >= 30) {
				startHour = 4;
				endHour = startHour + 2;
				startMinutes = minutes;
				minutes = minutes - 30;
				startmeridian = "PM";
			} else if (hours === 17 && minutes < 30) {
				startHour = 5;
				endHour = startHour + 1;
				startMinutes = minutes;
				minutes = minutes + 30;
				startmeridian = "PM";
			} else if (hours === 17 && minutes >= 30) {
				startHour = 5;
				endHour = startHour + 2;
				startMinutes = minutes;
				minutes = minutes - 30;
				startmeridian = "PM";
			}
		}

		const meridian = hours >= 12 ? "PM" : "AM";
		const formatedstartMinutes = startMinutes.toString().padStart(2, "0");
		const formattedEndMinutes = minutes.toString().padStart(2, "0");
		const formattedStratTime = `${startHour}:${formatedstartMinutes} ${meridian}`;
		const formattedEndTime = `${endHour}:${formattedEndMinutes} ${startmeridian}`;

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
		console.log("bad thing");

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
			let timeDifference = false;
			let storedStartHour = "";
			let storedEndHour = "";
			let storedMinutes = "";
			let storedMeridian = storedAppointmentEndTime.slice(-2);
			let newStartHour = "";
			let NewMinutes = "";
			let NewMeridian = startTime.slice(-2);
			if (storedAppointmentEndTime.length === 8) {
				storedEndHour = parseInt(storedAppointmentEndTime.substring(0, 2));
				storedStartHour = parseInt(storedAppointmentStartTime.substring(0, 2));

				storedMinutes = parseInt(storedAppointmentEndTime.substring(3, 5));
			}
			if (storedAppointmentEndTime.length === 7) {
				storedEndHour = parseInt(storedAppointmentEndTime.substring(0, 1));
				storedStartHour = parseInt(storedAppointmentStartTime.substring(0, 1));

				storedMinutes = parseInt(storedAppointmentEndTime.substring(2, 4));
			}
			if (startTime.length === 8) {
				newStartHour = parseInt(startTime.substring(0, 2));
				NewMinutes = parseInt(startTime.substring(3, 5));
			}
			if (startTime.length === 7) {
				newStartHour = parseInt(startTime.substring(0, 1));
				NewMinutes = parseInt(startTime.substring(2, 4));
			}
			if (
				storedEndHour - storedStartHour === 2 ||
				storedEndHour - storedStartHour === -10
			) {
				timeDifference = true;
			}
			// Check if the selected time slot overlaps with the current appointment
			return (
				(storedAppointmentDate === date &&
					storedAppointmentStartTime === startTime &&
					storedAppointmentEndTime === endTime) ||
				(date === storedAppointmentDate &&
					storedMeridian === NewMeridian &&
					storedEndHour == 10 &&
					newStartHour == 9) ||
				(date === storedAppointmentDate &&
					storedMeridian === NewMeridian &&
					storedEndHour == 10 &&
					NewMinutes <= storedMinutes &&
					newStartHour == 10) ||
				(date === storedAppointmentDate &&
					storedMeridian === NewMeridian &&
					storedEndHour == 11 &&
					newStartHour == 10) ||
				(date === storedAppointmentDate &&
					storedMeridian === NewMeridian &&
					storedEndHour == 11 &&
					NewMinutes <= storedMinutes &&
					newStartHour == 11) ||
				(storedEndHour == 12 &&
					date === storedAppointmentDate &&
					newStartHour == 11) ||
				(storedEndHour == 12 &&
					date === storedAppointmentDate &&
					NewMinutes <= storedMinutes &&
					newStartHour == 12) ||
				(storedEndHour == 1 &&
					date === storedAppointmentDate &&
					newStartHour == 12 &&
					storedMeridian === NewMeridian) ||
				(storedEndHour == 1 &&
					date === storedAppointmentDate &&
					newStartHour == 1 &&
					NewMinutes <= storedMinutes &&
					storedMeridian === NewMeridian) ||
				(storedEndHour == 2 &&
					date === storedAppointmentDate &&
					newStartHour == 1 &&
					storedMeridian === NewMeridian) ||
				(storedEndHour == 2 &&
					date === storedAppointmentDate &&
					newStartHour == 2 &&
					NewMinutes <= storedMinutes &&
					storedMeridian === NewMeridian) ||
				(storedEndHour == 3 &&
					date === storedAppointmentDate &&
					newStartHour == 2 &&
					storedMeridian === NewMeridian) ||
				(storedEndHour == 3 &&
					date === storedAppointmentDate &&
					newStartHour == 3 &&
					NewMinutes <= storedMinutes &&
					storedMeridian === NewMeridian) ||
				(storedEndHour == 4 &&
					date === storedAppointmentDate &&
					newStartHour == 3 &&
					storedMeridian === NewMeridian) ||
				(storedEndHour == 4 &&
					date === storedAppointmentDate &&
					newStartHour == 4 &&
					NewMinutes <= storedMinutes &&
					storedMeridian === NewMeridian) ||
				(storedEndHour == 5 &&
					date === storedAppointmentDate &&
					newStartHour == 4 &&
					storedMeridian === NewMeridian) ||
				(storedEndHour == 5 &&
					date === storedAppointmentDate &&
					newStartHour == 5 &&
					NewMinutes <= storedMinutes &&
					storedMeridian === NewMeridian) ||
				(storedEndHour == 6 &&
					date === storedAppointmentDate &&
					newStartHour == 5 &&
					storedMeridian === NewMeridian) ||
				(storedEndHour == 6 &&
					date === storedAppointmentDate &&
					newStartHour == 6 &&
					NewMinutes <= storedMinutes &&
					storedMeridian === NewMeridian) ||
				(storedEndHour == 7 &&
					date === storedAppointmentDate &&
					newStartHour == 7 &&
					NewMinutes <= storedMinutes &&
					storedMeridian === NewMeridian) ||
				(date === storedAppointmentDate &&
					storedMeridian === NewMeridian &&
					storedEndHour == 11 &&
					timeDifference &&
					(newStartHour == 9 || newStartHour == 10)) ||
				(date === storedAppointmentDate &&
					storedMeridian === NewMeridian &&
					storedEndHour == 11 &&
					timeDifference &&
					NewMinutes <= storedMinutes &&
					newStartHour == 11) ||
				(date === storedAppointmentDate &&
					storedEndHour == 12 &&
					timeDifference &&
					(newStartHour == 11 || newStartHour == 10)) ||
				(date === storedAppointmentDate &&
					storedEndHour == 12 &&
					timeDifference &&
					NewMinutes <= storedMinutes &&
					newStartHour == 12) ||
				(date === storedAppointmentDate &&
					storedEndHour == 1 &&
					timeDifference &&
					(newStartHour == 11 || newStartHour == 12)) ||
				(date === storedAppointmentDate &&
					storedEndHour == 1 &&
					timeDifference &&
					NewMinutes <= storedMinutes &&
					newStartHour == 1) ||
				(date === storedAppointmentDate &&
					storedMeridian === NewMeridian &&
					storedEndHour == 2 &&
					timeDifference &&
					(newStartHour == 1 || newStartHour == 12)) ||
				(date === storedAppointmentDate &&
					storedMeridian === NewMeridian &&
					storedEndHour == 2 &&
					timeDifference &&
					NewMinutes <= storedMinutes &&
					newStartHour == 2) ||
				(date === storedAppointmentDate &&
					storedMeridian === NewMeridian &&
					storedEndHour == 3 &&
					timeDifference &&
					(newStartHour == 1 || newStartHour == 2)) ||
				(date === storedAppointmentDate &&
					storedMeridian === NewMeridian &&
					storedEndHour == 3 &&
					timeDifference &&
					NewMinutes <= storedMinutes &&
					newStartHour == 3) ||
				(date === storedAppointmentDate &&
					storedMeridian === NewMeridian &&
					storedEndHour == 4 &&
					timeDifference &&
					(newStartHour == 3 || newStartHour == 2)) ||
				(date === storedAppointmentDate &&
					storedMeridian === NewMeridian &&
					storedEndHour == 4 &&
					timeDifference &&
					NewMinutes <= storedMinutes &&
					newStartHour == 4) ||
				(date === storedAppointmentDate &&
					storedMeridian === NewMeridian &&
					storedEndHour == 5 &&
					timeDifference &&
					(newStartHour == 3 || newStartHour == 4)) ||
				(date === storedAppointmentDate &&
					storedMeridian === NewMeridian &&
					storedEndHour == 5 &&
					timeDifference &&
					NewMinutes <= storedMinutes &&
					newStartHour == 5) ||
				(date === storedAppointmentDate &&
					storedMeridian === NewMeridian &&
					storedEndHour == 6 &&
					timeDifference &&
					(newStartHour == 4 || newStartHour == 5)) ||
				(date === storedAppointmentDate &&
					storedMeridian === NewMeridian &&
					storedEndHour == 6 &&
					timeDifference &&
					NewMinutes <= storedMinutes &&
					newStartHour == 6) ||
				(date === storedAppointmentDate &&
					storedMeridian === NewMeridian &&
					storedEndHour == 7 &&
					timeDifference &&
					(newStartHour == 5 || newStartHour == 6)) ||
				(date === storedAppointmentDate &&
					storedMeridian === NewMeridian &&
					storedEndHour == 7 &&
					timeDifference &&
					NewMinutes <= storedMinutes &&
					newStartHour == 7)
			);
		});

		// If there are overlapping appointments, prevent submission
		if (overlappingAppointments.length > 0) {
			alert(
				"Selected time slot overlaps with an existing appointment. Please choose a different time."
			);
			return;
		}

		console.log(appointData, "good thing");
		try {
			console.log("hi");
			const response = await fetch("http://127.0.0.1:5000/appointment", {
				method: "POST",
				body: JSON.stringify(appointData),
				headers: { "Content-Type": "application/json" },
			});
			console.log(response);
			console.log("hi");
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
							{(serviceHour === "2" || serviceHour === "1:30") && (
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
							)}
							{serviceHour === "1" && (
								<DatePicker
									selected={selectedStartTime}
									onChange={handleStartTimeChange}
									showTimeSelect
									showTimeSelectOnly
									timeIntervals={15}
									dateFormat="h:mm aa"
									placeholderText="Select time"
									minTime={new Date().setHours(9, 0)} // Set your minimum time
									maxTime={new Date().setHours(18, 0)} // Set your maximum time
									wrapperClassName="input"
								/>
							)}
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
