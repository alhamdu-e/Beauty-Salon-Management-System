import { useState } from "react";
import "../../assets/styles/signup.css";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEyeSlash } from "react-icons/fa6";
import { MdOutlineRemoveRedEye } from "react-icons/md";
function Signup() {
	const [fname, setFname] = useState("");
	const [lname, setLname] = useState("");
	const [email, setEmail] = useState("");
	const [age, setAge] = useState("");
	const [password, setPassword] = useState("");
	const [phone, setPhone] = useState("");
	const [adress, setAdress] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [validationErrors, setValidationErrors] = useState({});
	const [errorMessage, setErrMessage] = useState(false);
	const [showpassword, setshowpassword] = useState(false);
	const [showConifermpassword, setshowConifermpassword] = useState(false);
	const [isemailFake, setFake] = useState(false);

	const navigate = useNavigate();

	const handleChangeFirstName = (event) => {
		setFname(event.target.value);
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
	const handleShwoPassword = () => {
		setshowpassword(!showpassword);
	};
	const handleShwoConifermPassword = () => {
		setshowConifermpassword(!showConifermpassword);
	};
	let errors = {};
	const validateForm = () => {
		if (!fname) {
			errors.fname = "Firstname is required";
		} else if (!fname.match(/^[A-Za-z]+$/)) {
			errors.fname = "First name must contain only characters.";
		}

		if (!lname) {
			errors.lname = "Lastname is required";
		} else if (!lname.match(/^[A-Za-z]+$/)) {
			errors.lname = "Last name must contain only characters.";
		}

		if (!age) {
			errors.age = "Age is required";
		} else if (age < 15 || age > 70) {
			errors.age = "Age must be between 15 and 70.";
		}
		if (!email) {
			errors.email = "Email is required";
		} else if (!email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
			errors.email = "Invalid email format.";
		}
		if (!phone) {
			errors.phone = "Phone is required";
		} else if (!phone.match(/^(09|07)\d{8}$/)) {
			errors.phone = "Invalid phone number format.";
		}

		if (!adress) {
			errors.adress = "Address is required";
		} else if (!adress.match(/^(?=.*[A-Za-z])[A-Za-z\d\s,-]+$/)) {
			errors.adress =
				"Address must contain letters and cannot be only numbers.";
		}
		if (!password) {
			errors.password = "Password is required";
		} else if (password.length < 8) {
			errors.password = "Password must be at least 8 characters long.";
		} else if (!/[A-Z]/.test(password)) {
			errors.password = "Password must contain  one uppercase letter.";
		} else if (!/[a-z]/.test(password)) {
			errors.password = "Password must contain one Lowercase letter.";
		}

		if (password !== confirmPassword) {
			errors.confirmPassword = "Passwords do not match.";
		}

		setValidationErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setErrMessage(false);
		setValidationErrors({});
		setFake(false);

		if (validateForm()) {
			setValidationErrors({});
			try {
				const response = await fetch(
					`https://api.hunter.io/v2/email-verifier?email=${email}&api_key=c0246f4d073a8f50526bf28b8113a6190da1e765`
				);
				const data = await response.json();
				console.log(data.data.result);
				if (data.data.result === "deliverable") {
					setFake(false);
					const signupForm = {
						fname,
						lname,
						email,
						phone,
						adress,
						age,
						password,
					};

					const response = await fetch("http://127.0.0.1:5000/signup", {
						method: "POST",
						body: JSON.stringify(signupForm),
						headers: { "Content-Type": "application/json" },
					});

					if (response.ok) {
						navigate("/login");
					} else if (response.status === 400) {
						setErrMessage(true);
					} else {
						navigate("/serverError");
					}
				} else {
					setFake(true);
				}
			} catch (error) {
				console.error("Error verifying email:", error);
				// Handle error
				throw error; // Throw the error for handling in the caller
			}
			try {
			} catch (error) {
				console.log(error);
			}
		}
	};
	return (
		<form onSubmit={handleSubmit}>
			<div className="fullsign">
				<div className="signlogin-container">
					<div className="signup">
						<p
							className="userExist"
							style={!errorMessage ? { visibility: "hidden" } : {}}>
							User Exist!
							<Link to="/login" className="login-link">
								Login
							</Link>
						</p>
						<div className="signupform container">
							<div>
								<label htmlFor="firstname">First Name</label>
								<input
									type="text"
									name="firstname"
									id="firstname"
									placeholder="FirstName"
									onChange={handleChangeFirstName}
								/>{" "}
								{validationErrors.fname && (
									<span className="error">{validationErrors.fname}</span>
								)}
							</div>

							<div>
								<label htmlFor="lastname">Last Name</label>
								<input
									type="text"
									name="lastname"
									id="lastname"
									placeholder="LastName"
									onChange={handleChangeLastName}
								/>{" "}
								{validationErrors.lname && (
									<span className="error">{validationErrors.lname}</span>
								)}
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
								{validationErrors.age && (
									<span className="error">{validationErrors.age}</span>
								)}
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
								{validationErrors.email && (
									<span className="error">{validationErrors.email}</span>
								)}
								{isemailFake && (
									<span className="error">
										The Email Is Fake or Undeliverable
									</span>
								)}
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
								{validationErrors.phone && (
									<span className="error">{validationErrors.phone}</span>
								)}
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
								{validationErrors.adress && (
									<span className="error">{validationErrors.adress}</span>
								)}
							</div>
							<div className="password-cont">
								<label htmlFor="password">Password</label>
								<input
									type={showpassword ? "text" : "password"}
									name="password"
									id="password"
									placeholder="Password"
									onChange={handleChangePassword}
								/>
								{password && (
									<button
										type="button"
										className={`nnnn ${
											validationErrors.password?.length > 0 ? "new" : ""
										}`}
										onClick={handleShwoPassword}>
										{showpassword && <FaRegEyeSlash />}

										{!showpassword && <MdOutlineRemoveRedEye />}
									</button>
								)}

								{validationErrors.password && (
									<span className="error">{validationErrors.password}</span>
								)}
							</div>

							<div className="password-cont">
								<label htmlFor="confirmPassword">Confirm Password</label>
								<input
									type={showpassword ? "text" : "password"}
									name="confirmPassword"
									id="confirmPassword"
									placeholder="Confirm Password"
									onChange={handleChangeConfirmPassword}
								/>
								{confirmPassword && (
									<button
										type="button"
										className={`nnnn ${
											validationErrors.confirmPassword?.length > 0 ? "new" : ""
										}`}
										onClick={handleShwoConifermPassword}>
										{showConifermpassword && <FaRegEyeSlash />}

										{!showConifermpassword && <MdOutlineRemoveRedEye />}
									</button>
								)}
								{validationErrors.confirmPassword && (
									<span className="error">
										{validationErrors.confirmPassword}
									</span>
								)}
							</div>
							<button type="submit" className="signupform-a">
								Submit
							</button>
						</div>
					</div>
				</div>
			</div>
		</form>
	);
}
export default Signup;
