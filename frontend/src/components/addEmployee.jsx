import "../assets/styles/addEmployee.css";
function AddEmployee(props) {
	return (
		<div>
			<div className="conatnerforaddemployee">
				<button className="add">&#43;</button>
				<button
					className="manage-employe-button"
					onClick={props.handleEmployee}>
					Manage Employee
				</button>
			</div>
			<div className="addemployee container">
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
					<label htmlFor="adress">Gender</label>
					<select
						id="servicecatagory"
						name="servicecatagory"
						className="serviceform-select">
						<option selected disabled>
							Select Gender
						</option>
						<option value="nail">Male</option>
						<option value="hair">Female</option>
					</select>
				</div>
				<div>
					<label htmlFor="adress">Profesional Type</label>
					<select
						id="servicecatagory"
						name="servicecatagory"
						className="serviceform-select">
						<option selected disabled>
							Select Profesional Type
						</option>
						<option value="nail">Nail stylist</option>
						<option value="hair">Hair stylist</option>
						<option value="makeup">Makeup stylist</option>
					</select>
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

				<a href="#" className="addemployee-a">
					Add Employee{" "}
				</a>
			</div>
		</div>
	);
}
export default AddEmployee;
