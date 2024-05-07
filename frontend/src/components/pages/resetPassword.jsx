import React from "react";

import { useEffect, useState } from "react";
import "../../assets/styles/resetPassword.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaRegEyeSlash } from "react-icons/fa6";
import { MdOutlineRemoveRedEye } from "react-icons/md";
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
	const [showpassword, setshowpassword] = useState(false);
	const [showConifermpassword, setshowConifermpassword] = useState(false);

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
	const handleShwoPassword = () => {
		setshowpassword(!showpassword);
	};
	const handleShwoConifermPassword = () => {
		setshowConifermpassword(!showConifermpassword);
	};
	const handlesubmit = async (event) => {
		setError(false);
		setIsconfirmed(true);
		event.preventDefault();
		//check if the password and confirmation are empty or not
		const errors = {};

		// if (password.length < 8) {
		// 	errors.empty = "Password must be at least 8 characters";
		// 	setError(errors);
		// 	return;
		// }
		if (!password) {
			errors.password = "Password is required";
			setError(errors);
			return;
		} else if (password.length < 8) {
			errors.password = "Password must be at least 8 characters long.";
			setError(errors);
			return;
		} else if (!/[A-Z]/.test(password)) {
			errors.password = "Password must contain at least one uppercase letter.";
			setError(errors);
			return;
		} else if (!/[a-z]/.test(password)) {
			errors.password = "Password must contain at least one Lower case letter.";
			setError(errors);
			return;
		}
		if (password !== confirmPassword) {
			setIsconfirmed(false);
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
			<p className={`password-reset-p hidden  ${isconfirmed ? "" : "visible"}`}>
				Password Does't Match! 👋👋👋
			</p>
			<form>
				<div className="resetPassword-container-div password-cont">
					<h3 className="reset-h3">Reset Password</h3>
					<label htmlFor="">Enter New Password</label>
					<input
						type={showpassword ? "text" : "password"}
						onChange={handleChangePassword}
						className="input-for-reset-Password"
					/>
					{password && (
						<button
							type="button"
							className="nnnnnn"
							onClick={handleShwoPassword}>
							{showpassword && <FaRegEyeSlash />}

							{!showpassword && <MdOutlineRemoveRedEye />}
						</button>
					)}
					<p className={`error hidden ${error.password ? "visible" : ""}`}>
						{error.password}
					</p>
					<label htmlFor="">Confirm Password</label>
					<input
						type={showpassword ? "text" : "password"}
						onChange={handleChangeconPassword}
						className="input-for-reset-Password"
					/>
					<br />
					<button
						className="sendEmailbuton-password"
						type="submit"
						onClick={handlesubmit}>
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
