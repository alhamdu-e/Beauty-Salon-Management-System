import "../assets/styles/service.css";

function Service() {
	return (
		<form action="">
			<div className="serviceform container">
				<div>
					<label htmlFor="servicename">Service Name</label>
					<input
						className="serviceform-input"
						type="text"
						id="servicename"
						name="serviceName"
					/>
					<br />
				</div>
				<div>
					<label htmlFor="servicedecription">Service Description</label>
					<textarea
						id="servicedescription"
						name="description"
						className="serviceform-textarea"></textarea>
					<br />
				</div>
				<div>
					<label htmlFor="servicecatagory">Service Catagory</label>
					<select
						id="servicecatagory"
						name="servicecatagory"
						className="serviceform-select">
						<option selected disabled>
							Service Catagory
						</option>
						<option value="nail">Nail</option>
						<option value="hair">Hair</option>
						<option value="makeup">Makeup</option>
					</select>
				</div>
				<div>
					<label htmlFor="price">Price</label>
					<input
						className="serviceform-input"
						type="text"
						name="price"
						id="price"
					/>
				</div>
				<div>
					<button type="submit">submit</button>
				</div>
			</div>
		</form>
	);
}
export default Service;
