import { useState } from "react";
import "../../assets/styles/Admin/addEmployee.css";
import { useNavigate } from "react-router-dom";

function AddEmployee(props) {
	const [fname, setFname] = useState("");
	const [lname, setLname] = useState("");
	const [gender, setGender] = useState("");
	const [profesion, setProfesion] = useState("");
	const [email, setEmail] = useState("");
	const [age, setAge] = useState("");
	const [phone, setPhone] = useState("");
	const [adress, setAdress] = useState("");
	const [image, setimage] = useState("");
	const [errors, setErrors] = useState({});
	const [databaseMesssage, setDatabaseMessage] = useState("");

	const [errM, setErr] = useState(false);
	const navigate = useNavigate();

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
	const handleimage = (event) => {
		setimage(event.target.files[0]);
	};

	const validateForm = () => {
		let errors = {};

		if (!fname) {
			errors.fname = "First Name is required";
		} else if (!/^[a-zA-Z]+$/.test(fname)) {
			errors.fname = "First Name should only contain letters";
		}

		if (!lname) {
			errors.lname = "Last Name is required";
		} else if (!/^[a-zA-Z]+$/.test(lname)) {
			errors.lname = "Last Name should only contain letters ";
		}

		if (!email) {
			errors.email = "Email is required";
		} else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
			errors.email = "Email is invalid";
		}

		if (!phone) {
			errors.phone = "Phone is required";
		} else if (!phone.match(/^(09|07)\d{8}$/)) {
			errors.phone = "Invalid phone number format";
		}

		if (!age) {
			errors.age = "Age is required";
		} else if (age < 20 || age > 45) {
			errors.age = "Age should be between 20 and 45";
		}

		if (!gender) {
			errors.gender = "Gender is required";
		}

		if (!profesion) {
			errors.profession = "Profession is required";
		}
		if (!image) {
			errors.image = "Employee Image is required";
		}

		setErrors(errors);

		return Object.keys(errors).length === 0;
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (validateForm()) {
			const formData = new FormData();
			formData.append("fname", fname);
			formData.append("lname", lname);
			formData.append("email", email);
			formData.append("phone", phone);
			formData.append("address", adress);
			formData.append("age", age);
			formData.append("gender", gender);
			formData.append("profesion", profesion);
			formData.append("image", image);
			try {
				const response = await fetch("http://127.0.0.1:5000/addEmployee", {
					method: "POST",
					body: formData,
				});
				console.log(response);
				if (response.ok) {
					setErr(false);
					props.handleShowPopup();
				} else if (response.status === 400) {
					setDatabaseMessage("Employee Exist!");
					setErr(true);
				} else if (response.status === 403) {
					setDatabaseMessage("File Type Not Supported!");
					setErr(true);
				} else {
					navigate("/servererror");
				}
			} catch (error) {
				console.log("Error when adding service:", error);
			}
		}
	};
	return (
		<div>
			<div className="conatnerforaddemployee">
				<p className="userExist" style={!errM ? { visibility: "hidden" } : {}}>
					{databaseMesssage}
				</p>
				<button className="add bn">&#43;</button>
				<button
					className="manage-employe-button bn"
					onClick={props.handleEmployee}>
					Manage Employee
				</button>
			</div>
			<form onSubmit={handleSubmit} encType="multipart/form-data">
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
						{errors.fname && <span className="error">{errors.fname}</span>}
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
						{errors.lname && <span className="error">{errors.lname}</span>}
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
						{errors.age && <span className="error">{errors.age}</span>}
					</div>
					<div>
						<label htmlFor="email">Email</label>
						<input
							type="text"
							name="email"
							id="email"
							placeholder="Email"
							onChange={handleChangeEmail}
						/>
						{errors.email && <span className="error">{errors.email}</span>}
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
						{errors.phone && <span className="error">{errors.phone}</span>}
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
						<label htmlFor="Image">Employee Image</label>
						<input
							type="file"
							name="image"
							id="image"
							onChange={handleimage}
							accept="image/*"
						/>
						{errors.image && <p className="error">{errors.image}</p>}
					</div>

					<div>
						<label htmlFor="gender">Gender</label>
						<select
							id="gender"
							name="gender"
							className="serviceform-select"
							onChange={handleChangeGender}>
							<option selected disabled>
								Select Gender
							</option>
							<option value="male">Male</option>
							<option value="female">Female</option>
						</select>
						{errors.gender && <span className="error">{errors.gender}</span>}
					</div>

					<div>
						<label htmlFor="profession">Professional Type</label>
						<select
							id="profession"
							name="profession"
							className="serviceform-select"
							onChange={handleChangeProfesion}>
							<option selected disabled>
								Select Professional Type
							</option>
							<option value="nail">Nail stylist</option>
							<option value="hair">Hair stylist</option>
							<option value="makeup">Makeup stylist</option>
							<option value="cashier">Cashier</option>
						</select>
						{errors.profession && (
							<span className="error">{errors.profession}</span>
						)}
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
