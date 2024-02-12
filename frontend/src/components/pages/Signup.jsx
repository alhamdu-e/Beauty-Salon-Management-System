import "../../assets/styles/signup.css";
function Singup() {
	return (
		<form action="">
			<div className="login-container">
				<div className="signup">
					<div className="imaggg">
						{/* <img src="./images/G8.jpg" alt="" /> */}
					</div>
					<div className="signupform container">
						<div>
							<label htmlFor="firstname">First Name</label>
							<input
								type="text"
								name="firstname"
								id="firstname"
								placeholder="FirstName"
							/>
						</div>

						<div>
							<label htmlFor="lastname">Last Name</label>
							<input
								type="text"
								name="lastname"
								id="lastname"
								placeholder="LastName"
							/>
						</div>

						<div>
							<label htmlFor="age">Age</label>
							<input type="number" name="age" id="age" placeholder="your age" />
						</div>
						<div>
							<label htmlFor="email">Email</label>
							<input type="email" name="email" id="email" placeholder="Email" />
						</div>
						<div>
							<label htmlFor="phone">Phone</label>
							<input type="tel" name="phone" id="phone" placeholder="Phone" />
						</div>

						<div>
							<label htmlFor="adress">Adress</label>
							<input
								type="text"
								name="address"
								id="address"
								placeholder="Your Adress"
							/>
						</div>
						<div>
							<label htmlFor="password">Password</label>
							<input
								type="password"
								name="password"
								id="password"
								placeholder="Password"
							/>
						</div>

						<div>
							<label htmlFor="confirmPassword">Confirm Password</label>
							<input
								type="password"
								name="confirmPassword"
								id="confirmPassword"
								placeholder="Confirm Password"
							/>
						</div>
						<a href="#" className="signupform-a">
							submit{" "}
						</a>
					</div>
				</div>
			</div>
		</form>
	);
}
export default Singup;
