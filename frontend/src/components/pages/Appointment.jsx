import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from "react";
import "../../assets/styles/appointment.css";
import Header from "../Header";
import { useUserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

function Appointment(props) {
	const { userId, userData } = useUserContext();
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
	const [serviceId, setServiceId] = useState(props.serviceId);
	const [isTimePassed, setIsTimePassed] = useState(false);
	const [isTimeToClose, setIsTimeToClosed] = useState(false);
	const [isOverlap, setIsOverlap] = useState(false);
	const [ratings, setRating] = useState([]);
	const [paywithStripe, setPayWithStrope] = useState(false);
	const [isChakedHalfePayment, setIsChekedHalfPayment] = useState(false);
	const [showFirst, setShowFirst] = useState(false);
	const [showsecond, setShowsecond] = useState(false);
	const [isConditionCheked, setisConditionCheked] = useState(false);
	const [isErr, setisErr] = useState(false);

	const handleCheckboxChangeHalf = () => {
		setIsChekedHalfPayment(!isChakedHalfePayment);
	};
	const handleCheckboxCOndition = () => {
		setisConditionCheked(!isConditionCheked);
	};

	const [servicePrice, setServicePrice] = useState(props.servicePrice);

	const navigate = useNavigate();

	const [showPopup, setShowPopup] = useState(false);

	const [appointmetDate, setAppointmentDate] = useState([]);
	let averageRating = 0;

	const handleShowPopup = (e) => {
		setShowPopup(!showPopup);
	};

	useEffect(() => {
		if (isChakedHalfePayment) {
			setServicePrice(props.servicePrice * 0.5);
		}
		if (!isChakedHalfePayment) {
			setServicePrice(props.servicePrice);
		}
	}, [isChakedHalfePayment]);
	// Create a new Date object
	var currentDate = new Date();

	// Extract the day, month, and year from the date object
	var day = currentDate.getDate();
	var month = currentDate.getMonth() + 1; // Months are zero-based
	var year = currentDate.getFullYear();

	// Format the date as "6/5/2024"
	var formattedDate = day + "/" + month + "/" + year;
	// if (showPopup) {
	// 	setTimeout(handleShowPopup, 3000);
	// }

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
				localStorage.setItem(
					"selectedProfesionalAppointment",
					JSON.stringify(data)
				);
				setAppointmentDate(data);
				console.log(data);
			});

		fetch(`http://127.0.0.1:5000/profesionalRating/${selectedProfessionalId}`, {
			method: "GET",
		})
			.then((response) => response.json())
			.then((data) => {
				setRating(data.result);
				console.log(data);
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
		const hours = time.getHours();
		let minutes = time.getMinutes();
		let startMinutes = time.getMinutes();
		let startmeridian = "";
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
	}
	const appointData = {
		selectedProfessionalId,
		userId,
		date,
		startTime,
		endTime,
		serviceId,
		fname: localStorage.getItem("userName"),
		lname: localStorage.getItem("userLName"),
		email: localStorage.getItem("email"),
		phone: localStorage.getItem("phone"),
		amount: parseInt(servicePrice),
		servicePrice: parseInt(props.servicePrice),
	};

	const localAppoint = [
		{
			id: 260,
			customerId: 1,
			professionalId: 13,
			appointmentDate: date,
			startTime: startTime,
			endTime: endTime,
			serviceId: 25,
			servicename: "eyelash extension",
			userFname: "alhamdu",
			userLname: "bedwe",
		},
	];

	const handleSubmit = async (event) => {
		localStorage.setItem("localAppoint", JSON.stringify(localAppoint));
		event.preventDefault();
		setIsTimePassed(false);
		setIsTimeToClosed(false);
		setIsOverlap(false);
		const currntHours = parseInt(new Date().getHours());
		const curreMinutes = parseInt(new Date().getMinutes());
		alert(currntHours);
		let newStartHour = "";
		let newEndHour = "";
		let NewEndMinutes = "";
		let NewMinutes = "";
		let timeDifference = false;
		let startTimeDifference = false;
		let storedStartHour = "";
		let storedEndHour = "";
		let storedMinutes = "";
		let storedStartMinutes = "";

		if (startTime?.length === 8) {
			newStartHour = parseInt(startTime.substring(0, 2));
			newEndHour = parseInt(endTime.substring(0, 2));
			NewMinutes = parseInt(startTime.substring(3, 5));
			NewEndMinutes = parseInt(endTime.substring(3, 5));
		}
		if (startTime?.length === 7) {
			newStartHour = parseInt(startTime.substring(0, 1));
			newEndHour = parseInt(endTime.substring(0, 2));
			NewMinutes = parseInt(startTime.substring(2, 4));
			NewEndMinutes = parseInt(endTime.substring(2, 4));
		}
		alert(currntHours + " currefgsdhn time");
		alert(newStartHour + " newstart Hours time");

		if (
			storedEndHour - storedStartHour === 2 ||
			storedEndHour - storedStartHour === -10
		) {
			timeDifference = true;
		}
		if (newEndHour - newStartHour === 2 || newEndHour - newStartHour === -10) {
			startTimeDifference = true;
		}
		// eslint-disable-next-line eqeqeq

		//   9 HOUR
		function validateClosedTime() {
			if (
				newStartHour === 9 &&
				NewMinutes === 0 &&
				curreMinutes > 30 &&
				currntHours === 8
			) {
				alert("hi");
				return true;
			} else if (
				newStartHour === 9 &&
				NewMinutes === 15 &&
				curreMinutes > 45 &&
				currntHours === 8
			) {
				return true;
			} else if (
				newStartHour === 9 &&
				NewMinutes === 30 &&
				curreMinutes < 30 &&
				currntHours === 9
			) {
				return true;
			} else if (
				newStartHour === 9 &&
				NewMinutes === 0 &&
				curreMinutes === 0 &&
				currntHours === 9
			) {
				return true;
			} else if (
				newStartHour === 9 &&
				NewMinutes === 45 &&
				curreMinutes < 45 &&
				curreMinutes > 15 &&
				currntHours === 9
			) {
				return true;
			}
			// 10 HOUR
			else if (
				newStartHour === 10 &&
				NewMinutes === 0 &&
				curreMinutes > 30 &&
				currntHours === 9
			) {
				return true;
			} else if (
				newStartHour === 10 &&
				NewMinutes === 15 &&
				curreMinutes > 45 &&
				currntHours === 9
			) {
				return true;
			} else if (
				newStartHour === 10 &&
				NewMinutes === 30 &&
				curreMinutes < 30 &&
				currntHours === 10
			) {
				return true;
			} else if (
				newStartHour === 10 &&
				NewMinutes === 0 &&
				curreMinutes === 0 &&
				currntHours === 10
			) {
				return true;
			} else if (
				newStartHour === 10 &&
				NewMinutes === 45 &&
				curreMinutes <= 45 &&
				curreMinutes >= 15 &&
				currntHours === 10
			) {
				return true;
			} else if (
				newStartHour === 10 &&
				NewMinutes === 15 &&
				curreMinutes <= 45 &&
				curreMinutes >= 15 &&
				currntHours === 10
			) {
				return true;
			}

			//11 HOUR
			else if (
				newStartHour === 11 &&
				NewMinutes === 0 &&
				curreMinutes >= 30 &&
				currntHours === 10
			) {
				return true;
			} else if (
				newStartHour === 11 &&
				NewMinutes === 15 &&
				currntHours === 11
			) {
				return true;
			} else if (
				newStartHour === 11 &&
				NewMinutes === 15 &&
				curreMinutes >= 45 &&
				currntHours === 10
			) {
				return true;
			} else if (
				newStartHour === 11 &&
				NewMinutes === 30 &&
				curreMinutes <= 30 &&
				currntHours === 11
			) {
				return true;
			} else if (
				newStartHour === 11 &&
				NewMinutes === 0 &&
				curreMinutes === 0 &&
				currntHours === 11
			) {
				return true;
			} else if (
				newStartHour === 11 &&
				NewMinutes === 45 &&
				curreMinutes <= 45 &&
				curreMinutes >= 15 &&
				currntHours === 11
			) {
				return true;
			} else if (
				newStartHour === 11 &&
				NewMinutes === 15 &&
				curreMinutes <= 45 &&
				curreMinutes >= 15 &&
				currntHours === 11
			) {
				return true;
			}

			//12 HOUR
			else if (
				newStartHour === 12 &&
				NewMinutes === 0 &&
				curreMinutes >= 30 &&
				currntHours === 11
			) {
				return true;
			} else if (
				newStartHour === 12 &&
				NewMinutes === 15 &&
				curreMinutes >= 45 &&
				currntHours === 11
			) {
				return true;
			} else if (
				newStartHour === 12 &&
				NewMinutes === 15 &&
				currntHours === 12
			) {
				return true;
			} else if (
				newStartHour === 12 &&
				NewMinutes === 30 &&
				curreMinutes <= 30 &&
				currntHours === 12
			) {
				return true;
			} else if (
				newStartHour === 12 &&
				NewMinutes === 0 &&
				curreMinutes === 0 &&
				currntHours === 12
			) {
				return true;
			} else if (
				newStartHour === 12 &&
				NewMinutes === 15 &&
				curreMinutes <= 45 &&
				curreMinutes >= 15 &&
				currntHours === 12
			) {
				return true;
			} else if (
				newStartHour === 12 &&
				NewMinutes === 45 &&
				curreMinutes <= 45 &&
				curreMinutes >= 15 &&
				currntHours === 12
			) {
				return true;
			}
			// 1 HOUR
			else if (
				newStartHour === 1 &&
				NewMinutes === 0 &&
				curreMinutes >= 30 &&
				currntHours === 12
			) {
				return true;
			} else if (
				newStartHour === 1 &&
				NewMinutes === 15 &&
				currntHours === 13
			) {
				return true;
			} else if (
				newStartHour === 1 &&
				NewMinutes === 15 &&
				curreMinutes >= 45 &&
				currntHours === 12
			) {
				return true;
			} else if (
				newStartHour === 1 &&
				NewMinutes === 30 &&
				curreMinutes <= 30 &&
				currntHours === 13
			) {
				return true;
			} else if (
				newStartHour === 1 &&
				NewMinutes === 0 &&
				curreMinutes === 0 &&
				currntHours === 13
			) {
				return true;
			} else if (
				newStartHour === 1 &&
				NewMinutes === 45 &&
				curreMinutes <= 45 &&
				curreMinutes >= 15 &&
				currntHours === 13
			) {
				return true;
			} else if (
				newStartHour === 1 &&
				NewMinutes === 15 &&
				curreMinutes <= 45 &&
				curreMinutes >= 15 &&
				currntHours === 13
			) {
				return true;
			}
			// 2 HOUR
			else if (
				newStartHour === 2 &&
				NewMinutes === 0 &&
				curreMinutes >= 30 &&
				currntHours === 13
			) {
				return true;
			} else if (
				newStartHour === 2 &&
				NewMinutes === 15 &&
				currntHours === 14
			) {
				return true;
			} else if (
				newStartHour === 2 &&
				NewMinutes === 15 &&
				curreMinutes >= 45 &&
				currntHours === 13
			) {
				return true;
			} else if (
				newStartHour === 2 &&
				NewMinutes === 30 &&
				curreMinutes <= 30 &&
				currntHours === 14
			) {
				return true;
			} else if (
				newStartHour === 2 &&
				NewMinutes === 0 &&
				curreMinutes === 0 &&
				currntHours === 14
			) {
				return true;
			} else if (
				newStartHour === 2 &&
				NewMinutes === 45 &&
				curreMinutes <= 45 &&
				curreMinutes >= 15 &&
				currntHours === 14
			) {
				return true;
			} else if (
				newStartHour === 2 &&
				NewMinutes === 15 &&
				curreMinutes <= 45 &&
				curreMinutes >= 15 &&
				currntHours === 14
			) {
				return true;
			}
			// 3 HOUR
			else if (
				newStartHour === 3 &&
				NewMinutes === 0 &&
				curreMinutes >= 30 &&
				currntHours === 14
			) {
				return true;
			} else if (
				newStartHour === 3 &&
				NewMinutes === 15 &&
				currntHours === 15
			) {
				return true;
			} else if (
				newStartHour === 3 &&
				NewMinutes === 15 &&
				curreMinutes >= 45 &&
				currntHours === 14
			) {
				return true;
			} else if (
				newStartHour === 3 &&
				NewMinutes === 30 &&
				curreMinutes <= 30 &&
				currntHours === 15
			) {
				return true;
			} else if (
				newStartHour === 3 &&
				NewMinutes === 0 &&
				curreMinutes === 0 &&
				currntHours === 15
			) {
				return true;
			} else if (
				newStartHour === 3 &&
				NewMinutes === 45 &&
				curreMinutes <= 45 &&
				curreMinutes >= 15 &&
				currntHours === 15
			) {
				return true;
			} else if (
				newStartHour === 3 &&
				NewMinutes === 15 &&
				curreMinutes <= 45 &&
				curreMinutes >= 15 &&
				currntHours === 15
			) {
				return true;
			}
			// 4 HOUR
			else if (
				newStartHour === 4 &&
				NewMinutes === 0 &&
				curreMinutes >= 30 &&
				currntHours === 15
			) {
				return true;
			} else if (
				newStartHour === 4 &&
				NewMinutes === 15 &&
				currntHours === 16
			) {
				return true;
			} else if (
				newStartHour === 4 &&
				NewMinutes === 15 &&
				curreMinutes >= 45 &&
				currntHours === 15
			) {
				return true;
			} else if (
				newStartHour === 4 &&
				NewMinutes === 30 &&
				curreMinutes <= 30 &&
				currntHours === 16
			) {
				return true;
			} else if (
				newStartHour === 4 &&
				NewMinutes === 0 &&
				curreMinutes === 0 &&
				currntHours === 16
			) {
				return true;
			} else if (
				newStartHour === 4 &&
				NewMinutes === 45 &&
				curreMinutes <= 45 &&
				curreMinutes >= 15 &&
				currntHours === 16
			) {
				return true;
			} else if (
				newStartHour === 4 &&
				NewMinutes === 15 &&
				curreMinutes <= 45 &&
				curreMinutes >= 15 &&
				currntHours === 16
			) {
				return true;
			}
			// 5 HOUR
			else if (
				newStartHour === 5 &&
				NewMinutes === 0 &&
				curreMinutes >= 30 &&
				currntHours === 16
			) {
				return true;
			} else if (newStartHour === 5 && NewMinutes === 15 && currntHours === 5) {
				return true;
			} else if (
				newStartHour === 5 &&
				NewMinutes === 15 &&
				curreMinutes >= 45 &&
				currntHours === 16
			) {
				return true;
			} else if (
				newStartHour === 5 &&
				NewMinutes === 30 &&
				curreMinutes <= 30 &&
				currntHours === 17
			) {
				return true;
			} else if (
				newStartHour === 5 &&
				NewMinutes === 0 &&
				curreMinutes === 0 &&
				currntHours === 17
			) {
				return true;
			} else if (
				newStartHour === 5 &&
				NewMinutes === 45 &&
				curreMinutes <= 45 &&
				curreMinutes >= 15 &&
				currntHours === 17
			) {
				return true;
			} else if (
				newStartHour === 5 &&
				NewMinutes === 15 &&
				curreMinutes <= 45 &&
				curreMinutes >= 15 &&
				currntHours === 17
			) {
				return true;
			}
			/// 6 HOUR
			else if (
				newStartHour === 6 &&
				NewMinutes === 0 &&
				curreMinutes >= 30 &&
				currntHours === 17
			) {
				return true;
			} else if (newStartHour === 6 && NewMinutes === 15 && currntHours === 6) {
				return true;
			} else if (
				newStartHour === 6 &&
				NewMinutes === 15 &&
				curreMinutes >= 45 &&
				currntHours === 17
			) {
				return true;
			} else if (
				newStartHour === 6 &&
				NewMinutes === 30 &&
				curreMinutes <= 30 &&
				currntHours === 18
			) {
				return true;
			} else if (
				newStartHour === 6 &&
				NewMinutes === 0 &&
				curreMinutes === 0 &&
				currntHours === 18
			) {
				return true;
			} else if (
				newStartHour === 6 &&
				NewMinutes === 45 &&
				curreMinutes <= 45 &&
				curreMinutes >= 15 &&
				currntHours === 18
			) {
				return true;
			} else if (
				newStartHour === 6 &&
				NewMinutes === 15 &&
				curreMinutes <= 45 &&
				curreMinutes >= 15 &&
				currntHours === 18
			) {
				return true;
			} else {
				return false;
			}
		}
		if (validateClosedTime()) {
			setIsTimeToClosed(true);
			handleShowPopup();
			return;
		}

		const validateTime = () => {
			// Validation for time passed check
			if (currntHours === 10 && newStartHour === 9) {
				return true;
			}
			if (
				currntHours === 9 &&
				newStartHour === 9 &&
				curreMinutes > NewMinutes
			) {
				return true;
			}
			if (
				currntHours === 10 &&
				newStartHour === 10 &&
				curreMinutes > NewMinutes
			) {
				return true;
			} else if (
				currntHours === 11 &&
				(newStartHour === 9 || newStartHour === 10)
			) {
				return true;
			} else if (
				currntHours === 11 &&
				curreMinutes > NewMinutes &&
				newStartHour === 11
			) {
				return true;
			} else if (
				currntHours === 12 &&
				(newStartHour === 9 || newStartHour === 10 || newStartHour === 11)
			) {
				return true;
			} else if (
				currntHours === 12 &&
				curreMinutes > NewMinutes &&
				newStartHour === 12
			) {
				return true;
			} else if (
				currntHours === 13 &&
				(newStartHour === 9 ||
					newStartHour === 10 ||
					newStartHour === 11 ||
					newStartHour === 12)
			) {
				return true;
			} else if (
				currntHours === 13 &&
				curreMinutes > NewMinutes &&
				newStartHour === 1
			) {
				return true;
			} else if (
				currntHours === 14 &&
				(newStartHour === 9 ||
					newStartHour === 10 ||
					newStartHour === 11 ||
					newStartHour === 12 ||
					newStartHour === 1)
			) {
				return true;
			} else if (
				currntHours === 14 &&
				curreMinutes > NewMinutes &&
				newStartHour === 2
			) {
				return true;
			} else if (
				currntHours === 15 &&
				(newStartHour === 9 ||
					newStartHour === 10 ||
					newStartHour === 11 ||
					newStartHour === 12 ||
					newStartHour === 1 ||
					newStartHour === 2)
			) {
				return true;
			} else if (
				currntHours === 15 &&
				curreMinutes > NewMinutes &&
				newStartHour === 3
			) {
				return true;
			} else if (
				currntHours === 16 &&
				(newStartHour === 9 ||
					newStartHour === 10 ||
					newStartHour === 11 ||
					newStartHour === 12 ||
					newStartHour === 1 ||
					newStartHour === 2 ||
					newStartHour === 3)
			) {
				return true;
			} else if (
				currntHours === 16 &&
				curreMinutes > NewMinutes &&
				newStartHour === 4
			) {
				return true;
			} else if (
				currntHours === 17 &&
				(newStartHour === 9 ||
					newStartHour === 10 ||
					newStartHour === 11 ||
					newStartHour === 12 ||
					newStartHour === 1 ||
					newStartHour === 2 ||
					newStartHour === 3 ||
					newStartHour === 4)
			) {
				return true;
			} else if (
				currntHours === 17 &&
				curreMinutes > NewMinutes &&
				newStartHour === 5
			) {
				return true;
			} else {
				return false;
			}
		};

		if (validateTime()) {
			setIsTimePassed(true);
			handleShowPopup();
			return;
		}
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

		function fiiletr() {
			const overlappingAppointments = appointmetDate.filter((appointment) => {
				// Format the stored appointment date and time
				const storedAppointmentDate = appointment.appointmentDate;
				const storedAppointmentStartTime = appointment.startTime;
				const storedAppointmentEndTime = appointment.endTime;

				let storedMeridian = storedAppointmentEndTime.slice(-2);

				let NewMeridian = startTime.slice(-2);
				if (storedAppointmentEndTime.length === 8) {
					storedEndHour = parseInt(storedAppointmentEndTime.substring(0, 2));
					storedStartHour = parseInt(
						storedAppointmentStartTime.substring(0, 2)
					);

					storedMinutes = parseInt(storedAppointmentEndTime.substring(3, 5));
					storedStartMinutes = parseInt(
						storedAppointmentStartTime.substring(3, 5)
					);
				}
				if (storedAppointmentEndTime.length === 7) {
					storedEndHour = parseInt(storedAppointmentEndTime.substring(0, 1));
					storedStartHour = parseInt(
						storedAppointmentStartTime.substring(0, 1)
					);

					storedMinutes = parseInt(storedAppointmentEndTime.substring(2, 4));
					storedStartMinutes = parseInt(
						storedAppointmentStartTime.substring(2, 4)
					);
				}

				if (
					storedAppointmentDate === date &&
					storedAppointmentStartTime === startTime &&
					storedAppointmentEndTime === endTime
				) {
					return true;
				} else if (
					date === storedAppointmentDate &&
					storedStartHour === newEndHour &&
					NewEndMinutes <= storedStartMinutes
				) {
					return true;
				} else if (
					date === storedAppointmentDate &&
					storedMeridian === NewMeridian &&
					storedEndHour === 10 &&
					newStartHour === 9
				) {
					return true;
				} else if (
					date === storedAppointmentDate &&
					storedMeridian === NewMeridian &&
					storedEndHour === 10 &&
					NewMinutes < storedMinutes &&
					newStartHour === 10
				) {
					return true;
				} else if (
					date === storedAppointmentDate &&
					storedMeridian === NewMeridian &&
					storedEndHour === 11 &&
					(newStartHour === 10 || (newStartHour === 9 && NewMinutes > 0))
				) {
					return true;
				} else if (
					date === storedAppointmentDate &&
					storedMeridian === NewMeridian &&
					storedEndHour === 11 &&
					NewMinutes < storedMinutes &&
					newStartHour === 11
				) {
					return true;
				} else if (
					storedEndHour === 12 &&
					date === storedAppointmentDate &&
					(newStartHour === 11 || (newStartHour === 10 && NewMinutes > 0))
				) {
					return true;
				} else if (
					storedEndHour === 12 &&
					date === storedAppointmentDate &&
					NewMinutes < storedMinutes &&
					newStartHour === 12
				) {
					return true;
				} else if (
					storedEndHour === 1 &&
					date === storedAppointmentDate &&
					(newStartHour === 12 || (newStartHour === 11 && NewMinutes > 0))
				) {
					return true;
				} else if (
					storedEndHour === 1 &&
					date === storedAppointmentDate &&
					newStartHour === 1 &&
					NewMinutes < storedMinutes &&
					storedMeridian === NewMeridian
				) {
					return true;
				} else if (
					storedEndHour === 2 &&
					date === storedAppointmentDate &&
					(newStartHour === 1 || (newStartHour === 12 && NewMinutes > 0)) &&
					storedMeridian === NewMeridian
				) {
					return true;
				} else if (
					storedEndHour === 2 &&
					date === storedAppointmentDate &&
					newStartHour === 2 &&
					NewMinutes < storedMinutes &&
					storedMeridian === NewMeridian
				) {
					return true;
				} else if (
					storedEndHour === 3 &&
					date === storedAppointmentDate &&
					(newStartHour === 2 || (newStartHour === 1 && NewMinutes > 0)) &&
					storedMeridian === NewMeridian
				) {
					return true;
				} else if (
					storedEndHour === 3 &&
					date === storedAppointmentDate &&
					newStartHour === 3 &&
					NewMinutes < storedMinutes &&
					storedMeridian === NewMeridian
				) {
					return true;
				} else if (
					storedEndHour === 4 &&
					date === storedAppointmentDate &&
					(newStartHour === 3 || (newStartHour === 2 && NewMinutes > 0)) &&
					storedMeridian === NewMeridian
				) {
					return true;
				} else if (
					storedEndHour === 4 &&
					date === storedAppointmentDate &&
					newStartHour === 4 &&
					NewMinutes < storedMinutes &&
					storedMeridian === NewMeridian
				) {
					return true;
				} else if (
					storedEndHour === 5 &&
					date === storedAppointmentDate &&
					(newStartHour === 4 || (newStartHour === 3 && NewMinutes > 0)) &&
					storedMeridian === NewMeridian
				) {
					return true;
				} else if (
					storedEndHour === 5 &&
					date === storedAppointmentDate &&
					newStartHour === 5 &&
					NewMinutes < storedMinutes &&
					storedMeridian === NewMeridian
				) {
					return true;
				} else if (
					storedEndHour === 6 &&
					date === storedAppointmentDate &&
					(newStartHour === 5 || (newStartHour === 4 && NewMinutes > 0)) &&
					storedMeridian === NewMeridian
				) {
					return true;
				} else if (
					storedEndHour === 6 &&
					date === storedAppointmentDate &&
					newStartHour === 6 &&
					NewMinutes < storedMinutes &&
					storedMeridian === NewMeridian
				) {
					return true;
				} else if (
					storedEndHour === 7 &&
					date === storedAppointmentDate &&
					(newStartHour === 6 || (newStartHour === 5 && NewMinutes > 0)) &&
					storedMeridian === NewMeridian
				) {
					return true;
				} else if (
					storedEndHour === 7 &&
					date === storedAppointmentDate &&
					newStartHour === 7 &&
					NewMinutes < storedMinutes &&
					storedMeridian === NewMeridian
				) {
					return true;
				} else if (
					date === storedAppointmentDate &&
					storedMeridian === NewMeridian &&
					storedEndHour === 11 &&
					timeDifference &&
					(newStartHour === 9 || newStartHour === 10)
				) {
					return true;
				} else if (
					date === storedAppointmentDate &&
					storedMeridian === NewMeridian &&
					storedEndHour === 11 &&
					timeDifference &&
					NewMinutes < storedMinutes &&
					newStartHour === 11
				) {
					return true;
				} else if (
					date === storedAppointmentDate &&
					storedEndHour === 12 &&
					timeDifference &&
					(newStartHour === 11 || newStartHour === 10)
				) {
					return true;
				} else if (
					date === storedAppointmentDate &&
					storedEndHour === 12 &&
					timeDifference &&
					startTimeDifference &&
					newStartHour === 9
				) {
					return true;
				} else if (
					date === storedAppointmentDate &&
					storedEndHour === 12 &&
					timeDifference &&
					NewMinutes < storedMinutes &&
					newStartHour === 12
				) {
					return true;
				} else if (
					date === storedAppointmentDate &&
					storedEndHour === 1 &&
					timeDifference &&
					(newStartHour === 11 || newStartHour === 12)
				) {
					return true;
				} else if (
					date === storedAppointmentDate &&
					storedEndHour === 1 &&
					timeDifference &&
					startTimeDifference &&
					newStartHour === 10
				) {
					return true;
				} else if (
					date === storedAppointmentDate &&
					storedEndHour === 1 &&
					timeDifference &&
					NewMinutes < storedMinutes &&
					newStartHour === 1
				) {
					return true;
				} else if (
					date === storedAppointmentDate &&
					storedMeridian === NewMeridian &&
					storedEndHour === 2 &&
					timeDifference &&
					(newStartHour === 1 || newStartHour === 12)
				) {
					return true;
				} else if (
					date === storedAppointmentDate &&
					storedEndHour === 2 &&
					timeDifference &&
					startTimeDifference &&
					newStartHour === 11
				) {
					return true;
				} else if (
					date === storedAppointmentDate &&
					storedMeridian === NewMeridian &&
					storedEndHour === 2 &&
					timeDifference &&
					NewMinutes < storedMinutes &&
					newStartHour === 2
				) {
					return true;
				} else if (
					date === storedAppointmentDate &&
					storedMeridian === NewMeridian &&
					storedEndHour === 3 &&
					timeDifference &&
					(newStartHour === 1 || newStartHour === 2)
				) {
					return true;
				} else if (
					date === storedAppointmentDate &&
					storedEndHour === 3 &&
					timeDifference &&
					startTimeDifference &&
					newStartHour === 12
				) {
					return true;
				} else if (
					date === storedAppointmentDate &&
					storedMeridian === NewMeridian &&
					storedEndHour === 3 &&
					timeDifference &&
					NewMinutes < storedMinutes &&
					newStartHour === 3
				) {
					return true;
				} else if (
					date === storedAppointmentDate &&
					storedMeridian === NewMeridian &&
					storedEndHour === 4 &&
					timeDifference &&
					(newStartHour === 3 || newStartHour === 2)
				) {
					return true;
				} else if (
					date === storedAppointmentDate &&
					storedEndHour === 4 &&
					timeDifference &&
					startTimeDifference &&
					newStartHour === 1
				) {
					return true;
				} else if (
					date === storedAppointmentDate &&
					storedMeridian === NewMeridian &&
					storedEndHour === 4 &&
					timeDifference &&
					NewMinutes < storedMinutes &&
					newStartHour === 4
				) {
					return true;
				} else if (
					date === storedAppointmentDate &&
					storedMeridian === NewMeridian &&
					storedEndHour === 5 &&
					timeDifference &&
					(newStartHour === 3 || newStartHour === 4)
				) {
					return true;
				} else if (
					date === storedAppointmentDate &&
					storedEndHour === 5 &&
					timeDifference &&
					startTimeDifference &&
					newStartHour === 2
				) {
					return true;
				} else if (
					date === storedAppointmentDate &&
					storedMeridian === NewMeridian &&
					storedEndHour === 5 &&
					timeDifference &&
					NewMinutes < storedMinutes &&
					newStartHour === 5
				) {
					return true;
				} else if (
					date === storedAppointmentDate &&
					storedMeridian === NewMeridian &&
					storedEndHour === 6 &&
					timeDifference &&
					(newStartHour === 4 || newStartHour === 5)
				) {
					return true;
				} else if (
					date === storedAppointmentDate &&
					storedEndHour === 6 &&
					timeDifference &&
					startTimeDifference &&
					newStartHour === 3
				) {
					return true;
				} else if (
					date === storedAppointmentDate &&
					storedMeridian === NewMeridian &&
					storedEndHour === 6 &&
					timeDifference &&
					NewMinutes < storedMinutes &&
					newStartHour === 6
				) {
					return true;
				} else if (
					date === storedAppointmentDate &&
					storedMeridian === NewMeridian &&
					storedEndHour === 7 &&
					timeDifference &&
					(newStartHour === 5 || newStartHour === 6)
				) {
					return true;
				} else if (
					date === storedAppointmentDate &&
					storedEndHour === 7 &&
					timeDifference &&
					startTimeDifference &&
					newStartHour === 4
				) {
					return true;
				} else if (
					date === storedAppointmentDate &&
					storedMeridian === NewMeridian &&
					storedEndHour === 7 &&
					timeDifference &&
					NewMinutes < storedMinutes &&
					newStartHour === 7
				) {
					return true;
				} else {
					return false;
				}
			});
			return overlappingAppointments;
		}
		console.log(fiiletr());
		if (fiiletr().length > 0) {
			setIsOverlap(true);
			handleShowPopup();
			return;
		}
		const array = JSON.parse(localStorage.getItem("localAppoint"));
		if (appointmetDate.length > 0) {
			alert("Please select hfg");
			// If appointmentDate is not empty, concatenate array to it
			const updatedAppointmentDate = [...appointmetDate, ...array];
			console.log(updatedAppointmentDate);
			setAppointmentDate(updatedAppointmentDate);
		}
		if (appointmetDate.length === 0) {
			// If appointmentDate is empty, set it to array
			setAppointmentDate(array);
		}
		localStorage.setItem("appointDate", date);
		localStorage.setItem("startTime", startTime);
		localStorage.setItem("endtime", endTime);
		localStorage.setItem("serviccePrice", parseInt(props.servicePrice));

		setShowFirst(true);
	};
	const handlePayment = async (event) => {
		event.preventDefault();
		const reamining = parseInt(props.servicePrice) - parseInt(servicePrice);
		localStorage.setItem("remaining", reamining);
		if (!isConditionCheked) {
			setisErr(true);
			return;
		}
		try {
			const response = await fetch(
				"http://127.0.0.1:5000/appointment/payment",
				{
					method: "POST",
					body: JSON.stringify(appointData),
					headers: { "Content-Type": "application/json" },
				}
			);
			if (response.ok) {
				const paymentData = await response.json();
				window.location.replace(paymentData.url);
				localStorage.setItem("Appref", paymentData.ref);
			} else {
				navigate("/serverError", { replace: false });
			}
		} catch (error) {
			navigate("/serverError", { replace: false });
		}
	};
	const totalRating = ratings.reduce(
		(sum, rating) => sum + parseInt(rating.rating),
		0
	);

	// Calculate the average rating
	averageRating = (totalRating / ratings.length).toFixed(2);
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
								<option selected disabled>
									Selct Profesional
								</option>
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
							<button
								className="appointmentform-button"
								onClick={() => setPayWithStrope(false)}>
								Appoint Now
							</button>
						</div>
					</div>
				</form>
				<div>
					<div className="image-cont">
						{selectedProfessional.length > 0 && (
							<>
								<img
									src={selectedProfessional[0].pimage}
									className="profesional-image"
									alt=""
								/>
								<div className="service-prof-cont">
									<p className="srrv-name">
										<span className="spanpro">Name: </span>
										{selectedProfessional[0].fname +
											" " +
											selectedProfessional[0].lname}
									</p>
									<p className="srrv-name">
										<span className="spanpro">Email: </span>
										{selectedProfessional[0].email}
									</p>
									<p className="srrv-name">
										<span className="spanpro">Profesion: </span>
										{selectedProfessional[0].profession}
									</p>
									{averageRating == 0 && (
										<p className="srrv-name">
											<span className="spanpro">Not Rated(⭐)</span>
										</p>
									)}
									{averageRating > 0 && (
										<p className="srrv-name">
											<span className="spanpro">
												Rating(⭐):{averageRating}
											</span>
										</p>
									)}
									{isNaN(averageRating) && (
										<p className="srrv-name">
											<span className="spanpro">Not Rated(⭐)</span>
										</p>
									)}
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
											<tr className="th" key={appointData.id}>
												<td className="td">{appointData.appointmentDate}</td>
												<td className="td">{appointData.startTime}</td>
												<td className="td">{appointData.endTime}</td>
											</tr>
										</>
									))}
							</table>
						</div>
					)}
					{appointmetDate.length === 0 && (
						<h1 className="selectedPro">
							Selected Profesional have no Schedule
						</h1>
					)}
				</div>
			</div>
			{showPopup && (
				<div className="appointment-popup-container" onClick={handleShowPopup}>
					<div className="appointment-popup">
						<span className="appointment-check-mark"> &#9888;</span>
						{isOverlap && (
							<p>Your Appointment Overlap With Exiting One.Please Try Again</p>
						)}
						{isTimePassed && <p>You Can't Make Appointment For Passed Time</p>}
						{isTimeToClose && (
							<p>You Can't Make Appointment The Time is To Close Now.</p>
						)}
					</div>
				</div>
			)}
			{showFirst && (
				<div className="popup-container">
					<div className="popup" style={{ textAlign: "left" }}>
						<h2>Appointment Data</h2>
						<table className="apooointment-table" style={{ width: "400px" }}>
							<thead>
								<tr className="th">
									<th className="th">Date</th>
									<th className="th">Start time</th>
									<th className="th">end Time</th>
								</tr>
							</thead>
							<tr className="th">
								<td className="td">{localStorage.getItem("appointDate")}</td>
								<td className="td">{localStorage.getItem("startTime")}</td>
								<td className="td">{localStorage.getItem("endtime")}</td>
							</tr>
						</table>

						<>
							<input
								type="checkbox"
								checked={isChakedHalfePayment}
								onChange={handleCheckboxChangeHalf}
							/>
							 <label for="css">Half Payment</label>
						</>

						<p style={{ marginTop: "12px" }}>Price:{servicePrice}</p>
						<button
							style={{
								display: "block",
								border: "none",
								backgroundColor: "rgb(0, 116, 0)",
								padding: "1rem 1.2rem",
								color: "white",
								borderRadius: "12px",
								margin: "auto",
								marginTop: "30px",
								marginLeft: "auto",
							}}
							onClick={() => {
								setShowFirst(false);
								setShowsecond(true);
							}}>
							Next
						</button>
					</div>
				</div>
			)}
			{showsecond && (
				<div className="popup-container">
					<div className="popup" style={{ textAlign: "left" }}>
						<h2>Rules And Regulation</h2>
						<p
							style={{
								marginTop: "10px",
								fontSize: "15px",
								color: "rgb(97, 96, 96)",
							}}>
							1.Customers forfeit 30% of the payment for appointment
							cancellations
						</p>
						<p
							style={{
								marginTop: "10px",
								fontSize: "15px",
								color: "rgb(97, 96, 96)",
							}}>
							2.Customers are not allowed to cancel appointments when there are
							2 days (48 hours) or less remaining until the scheduled
							appointment time.
						</p>
						<p
							style={{
								marginTop: "10px",
								fontSize: "15px",
								color: "rgb(97, 96, 96)",
							}}>
							3.Customers who fail to attend a scheduled appointment without
							prior notice will be considered a "no-show" and no refund for
							them.
						</p>
						<p
							style={{
								marginTop: "10px",
								fontSize: "15px",
								color: "rgb(97, 96, 96)",
								marginBottom: "20px",
							}}>
							4.The salon ensures the protection and confidentiality of customer
							data in accordance with applicable privacy laws and regulations.
						</p>
						<input
							type="checkbox"
							checked={isConditionCheked}
							onChange={handleCheckboxCOndition}
						/>
						 <label for="css">I Agree with Terms And Condition</label>
						{isErr && (
							<p style={{ color: "red", marginTop: "10px" }}>
								Please check the box
							</p>
						)}
						<div>
							<button
								style={{
									border: "none",
									backgroundColor: "rgb(0, 116, 0)",
									padding: "1rem 1.2rem",
									color: "white",
									borderRadius: "12px",
									margin: "auto",
									marginTop: "30px",
									marginLeft: "100px",
								}}
								onClick={(event) => {
									handlePayment(event);
									setShowFirst(false);
								}}>
								Appoint
							</button>
							<button
								style={{
									border: "none",
									backgroundColor: "rgb(241, 84, 105)",
									padding: "1rem 1.2rem",
									color: "white",
									borderRadius: "12px",
									margin: "auto",
									marginTop: "30px",
									marginLeft: "30px",
								}}
								onClick={() => {
									setShowsecond(false);
								}}>
								Cancel
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
export default Appointment;
