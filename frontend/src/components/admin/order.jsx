import React from "react";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/Autcontext";
import { IoSearchSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function Order(props) {
	const { token } = useAuthContext();
	const [searchTerm, setSearchTerm] = useState("");

	const [showDelete, setShowDelete] = useState(false);
	const [ordeid, setOrderId] = useState("");

	const handleSearch = (e) => {
		setSearchTerm(e.target.value);
	};

	const naviaget = useNavigate();

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
				const sortedOrderInfo = [...data].sort(compareStatus);
				setOrderInfo(sortedOrderInfo);
			});
	}, []);

	const orders = orderInfo.filter((customer) => {
		const transactionMatch = customer.transactionRef
			?.toLowerCase()
			.includes(searchTerm.toLowerCase());
		const emailMatch = customer.customer_email
			?.toLowerCase()
			.includes(searchTerm.toLowerCase());
		return transactionMatch || emailMatch;
	});

	const handleDeleteOrder = async (orderid) => {
		const response = await fetch(`http://127.0.0.1:5000/order/${orderid}`, {
			method: "Delete",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		if (response.ok) {
			const data = await response.json();
			setOrderInfo(data);
		} else {
			naviaget("/serverError", { replace: true });
		}
	};

	const compareStatus = (a, b) => {
		let statusOrder = { ["Pending"]: 1, ["Completed"]: 2 };

		return statusOrder[a.status] - statusOrder[b.status];
	};

	return (
		<div className="view-appointment">
			<div className="serachcontainer">
				<input
					type="text"
					name=""
					id=""
					placeholder="Serach"
					className="search"
					value={searchTerm}
					onChange={handleSearch}
				/>
				<IoSearchSharp size={33} className="serachicon" />
			</div>
			<div className="first">
				<>
					<h3 className="h3-customer">Order Data</h3>
				</>
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
							<th colSpan={2}>Action</th>
						</tr>
					</thead>
					{orders.length == 0 && <h1 className="no">NO Order</h1>}
					<tbody>
						{orders?.map((data) => (
							<tr
								key={data.order_id}
								style={{
									backgroundColor: data.status === "Completed" ? "#044934" : "",
								}}>
								<td
									style={{
										backgroundColor:
											data.status === "Completed" ? "#044934" : "",
									}}>
									{data.first_name + " " + data.last_name}
								</td>
								<td
									style={{
										backgroundColor:
											data.status === "Completed" ? "#044934" : "",
									}}>
									{data.customer_email}
								</td>
								<td
									style={{
										backgroundColor:
											data.status === "Completed" ? "#044934" : "",
									}}>
									{data.products}
								</td>
								<td
									style={{
										backgroundColor:
											data.status === "Completed" ? "#044934" : "",
									}}>
									{data.total_quantity}
								</td>
								<td
									style={{
										backgroundColor:
											data.status === "Completed" ? "#044934" : "",
									}}>
									{data.total_amount}
								</td>
								<td
									style={{
										backgroundColor:
											data.status === "Completed" ? "#044934" : "",
									}}>
									{data.transactionRef}
								</td>
								<td
									style={{
										backgroundColor:
											data.status === "Completed" ? "#044934" : "",
									}}>
									{data.status}
								</td>

								<td>
									<button
										className="action delete"
										disabled={data.status == "Pending"}
										style={{
											cursor: data.status == "Pending" ? "not-allowed" : "",
										}}
										onClick={() => {
											setOrderId(data.order_id);
											setShowDelete(true);
										}}>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{showDelete && (
				<>
					<div className="popup-container">
						<div className="popup">
							<p style={{ marginTop: "0px", marginBottom: "30px" }}>
								Do You Want To Delete The Order?
							</p>
							<span
								className="check-mark"
								style={{
									fontSize: "14px",
									padding: "14px 15px",
									cursor: "pointer",
									backgroundColor: "#ac2626",
								}}
								onClick={() => {
									setShowDelete(false);
									handleDeleteOrder(ordeid);
									props.handleShowPopup();
								}}>
								{" "}
								Yes
							</span>
							<span
								className="check-mark"
								style={{
									fontSize: "14px",
									padding: "14px 15px",
									cursor: "pointer",
									backgroundColor: "#67ac26",
									marginLeft: "30px",
								}}
								onClick={() => {
									setShowDelete(false);
								}}>
								{" "}
								No
							</span>
						</div>
					</div>
				</>
			)}
		</div>
	);
}

export default Order;
