import "../../assets/styles/login.css";
function Login() {
	return (
		<form>
			<div className="login-container">
				<div className="loginform container">
					<div>
						<h3 className="login-h3">Login to GlowCity</h3>
					</div>
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
						<a href="#" className="login-button">
							Login{" "}
						</a>
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
