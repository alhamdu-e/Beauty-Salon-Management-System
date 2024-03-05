import "../../assets/styles/login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { FaRegEyeSlash } from "react-icons/fa6";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Link } from "react-router-dom";

function Login() {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [showPassword, setShowPassword] = useState(false);
	const handleChangeEmail = (event) => {
		setEmail(event.target.value);
	};
	const handleChangePassword = (event) => {
		setPassword(event.target.value);
	};
	const handleShwoPassword = () => {
		setShowPassword(!showPassword);
	};
	const handlesubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await fetch("http://127.0.0.1:5000/login", {
				method: "post",
				body: JSON.stringify({ email, password }),
				headers: { "Content-Type": "Application/json" },
			});

			if (response) {
				const data = await response.json();
				console.log(data);
				if (response.ok) {
					localStorage.setItem("token", data.isAut);
					localStorage.setItem("userType", data.userType);
					if (data.userType == "admin") {
						navigate("/admin");
					}
					if (data.userType == "user") {
						localStorage.setItem("userId", data.usersResult[0].id);
						navigate("/");
					}
					if (data.userType == "profesional") {
						localStorage.setItem("userId", data.profesionalResult[0].id);
						navigate("/Professionalappoin");
					}
				}
				if (!data) {
					navigate("/signup");
				}
			} else {
				navigate("/signup");
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
						<Link to="/appointment">gfgg</Link>
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
					<div className="password-cont">
						<label htmlFor="password">Password</label>
						<input
							placeholder="Password"
							type={showPassword ? "text" : "password"}
							name="password"
							id="password"
							onChange={handleChangePassword}
						/>

						{password && (
							<button
								className="off-eye"
								type="button"
								onClick={handleShwoPassword}>
								{" "}
								{!showPassword && <FaRegEyeSlash />}
								{showPassword && <MdOutlineRemoveRedEye />}
							</button>
						)}

						<br />
					</div>

					<div>
						<button className="login-button">Login </button>
					</div>
					<div>
						<span>
							Don't have an account? <Link to="/signup">Signup here.</Link>
						</span>
					</div>

					<div>
						<Link className="forget-button" to="/resetemail">
							Forget Password?
						</Link>
					</div>
				</div>
			</div>
		</form>
	);
}
export default Login;
