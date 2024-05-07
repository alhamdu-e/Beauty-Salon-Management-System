import React from "react";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/Autcontext";
import { IoSearchSharp } from "react-icons/io5";

function ViewAppointment() {
	const { token } = useAuthContext();
	const [searchTerm, setSearchTerm] = useState("");
	const handleSearch = (e) => {
		setSearchTerm(e.target.value);
	};

	const [appointmentInfo, setAppointmentInfo] = useState([]);
	useEffect(() => {
		fetch("http://127.0.0.1:5000/appointmentinformation", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		})
			.then((response) => {
				if (response.ok) {
					return response.json();
				}
			})
			.then((data) => {
				console.log(data);
				setAppointmentInfo(data);
			});
	}, []);
	const appointmentt = appointmentInfo.filter((appoint) => {
		const TMatch = appoint.Tref?.toLowerCase().includes(
			searchTerm.toLowerCase()
		);
		return TMatch;
	});
	return (
		<div className="view-appointment">
			<div className="first">
				<h3 className="h3-customer">Appointment Data</h3>
				<input
					type="text"
					name=""
					id=""
					placeholder="Serach"
					className="search"
					value={searchTerm}
					onChange={handleSearch}
				/>
				<IoSearchSharp size={33} className="serachicon" />
				<table>
					<thead>
						<tr>
							<th>Appointment Date</th>
							<th>Start Time</th>
							<th>End time</th>
							<th>profesional Name</th>
							<th>customer Name</th>
							<th>Service Name</th>
							<th>Tnx_Reference</th>
							<th>Status</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{appointmentInfo.length === 0 && (
							<h1 className="no">NO Appointment</h1>
						)}
						{appointmentt?.map((data) => (
							<tr>
								<td>{data.appointmentDate}</td>
								<td>{data.startTime}</td>
								<td>{data.endTime}</td>
								<td>{data.profFname + " " + data.profLname}</td>
								<td>{data.userFname + " " + data.userLname}</td>
								<td>{data.servicename}</td>
								<td>{data.Tref}</td>
								<td>{data.status}</td>

								<td>
									<button className="action">Details</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default ViewAppointment;
