import React from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/Admin/managemployee.css";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/Autcontext";
import { useServiceProdctContext } from "../../context/productAndServicecomtext";
import { IoSearchSharp } from "react-icons/io5";

function Manageemployee(props) {
	const [customer, setcustomerr] = useState([]);
	const [employee, setEmployee] = useState([]);
	const navigate = useNavigate();
	const { token } = useAuthContext();
	const { setEmployeee } = useServiceProdctContext();
	const [searchTerm, setSearchTerm] = useState("");
	const [showDeleteEmployee, setShowDeleteEmployee] = useState(false);
	const [ordeid, setOrderId] = useState("");

	const handleSearch = (e) => {
		setSearchTerm(e.target.value);
	};
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
	const employes = employee.filter((customer) => {
		const nameMatch = customer.fname
			?.toLowerCase()
			.includes(searchTerm.toLowerCase());
		const emailMatch = customer.email
			?.toLowerCase()
			.includes(searchTerm.toLowerCase());
		return nameMatch || emailMatch;
	});

	const customers = customer.filter((customer) => {
		const emailMatch = customer.email
			?.toLowerCase()
			.includes(searchTerm.toLowerCase());
		return emailMatch;
	});
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
					</>
				)}
				{props.isCustomer && (
					<>
						<h3 className="h3-customer">Customer Data</h3>
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
					{props.isCustomer && customers.length == 0 && (
						<h1 className="no">NO Customer</h1>
					)}
					{props.isCustomer &&
						customers.map((data) => (
							<tr key={data.id}>
								<td>{data.fname + " " + data.lname}</td>
								<td>{data.email}</td>
								<td>{data.phone}</td>
								<td>{data.age}</td>
								<td>{data.adress}</td>
							</tr>
						))}
					{props.isEmployee && employes.length == 0 && (
						<h1 className="no" style={{ fontSize: "44px" }}>
							NO Employee
						</h1>
					)}
					{props.isEmployee &&
						employes.map((data) => (
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
											setOrderId(data.id);
											setShowDeleteEmployee(true);
										}}>
										Delete
									</button>
								</td>
							</tr>
						))}
				</table>
			</div>

			{showDeleteEmployee && (
				<>
					<div className="popup-container">
						<div className="popup">
							<p style={{ marginTop: "0px", marginBottom: "30px" }}>
								Do You Want To Delete The Employee?
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
									setShowDeleteEmployee(false);
									handleDeleteEmployee(ordeid);
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
									setShowDeleteEmployee(false);
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
export default Manageemployee;
