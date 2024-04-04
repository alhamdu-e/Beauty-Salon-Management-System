import React from "react";

import { useEffect, useState } from "react";
import "../../assets/styles/resetPassword.css";
import { Link, useParams, useNavigate } from "react-router-dom";
function ResetPassword() {
	const { expiration, email } = useParams();
	const navigate = useNavigate();

	const [password, setPassword] = useState("");
	const [confirmPassword, setconfirmPassword] = useState("");
	const [isconfirmed, setIsconfirmed] = useState(true);

	const [showPopup, setShowPoup] = useState(false);
	const handlePopup = () => {
		setShowPoup(true);
		navigate("/login", { replace: true });
	};
	if (showPopup) {
		setTimeout(handlePopup, 3000);
	}
	const [error, setError] = useState({});

	const [isExpired, setIsExpired] = useState(false);

	const currentTimeStamp = Date.now();

	useEffect(() => {
		if (currentTimeStamp > parseInt(atob(expiration))) {
			setIsExpired(true);
		}
	}, [expiration]);

	const handleChangePassword = (e) => {
		setPassword(e.target.value);
	};
	const handleChangeconPassword = (e) => {
		setconfirmPassword(e.target.value);
	};

	const handlesubmit = async (event) => {
		event.preventDefault();
		//check if the password and confirmation are empty or not
		const errors = {};
		if (password !== confirmPassword) {
			setIsconfirmed(false);
			return;
		}
		if (password.length < 8) {
			errors.empty = "Password must be at least 8 characters";
			setError(errors);
			return;
		}

		try {
			const response = await fetch("http://127.0.0.1:5000/resetPassword", {
				method: "post",
				body: JSON.stringify({ password, email }),
				headers: { "Content-Type": "Application/json" },
			});
			if (response.ok) {
				setShowPoup(true);
			} else {
			}
		} catch (error) {
			console.log("error", error);
		}
	};
	if (isExpired) {
		return (
			<div>
				<h1 className="linkexpired">Link Expired</h1>
				<p className="linkexpired mmm">
					<Link to="/resetemail" className="mmm">
						Try Again
					</Link>
				</p>
			</div>
		);
	}
	return (
		<div className="resetPassword-container">
			<p className={`password-reset-p hidden ${isconfirmed ? "" : "visible"}`}>
				Password Does't Match! 👋👋👋
			</p>
			<form onSubmit={handlesubmit}>
				<div className="resetPassword-container-div">
					<h3 className="reset-h3">Reset Password</h3>
					<label htmlFor="">Enter New Password</label>
					<input
						type="text"
						onChange={handleChangePassword}
						className="input-for-reset-Password"
					/>
					{error.empty && <p className="error">{error.empty}</p>}
					<label htmlFor="">Confirm Password</label>
					<input
						type="text"
						onChange={handleChangeconPassword}
						className="input-for-reset-Password"
					/>
					<br />
					<button className="sendEmailbuton-password" type="submit">
						submit
					</button>{" "}
					<Link className="sendEmailbuton-password cancel" to="/login">
						Cancel
					</Link>
				</div>
			</form>

			{showPopup && (
				<div className="popup-container" onClick={handlePopup}>
					<div className="popup">
						<span className="check-mark"> &#10003;</span>
						<p>Pssword Reseted Successfully!</p>
					</div>
				</div>
			)}
		</div>
	);
}

export default ResetPassword;
