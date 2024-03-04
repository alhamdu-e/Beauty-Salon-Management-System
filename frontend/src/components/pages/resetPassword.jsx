import { useEffect, useState } from "react";
import "../../assets/styles/resetPassword.css";
import { Link, useParams } from "react-router-dom";
function ResetPassword() {
	const { expiration } = useParams();

	const [password, setPassword] = useState("");
	const userEmail = localStorage.getItem("email");
	const [isExpired, setIsExpired] = useState(false);

	const currentTimeStamp = Date.now();
	useEffect(() => {
		if (currentTimeStamp > parseInt(atob(expiration))) {
			setIsExpired(true);
		}
	}, [expiration]);

	const handleChangeEmail = (e) => {
		setPassword(e.target.value);
	};

	const handlesubmit = async (event) => {
		event.preventDefault();

		try {
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
