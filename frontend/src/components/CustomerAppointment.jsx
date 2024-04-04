import Header from "./Header";
import "../assets/styles/customerappointment.css";
import { useUserContext } from "../context/UserContext";
import { useEffect, useState } from "react";
export default function CustomerAppointment() {
	const { userId } = useUserContext();
	const [appointment, setAppointment] = useState([]);

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

	return (
		<div>
			<Header />
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

					<button className="customerappointment-button">
						Cancel Appointment
					</button>
				</div>
			))}
		</div>
	);
}
