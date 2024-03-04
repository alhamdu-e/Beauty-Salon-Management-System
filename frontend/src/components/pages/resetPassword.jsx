import { useState } from "react";
import "../../assets/styles/resetPassword.css";
import { Link } from "react-router-dom";
function ResetPassword() {
	const [password, setPassword] = useState("");
	const userEmail = localStorage.getItem("email");
	console.log(userEmail, "love");

	const handleChangeEmail = (e) => {
		setPassword(e.target.value);
	};

	const handlesubmit = async (event) => {
		event.preventDefault();
		console.log("hi");
		try {
			console.log("hil");
			const response = await fetch("http://127.0.0.1:5000/resetPassword", {
				method: "post",
				body: JSON.stringify({ password, userEmail }),
				headers: { "Content-Type": "Application/json" },
			});
			console.log(await response.json());
			if (response.ok) {
			} else {
			}
		} catch (error) {
			console.log("error", error);
		}
	};
	return (
		<div className="resetPassword-container">
			<p className="password-reset-p ">Password Does't Match! 👋👋👋</p>
			<form onSubmit={handlesubmit}>
				<div className="resetPassword-container-div">
					<h3 className="reset-h3">Reset Password</h3>
					<label htmlFor="">Enter New Password</label>
					<input
						type="text"
						onChange={handleChangeEmail}
						className="input-for-reset-Password"
					/>
					<label htmlFor="">Confirm Password</label>
					<input
						type="text"
						// onChange={handleChangeEmail}
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
		</div>
	);
}

export default ResetPassword;
