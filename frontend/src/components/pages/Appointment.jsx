import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import "../../assets/styles/appointment.css";
import Header from "../Header";

function Appointment() {
	const [selectedDate, setSelectedDate] = useState(null);
	const [selectedTime, setSelectedTime] = useState(null);

	const handleDateChange = (date) => {
		setSelectedDate(date);
	};
	const handleTimeChange = (time) => {
		setSelectedTime(time);
	};
	return (
		<div>
			<Header />

			<form action="">
				<div className="appointmentform container">
					<div>
						<label htmlFor="firstname">First Name</label>
						<input
							className="appointmentform-input"
							type="text"
							name="firstname"
							placeholder="First Name"
							id="firstname"
						/>
					</div>

					<div>
						<label htmlFor="email">Email</label>
						<input
							className="appointmentform-input"
							type="email"
							name="email"
							placeholder="Email"
							id="email"
						/>
					</div>
					<div>
						<label htmlFor="lastname">Last Name</label>
						<input
							className="appointmentform-input"
							type="text"
							name="lastname"
							placeholder="Last Name"
							id="lastname"
						/>
					</div>
					<div>
						<label htmlFor="phone">Phone</label>
						<input
							className="appointmentform-input"
							type="tel"
							name="phone"
							placeholder="Phone"
							id="phone"
						/>
					</div>
					{/* <div>
						<label htmlFor="service">Select Service</label>
						<select
							name="service"
							id="service"
							className="appointmentform-select">
							<option value="haircut">Hair cut</option>
							<option value="manicure">Manicure</option>
							<option value="pedicure">Pedicure</option>
						</select>
					</div> */}
					<div>
						<label htmlFor="service">Select professional</label>
						<select
							name="service"
							id="service"
							className="appointmentform-select">
							<option value="haircut">Hair cut</option>
							<option value="manicure">Manicure</option>
							<option value="pedicure">Pedicure</option>
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
						/>
					</div>

					<div>
						<label htmlFor="time">Select Time</label>
						<DatePicker
							selected={selectedTime}
							onChange={handleTimeChange}
							showTimeSelect
							showTimeSelectOnly
							timeIntervals={90}
							dateFormat="h:mm aa"
							placeholderText="Select time"
							minTime={new Date().setHours(6, 0)} // 3:00 AM
							maxTime={new Date().setHours(13, 0)} // 1:00 PM
						/>
					</div>
					<div>
						<button className="appointmentform-a">Appoint Now</button>
					</div>
				</div>
			</form>
		</div>
	);
}
export default Appointment;
