import React from "react";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/Autcontext";
import { IoSearchSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function ViewAppointment(props) {
	const { token } = useAuthContext();
	const [searchTerm, setSearchTerm] = useState("");
	const [showDelete, setShowDelete] = useState(false);
	const naviaget = useNavigate();
	const [appointmentId, setAppointmentId] = useState("");

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
	const compareStatus = (a, b) => {
		let statusOrder = {};

		statusOrder = {
			["In Progress"]: 2,
			["Completed"]: 1,
			["Canceled"]: 3,
		};

		return statusOrder[a.status] - statusOrder[b.status];
	};

	const handleDeleteOrder = async (id) => {
		const response = await fetch(`http://127.0.0.1:5000/appointment/${id}`, {
			method: "Delete",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		if (response.ok) {
			const data = await response.json();
			setAppointmentInfo(data);
		} else {
			naviaget("/serverError", { replace: true });
		}
	};
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
							<h1 className="no" style={{ fontSize: "35px" }}>
								NO Appointment
							</h1>
						)}
						{appointmentt?.sort(compareStatus).map((data) => (
							<tr
								style={{
									backgroundColor: data.status === "Canceled" ? "#861602" : "",
								}}>
								<td>{data.appointmentDate}</td>
								<td>{data.startTime}</td>
								<td>{data.endTime}</td>
								<td>{data.profFname + " " + data.profLname}</td>
								<td>{data.userFname + " " + data.userLname}</td>
								<td>{data.servicename}</td>
								<td>{data.Tref}</td>
								<td>{data.status}</td>

								<td>
									<button
										style={{
											cursor:
												data.status === "In Progress" ? "not-allowed" : "",
										}}
										className="action delete"
										disabled={data.status == "In Progress"}
										onClick={() => {
											setAppointmentId(data.id);
											setShowDelete(true);
										}}>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{showDelete && (
				<>
					<div className="popup-container">
						<div className="popup">
							<p style={{ marginTop: "0px", marginBottom: "30px" }}>
								Do You Want To Delete The Order?
							</p>
							<span
								className="check-mark"
								style={{
									fontSize: "14px",
									padding: "14px 15px",
									cursor: "pointer",
									backgroundColor: "#ac2626",
								}}
								onClick={() => {
									setShowDelete(false);
									handleDeleteOrder(appointmentId);
									props.handleShowPopup();
								}}>
								{" "}
								Yes
							</span>
							<span
								className="check-mark"
								style={{
									fontSize: "14px",
									padding: "14px 15px",
									cursor: "pointer",
									backgroundColor: "#67ac26",
									marginLeft: "30px",
								}}
								onClick={() => {
									setShowDelete(false);
								}}>
								{" "}
								No
							</span>
						</div>
					</div>
				</>
			)}
		</div>
	);
}

export default ViewAppointment;
