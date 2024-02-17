import "../../assets/styles/login.css";
import { useState } from "react";
function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const handleChangeEmail = (event) => {
		setEmail(event.target.value);
	};
	const handleChangePassword = (event) => {
		setPassword(event.target.value);
	};

	const handlesubmit = async (event) => {
		event.preventDefault();
		console.log(email, password);
		try {
			const response = await fetch("http://127.0.0.1:5000/login", {
				method: "post",
				body: JSON.stringify({ email, password }),
				headers: { "Content-Type": "Application/json" },
			});

			if (response.ok) {
				const data = await response.json();
				console.log(data);
				console.log("registered");
			} else {
				// navigate("/signup");
				console.log("not");
			}
		} catch (error) {
			console.log("error", error);
		}
	};
	return (
		<form onSubmit={handlesubmit}>
			<div className="login-container">
				<div className="loginform container">
					<div>
						<h3 className="login-h3">Login to GlowCity</h3>
					</div>
					<div>
						<label htmlFor="username">Email</label>
						<input
							type="email"
							placeholder="Email"
							name="email"
							id="username"
							onChange={handleChangeEmail}
						/>
						<br />
					</div>
					<div>
						<label htmlFor="password">Password</label>
						<input
							placeholder="Password"
							type="password"
							name="password"
							id="password"
							onChange={handleChangePassword}
						/>
						<br />
					</div>

					<div>
						<button className="login-button">Login </button>
					</div>
					<div>
						<span>
							Don't have an account? <a href="/register">Signup here.</a>
						</span>
					</div>

					<div>
						<a href="#" className="forget-button">
							Forget Password?
						</a>
					</div>
				</div>
			</div>
		</form>
	);
}
export default Login;
