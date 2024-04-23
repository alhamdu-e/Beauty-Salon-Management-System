import React from "react";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/Autcontext";

function Order() {
	const { token } = useAuthContext();

	const [orderInfo, setOrderInfo] = useState([]);
	useEffect(() => {
		fetch("http://127.0.0.1:5000/orders", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				// Authorization: `Bearer ${token}`,
			},
		})
			.then((response) => {
				if (response.ok) {
					return response.json();
				}
			})
			.then((data) => {
				console.log(data);
				setOrderInfo(data);
			});
	}, []);

	return (
		<div className="view-appointment">
			<div className="first">
				<table>
					<thead>
						<tr>
							<th>Name</th>
							<th>Email</th>
							<th>products</th>
							<th>Quantity</th>
							<th>Total Amount</th>
							<th>order_Refrence</th>
							<th>Status</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{orderInfo?.map((data) => (
							<tr>
								<td>{data.first_name + " " + data.last_name}</td>
								<td>{data.customer_email}</td>
								<td>{data.products}</td>
								<td>{data.total_quantity}</td>
								<td>{data.total_amount}</td>
								<td>{data.transactionRef}</td>
								<td>{data.status}</td>

								<td>
									<button className="action">Details</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default Order;
