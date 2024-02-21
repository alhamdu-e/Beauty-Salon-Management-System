import { useEffect, useState } from "react";
import "../../assets/styles/Admin/editEmployee.css";
function EditEmployee(props) {
	const [employeeData, setemployeeData] = useState([]);

	useEffect(() => {
		// Function to retrieve data from local storage
		const retrieveEmployeeDataFromLocalStorage = () => {
			const storedData = localStorage.getItem("employeeData");
			if (storedData) {
				setemployeeData(JSON.parse(storedData));
			}
		};
		// Call the function when component mounts
		retrieveEmployeeDataFromLocalStorage();
	}, []);

	const [fname, setFname] = useState("");
	const [lname, setLname] = useState("");
	const [gender, setGender] = useState("");
	const [profesion, setProfesion] = useState("");
	const [email, setEmail] = useState("");
	const [age, setAge] = useState("");
	const [password, setPassword] = useState("");
	const [phone, setPhone] = useState("");
	const [adress, setAdress] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [id, setId] = useState("");

	useEffect(() => {
		if (employeeData.length > 0) {
			setFname(employeeData[0].fname);
			setLname(employeeData[0].lname);
			setGender(employeeData[0].gender);
			setProfesion(employeeData[0].profession);
			setAge(employeeData[0].age);
			setPhone(employeeData[0].phone);
			setAdress(employeeData[0].address);
			setEmail(employeeData[0].email);
			setPassword(employeeData[0].password);
			setConfirmPassword(employeeData[0].password);
			setId(employeeData[0].id);
		}
	}, [employeeData]);

	const handleChangeFirstName = (event) => {
		setFname(event.target.value);
	};
	const handleChangeGender = (event) => {
		setGender(event.target.value);
	};
	const handleChangeProfesion = (event) => {
		setProfesion(event.target.value);
	};
	const handleChangeLastName = (event) => {
		setLname(event.target.value);
	};
	const handleChangeEmail = (event) => {
		setEmail(event.target.value);
	};
	const handleChangePassword = (event) => {
		setPassword(event.target.value);
	};
	const handleChangeConfirmPassword = (event) => {
		setConfirmPassword(event.target.value);
	};
	const handleChangePhone = (event) => {
		setPhone(event.target.value);
	};
	const handleChangeAddress = (event) => {
		setAdress(event.target.value);
	};
	const handleChangeAge = (event) => {
		setAge(event.target.value);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const addemployee = {
			fname,
			lname,
			email,
			phone,
			adress,
			age,
			password,
			gender,
			profesion,
			id,
		};

		try {
			console.log(addemployee);
			const response = await fetch("http://127.0.0.1:5000/editEmployee", {
				method: "Put",
				body: JSON.stringify(addemployee),
				headers: { "Content-Type": "application/json" },
			});
			if (response.ok) {
				console.log("user registered");
			} else {
				console.log("user not registered", response.statusText);
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div>
			<div className="conatnereditaddemployee">
				{/* <button className="add">&#43;</button> */}
				<button
					className="manage-employee-button"
					onClick={props.handleEmployee}>
					Manage Employee
				</button>
			</div>
			<form onSubmit={handleSubmit}>
				<div className="editemployee container">
					<div>
						<label htmlFor="firstname">First Name</label>
						<input
							type="text"
							name="firstname"
							id="firstname"
							placeholder="FirstName"
							onChange={handleChangeFirstName}
							value={fname}
						/>
					</div>

					<div>
						<label htmlFor="lastname">Last Name</label>
						<input
							type="text"
							name="lastname"
							id="lastname"
							placeholder="LastName"
							onChange={handleChangeLastName}
							value={lname}
						/>
					</div>

					<div>
						<label htmlFor="age">Age</label>
						<input
							type="number"
							name="age"
							id="age"
							placeholder="your age"
							onChange={handleChangeAge}
							value={age}
						/>
					</div>
					<div>
						<label htmlFor="email">Email</label>
						<input
							type="email"
							name="email"
							id="email"
							placeholder="Email"
							onChange={handleChangeEmail}
							value={email}
						/>
					</div>
					<div>
						<label htmlFor="phone">Phone</label>
						<input
							type="tel"
							name="phone"
							id="phone"
							placeholder="Phone"
							onChange={handleChangePhone}
							value={phone}
						/>
					</div>

					<div>
						<label htmlFor="adress">Adress</label>
						<input
							type="text"
							name="address"
							id="address"
							placeholder="Your Adress"
							onChange={handleChangeAddress}
							value={adress}
						/>
					</div>
					<div>
						<label htmlFor="adress">Gender</label>
						<select
							id="servicecatagory"
							name="servicecatagory"
							className="serviceform-select"
							onChange={handleChangeGender}
							value={gender}>
							<option selected disabled>
								Select Gender
							</option>
							<option value="male">Male</option>
							<option value="female">Female</option>
						</select>
					</div>
					<div>
						<label htmlFor="adress">Profesional Type</label>
						<select
							id="servicecatagory"
							name="servicecatagory"
							className="serviceform-select"
							onChange={handleChangeProfesion}
							value={profesion}>
							<option selected disabled>
								Select Profesional Type
							</option>
							<option value="nail">Nail stylist</option>
							<option value="hair">Hair stylist</option>
							<option value="makeup">Makeup stylist</option>
						</select>
					</div>
					<div>
						<label htmlFor="password">Password</label>
						<input
							type="password"
							name="password"
							id="password"
							placeholder="Password"
							onChange={handleChangePassword}
							value={password}
						/>
					</div>
					<div>
						<label htmlFor="confirmPassword">Confirm Password</label>
						<input
							type="password"
							name="confirmPassword"
							id="confirmPassword"
							placeholder="Confirm Password"
							onChange={handleChangeConfirmPassword}
							value={confirmPassword}
						/>
					</div>
					<button className="editemployee-a" type="submit">
						Add Employee{" "}
					</button>
				</div>
			</form>
		</div>
	);
}
export default EditEmployee;
