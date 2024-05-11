import React from "react";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/Autcontext";
import { IoSearchSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function FeedBack(props) {
	const { token } = useAuthContext();

	const [showDelete, setShowDelete] = useState(false);
	const [ordeid, setOrderId] = useState("");

	const naviaget = useNavigate();

	const [FeedBackInfo, setFeedBackInfo] = useState([]);
	useEffect(() => {
		fetch("http://127.0.0.1:5000/feedbacks", {
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
				setFeedBackInfo(data);
			});
	}, []);

	const handleDeleteFeedBack = async (id) => {
		const response = await fetch(`http://127.0.0.1:5000/feedback/${id}`, {
			method: "Delete",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		if (response.ok) {
			const data = await response.json();
			setFeedBackInfo(data);
		} else {
			naviaget("/serverError", { replace: true });
		}
	};

	return (
		<div className="view-appointment">
			<div className="first">
				<>
					<h3 className="h3-customer">FeedBack Data</h3>
				</>
				<table>
					<thead>
						<tr>
							<th>Name</th>

							<th colSpan={2}>Action</th>
						</tr>
					</thead>
					{FeedBackInfo?.length == 0 && <h1 className="no">NO FeedBack</h1>}
					<tbody>
						{FeedBackInfo?.map((data) => (
							<tr key={data.order_id}>
								<td>{data.feedback}</td>

								<td>
									<button
										className="action delete"
										onClick={() => {
											setOrderId(data.feedback_id);
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
								Do You Want To Delete The FeedBack?
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
									handleDeleteFeedBack(ordeid);
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

export default FeedBack;
