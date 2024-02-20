import "../../assets/styles/Admin/managemployee.css";
import { useEffect, useState } from "react";
function Manageemployee(props) {
	const [customer, setcustomerr] = useState([]);
	const [employee, setEmployee] = useState([]);
	useEffect(() => {
		fetch("http://127.0.0.1:5000/customer", {
			method: "GET",
		})
			.then((response) => response.json())
			.then((data) => {
				setcustomerr(data);
			});
	}, []);

	useEffect(() => {
		fetch("http://127.0.0.1:5000/employee", {
			method: "GET",
		})
			.then((response) => response.json())
			.then((data) => {
				setEmployee(data);
			});
	}, []);

	return (
		<div>
			{/* <div className="welcome-container">
				<h1 className="welcome">Welcome Alhamdu</h1>
			</div> */}
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
								<th>Prfoession</th>
								<th colSpan={2}>Action</th>
							</>
						)}
					</tr>

					{props.isCustomer &&
						customer.map((data) => (
							<tr key={data.id}>
								<td>{data.fname + " " + data.lname}</td>
								<td>{data.email}</td>
								<td>{data.phone}</td>
								<td>{data.age}</td>
								<td>{data.adress}</td>
							</tr>
						))}

					{props.isEmployee &&
						employee.map((data) => (
							<tr key={data.id}>
								<td>{data.fname + " " + data.lname}</td>
								<td>{data.email}</td>
								<td>{data.phone}</td>
								<td>{data.age}</td>
								<td>{data.address}</td>

								<td>{data.gender}</td>
								<td>{data.profession}</td>
								<td>
									<button className="action">Edit</button>
								</td>
								<td>
									<button className="action delete">Delete</button>
								</td>
							</tr>
						))}
				</table>
			</div>
		</div>
	);
}
export default Manageemployee;
