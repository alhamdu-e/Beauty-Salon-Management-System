import "../assets/styles/managemployee.css";
function Manageemployee(props) {
	return (
		<div>
			<div className="welcome-container">
				<h1 className="welcome">Welcome Alhamdu</h1>
			</div>
			<div className="employedata-conatiner">
				{props.isEmployee && (
					<>
						<button className="add" onClick={props.handleAddEmployee}>
							&#43;
						</button>
						<button
							className="manage-employe-button"
							onClick={props.handleEmployee}>
							Manage Employee
						</button>
					</>
				)}
				{props.isCustomer && (
					<>
						<h3 className="h3-customer">Customer Data</h3>
					</>
				)}
				<table>
					<tr>
						<th>Full Name</th>
						<th>Email</th>
						<th>Phone</th>
						<th>Age</th>
						<th>Adress</th>

						{props.isEmployee && (
							<>
								<th>Gender</th>
								<th colSpan={2}>Action</th>
							</>
						)}
					</tr>
					<tr>
						<td>Alfreds Futterkiste</td>
						<td>Maria Anders</td>
						<td>Germany</td>
						<td>0964676678</td>
						<td>total</td>
						{props.isEmployee && (
							<>
								<td>Male</td>
								<td>
									<button className="action">Edit</button>
								</td>
								<td>
									<button className="action delete">Delete</button>
								</td>
							</>
						)}
					</tr>
					<tr>
						<td>Alfreds Futterkiste</td>
						<td>Maria Anders</td>
						<td>Germany</td>
						<td>0964676678</td>
						<td>total</td>
						{props.isEmployee && (
							<>
								<td>Male</td>
								<td>
									<button className="action">Edit</button>
								</td>
								<td>
									<button className="action delete">Delete</button>
								</td>
							</>
						)}
					</tr>
					<tr>
						<td>Alfreds Futterkiste</td>
						<td>Maria Anders</td>
						<td>Germany</td>
						<td>0964676678</td>
						<td>total</td>
						{props.isEmployee && (
							<>
								<td>Male</td>
								<td>
									<button className="action">Edit</button>
								</td>
								<td>
									<button className="action delete">Delete</button>
								</td>
							</>
						)}
					</tr>
					<tr>
						<td>Alfreds Futterkiste</td>
						<td>Maria Anders</td>
						<td>Germany</td>
						<td>0964676678</td>
						<td>total</td>
						{props.isEmployee && (
							<>
								<td>Male</td>
								<td>
									<button className="action">Edit</button>
								</td>
								<td>
									<button className="action delete">Delete</button>
								</td>
							</>
						)}
					</tr>
					<tr>
						<td>Alfreds Futterkiste</td>
						<td>Maria Anders</td>
						<td>Germany</td>
						<td>0964676678</td>
						<td>total</td>
						{props.isEmployee && (
							<>
								<td>Male</td>
								<td>
									<button className="action">Edit</button>
								</td>
								<td>
									<button className="action delete">Delete</button>
								</td>
							</>
						)}
					</tr>
					<tr>
						<td>Alfreds Futterkiste</td>
						<td>Maria Anders</td>
						<td>Germany</td>
						<td>0964676678</td>
						<td>total</td>
						{props.isEmployee && (
							<>
								<td>Male</td>
								<td>
									<button className="action">Edit</button>
								</td>
								<td>
									<button className="action delete">Delete</button>
								</td>
							</>
						)}
					</tr>
					<tr>
						<td>Alfreds Futterkiste</td>
						<td>Maria Anders</td>
						<td>Germany</td>
						<td>0964676678</td>
						<td>total</td>
						{props.isEmployee && (
							<>
								<td>Male</td>
								<td>
									<button className="action">Edit</button>
								</td>
								<td>
									<button className="action delete">Delete</button>
								</td>
							</>
						)}
					</tr>
					<tr>
						<td>Alfreds Futterkiste</td>
						<td>Maria Anders</td>
						<td>Germany</td>
						<td>0964676678</td>
						<td>total</td>
						{props.isEmployee && (
							<>
								<td>Male</td>
								<td>
									<button className="action">Edit</button>
								</td>
								<td>
									<button className="action delete">Delete</button>
								</td>
							</>
						)}
					</tr>
					<tr>
						<td>Alfreds Futterkiste</td>
						<td>Maria Anders</td>
						<td>Germany</td>
						<td>0964676678</td>
						<td>total</td>
						{props.isEmployee && (
							<>
								<td>Male</td>
								<td>
									<button className="action">Edit</button>
								</td>
								<td>
									<button className="action delete">Delete</button>
								</td>
							</>
						)}
					</tr>
					<tr>
						<td>Alfreds Futterkiste</td>
						<td>Maria Anders</td>
						<td>Germany</td>
						<td>0964676678</td>
						<td>total</td>
						{props.isEmployee && (
							<>
								<td>Male</td>
								<td>
									<button className="action">Edit</button>
								</td>
								<td>
									<button className="action delete">Delete</button>
								</td>
							</>
						)}
					</tr>
					<tr>
						<td>Alfreds Futterkiste</td>
						<td>Maria Anders</td>
						<td>Germany</td>
						<td>0964676678</td>
						<td>total</td>
						{props.isEmployee && (
							<>
								<td>Male</td>
								<td>
									<button className="action">Edit</button>
								</td>
								<td>
									<button className="action delete">Delete</button>
								</td>
							</>
						)}
					</tr>
					<tr>
						<td>Alfreds Futterkiste</td>
						<td>Maria Anders</td>
						<td>Germany</td>
						<td>0964676678</td>
						<td>total</td>
						{props.isEmployee && (
							<>
								<td>Male</td>
								<td>
									<button className="action">Edit</button>
								</td>
								<td>
									<button className="action delete">Delete</button>
								</td>
							</>
						)}
					</tr>
					<tr>
						<td>Alfreds Futterkiste</td>
						<td>Maria Anders</td>
						<td>Germany</td>
						<td>0964676678</td>
						<td>total</td>
						{props.isEmployee && (
							<>
								<td>Male</td>
								<td>
									<button className="action">Edit</button>
								</td>
								<td>
									<button className="action delete">Delete</button>
								</td>
							</>
						)}
					</tr>
					<tr>
						<td>Alfreds Futterkiste</td>
						<td>Maria Anders</td>
						<td>Germany</td>
						<td>0964676678</td>
						<td>total</td>
						{props.isEmployee && (
							<>
								<td>Male</td>
								<td>
									<button className="action">Edit</button>
								</td>
								<td>
									<button className="action delete">Delete</button>
								</td>
							</>
						)}
					</tr>
					<tr>
						<td>Alfreds Futterkiste</td>
						<td>Maria Anders</td>
						<td>Germany</td>
						<td>0964676678</td>
						<td>total</td>
						{props.isEmployee && (
							<>
								<td>Male</td>
								<td>
									<button className="action">Edit</button>
								</td>
								<td>
									<button className="action delete">Delete</button>
								</td>
							</>
						)}
					</tr>
					<tr>
						<td>Alfreds Futterkiste</td>
						<td>Maria Anders</td>
						<td>Germany</td>
						<td>0964676678</td>
						<td>total</td>
						{props.isEmployee && (
							<>
								<td>Male</td>
								<td>
									<button className="action">Edit</button>
								</td>
								<td>
									<button className="action delete">Delete</button>
								</td>
							</>
						)}
					</tr>
					<tr>
						<td>Alfreds Futterkiste</td>
						<td>Maria Anders</td>
						<td>Germany</td>
						<td>0964676678</td>
						<td>total</td>
						{props.isEmployee && (
							<>
								<td>Male</td>
								<td>
									<button className="action">Edit</button>
								</td>
								<td>
									<button className="action delete">Delete</button>
								</td>
							</>
						)}
					</tr>
				</table>
			</div>
		</div>
	);
}
export default Manageemployee;
