import { useState } from "react";
import "../../assets/styles/Admin/addEmployee.css";
function AddEmployee(props) {
	const [fname, setFname] = useState("");
	const [lname, setLname] = useState("");
	const [gender, setGender] = useState("");
	const [profesion, setProfesion] = useState("");
	const [email, setEmail] = useState("");
	const [age, setAge] = useState("");
	const [phone, setPhone] = useState("");
	const [adress, setAdress] = useState("");

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

	const handleChangePhone = (event) => {
		setPhone(event.target.value);
	};
	const handleChangeAddress = (event) => {
		setAdress(event.target.value);
	};
	const handleChangeAge = (event) => {
		setAge(event.target.value);
	};

	const addemployee = {
		fname,
		lname,
		email,
		phone,
		adress,
		age,
		gender,
		profesion,
	};
	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await fetch("http://127.0.0.1:5000/addEmployee", {
				method: "POST",
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
			<div className="conatnerforaddemployee">
				<button className="add">&#43;</button>
				<button
					className="manage-employe-button"
					onClick={props.handleEmployee}>
					Manage Employee
				</button>
			</div>
			<form onSubmit={handleSubmit}>
				<div className="addemployee container">
					<div>
						<label htmlFor="firstname">First Name</label>
						<input
							type="text"
							name="firstname"
							id="firstname"
							placeholder="FirstName"
							onChange={handleChangeFirstName}
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
						/>
					</div>
					<div>
						<label htmlFor="adress">Gender</label>
						<select
							id="servicecatagory"
							name="servicecatagory"
							className="serviceform-select"
							onChange={handleChangeGender}>
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
							onChange={handleChangeProfesion}>
							<option selected disabled>
								Select Profesional Type
							</option>
							<option value="nail">Nail stylist</option>
							<option value="hair">Hair stylist</option>
							<option value="makeup">Makeup stylist</option>
						</select>
					</div>

					<button className="addemployee-a" type="submit">
						Add Employee{" "}
					</button>
				</div>
			</form>
		</div>
	);
}
export default AddEmployee;
