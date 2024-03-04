import React from "react";
import Header from "../Header";
import "../../assets/styles/professionalappoin.css";
import { useEffect, useState } from "react";

const Professionalappoin = () => {
	const [appointment, setAppointment] = useState([]);

	useEffect(() => {
		const profesionaID = localStorage.getItem("userId");
		console.log(profesionaID);
		fetch(`http://127.0.0.1:5000/profesionalAppointed/${profesionaID}`, {
			method: "Get",
		})
			.then((response) => response.json())
			.then((data) => {
				setAppointment(data);
			});
	}, []);

	return (
		<div className="prof-main-cont">
			<div>
				<h2 className="protitle">Appointments </h2>
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
						</div>
						<div className="porow">
							<div className="pinfo name">
								{appointment.userFname + " " + appointment.userLname}
							</div>

							<div className="pinfo name">{appointment.servicename}</div>

							<div className="pinfo">{appointment.appointmentDate}</div>

							<div className="pinfo">{appointment.startTime}</div>
							<div className="pinfo">{appointment.endTime}</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default Professionalappoin;
