import "../../assets/styles/login.css";
function Login() {
	return (
		<form>
			<div className="loginform container">
				<div>
					<label htmlFor="username">Username</label>
					<input
						type="text"
						placeholder="Username"
						name="username"
						id="username"
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
					/>
					<br />
				</div>

				<div>
					<a href="#">submit </a>
				</div>
			</div>
		</form>
	);
}
export default Login;
