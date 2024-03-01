function ViewAppointment() {
	return (
		<div className="view-appointment">
			<div className="first">
				<table>
					<thead>
						<tr>
							<th>Appointment Date</th>
							<th>Start Time</th>
							<th>End time</th>
							<th>profesional Name</th>
							<th>customer Name</th>
							<th>Service Name</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>2/23/2024</td>
							<td>10:00 AM</td>
							<td>1:00 PM</td>
							<td>2/23/2024</td>
							<td>10:00 AM</td>
							<td>10:00 AM</td>

							<td>
								<button className="action">Details</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default ViewAppointment;
