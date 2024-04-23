import React from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/Admin/managemployee.css";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/Autcontext";
import { useServiceProdctContext } from "../../context/productAndServicecomtext";

function Manageemployee(props) {
	const [customer, setcustomerr] = useState([]);
	const [employee, setEmployee] = useState([]);
	const navigate = useNavigate();
	const { token } = useAuthContext();
	const { setEmployeee } = useServiceProdctContext();
	useEffect(() => {
		async function fetchEmployeeData() {
			const response = await fetch("http://127.0.0.1:5000/employee", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});

			if (response.ok) {
				const data = await response.json();
				setEmployee(data);
			} else {
				console.log(response);
				navigate("/404page", { replace: true });
			}
		}

		async function fetchCustomerData() {
			const response = await fetch("http://127.0.0.1:5000/customer", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});

			if (response.ok) {
				const data = await response.json();

				setcustomerr(data);
			} else {
				navigate("/404page", { replace: true });
			}
		}

		fetchEmployeeData();
		fetchCustomerData();
	}, []);
	const handleEditEmployee = async (employeeid) => {
		const response = await fetch(
			`http://127.0.0.1:5000/employee/${employeeid}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			}
		);
		if (response.ok) {
			const data = await response.json();
			console.log(data);
			// localStorage.setItem("employeeData", JSON.stringify(data));
			setEmployeee(data);
			console.log("service  data set in local storage:", data);
		} else {
			console.error("Failed to fetch product data");
		}
	};
	const handleDeleteEmployee = async (employeeid) => {
		const response = await fetch(
			`http://127.0.0.1:5000/employee/${employeeid}`,
			{
				method: "Delete",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			}
		);
		if (response.ok) {
			const data = await response.json();
			setEmployee(data);
		} else {
			console.error("Failed to fetch product data");
		}
	};
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
								<th>image</th>
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
								<td>
									<img src={data.pimage} alt="" className="image-admin" />
								</td>
								<td>{data.gender}</td>
								<td>{data.profession}</td>
								<td>
									<button
										className="action"
										onClick={() => {
											handleEditEmployee(data.id);
											props.handleShowEditEmployee();
										}}>
										Edit
									</button>
								</td>
								<td>
									<button
										className="action delete"
										onClick={() => {
											handleDeleteEmployee(data.id);
											props.handleShowPopup();
										}}>
										Delete
									</button>
								</td>
							</tr>
						))}
				</table>
			</div>
		</div>
	);
}
export default Manageemployee;
