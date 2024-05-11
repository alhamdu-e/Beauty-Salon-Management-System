import React from "react";
import { IoSearchSharp } from "react-icons/io5";
import { useNavigate, Link } from "react-router-dom";
import { useAuthContext } from "../../context/Autcontext";
import { useState, useEffect, useRef } from "react";
import { MdCancel } from "react-icons/md";
import { FaLock } from "react-icons/fa6";
import ViewAppointment from "../admin/viewAppointment";

function Cashier() {
	const { token } = useAuthContext();
	const [searchTerm, setSearchTerm] = useState("");
	const [searchTermOrder, setsearchTermOrder] = useState("");
	const [showDelete, setShowDelete] = useState(false);
	const naviaget = useNavigate();
	const [appointmentId, setAppointmentId] = useState("");

	const [shwoprofileupdate, setShowProfileUpdate] = useState(false);
	const [shwoo, setShowoo] = useState(false);
	const [shwonn, setShownn] = useState(false);
	const fileInputRef = useRef(null);
	const submitButton = useRef(null);
	const [appointment, setAppointment] = useState([]);
	const [img, setImg] = useState("");
	const [updatedPhoto, setUpdatedPhoto] = useState("");
	const [viewFeedBack, setViewFeedBack] = useState("");
	const [feedbacks, setFeedBacks] = useState("");
	const [showUpdatePassword, setShowUpdatePassword] = useState(false);
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confiremPassword, setConfiremPassword] = useState("");
	const [usertEnterdeOldPassword, setUserEnteredOldPassword] = useState("");
	const [showMessage, setShowMessage] = useState(false);
	const PName = localStorage.getItem("profesionalName");
	const PId = localStorage.getItem("profesionalId");
	const { setToken, setUserType, usertype } = useAuthContext();
	const navigate = useNavigate();

	const [showAppointmetn, setShowAppointment] = useState(false);
	const [showOrder, setShowOrder] = useState(false);

	const handleSearch = (e) => {
		setSearchTerm(e.target.value);
	};
	const handleSearchOrder = (e) => {
		setsearchTermOrder(e.target.value);
	};

	const [ordeid, setOrderId] = useState("");
	const [orderInfo, setOrderInfo] = useState([]);

	const openFile = () => {
		fileInputRef.current.click();
	};
	const logout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("profesionalName");
		localStorage.removeItem("profesionalId");
		localStorage.removeItem("userType");
		setToken("");
		setUserType("");
		navigate("/", { replace: true });
	};
	const handleUpdateProblem = () => {
		setShowProfileUpdate(!shwoprofileupdate);
		submitButton.current.click();
	};
	const [appointmentInfo, setAppointmentInfo] = useState([]);
	const [profesionaImage, setProfesionaImage] = useState("");

	useEffect(() => {
		setOldPassword(localStorage.getItem("password"));
		fetch("http://127.0.0.1:5000/appointmentinformation", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		})
			.then((response) => {
				if (response.ok) {
					return response.json();
				}
			})
			.then((data) => {
				console.log(data);
				setAppointmentInfo(data);
			});

		fetch(`http://127.0.0.1:5000/profesionalData/${PId}`, {
			method: "Get",
		})
			.then((response) => response.json())
			.then((data) => {
				setUpdatedPhoto(data[0].pimage);
			});
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

	const handleProductImage = (event) => {
		setProfesionaImage(event.target.files[0]);
		const file = event.target.files[0];

		const reader = new FileReader();
		if (file) {
			reader.readAsDataURL(file);
			reader.onloadend = () => {
				setImg(reader.result);
				setShowProfileUpdate(true);
			};
		}
	};
	const appointmentt = appointmentInfo.filter((appoint) => {
		const TMatch = appoint.Tref?.toLowerCase().includes(
			searchTerm.toLowerCase()
		);
		return TMatch;
	});
	const orders = orderInfo.filter((customer) => {
		const transactionMatch = customer.transactionRef
			?.toLowerCase()
			.includes(searchTermOrder.toLowerCase());
		const emailMatch = customer.customer_email
			?.toLowerCase()
			.includes(searchTerm.toLowerCase());
		return transactionMatch || emailMatch;
	});
	const compareStatus = (a, b) => {
		let statusOrder = {};

		statusOrder = {
			["In Progress"]: 2,
			["Completed"]: 1,
			["Canceled"]: 3,
		};

		return statusOrder[a.status] - statusOrder[b.status];
	};

	const handleDeleteOrder = async (id) => {
		const response = await fetch(`http://127.0.0.1:5000/appointment/${id}`, {
			method: "Delete",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		if (response.ok) {
			const data = await response.json();
			setAppointmentInfo(data);
		} else {
			naviaget("/serverError", { replace: true });
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		// Create a new FormData object
		const formData = new FormData();
		formData.append("profesionaID", PId);
		formData.append("profesionaImage", profesionaImage);

		try {
			const response = await fetch(
				"http://127.0.0.1:5000/updatprofesionalphoto",
				{
					method: "PUT",
					body: formData,
				}
			);

			if (response.ok) {
				const responseData = await response.json();
				setUpdatedPhoto(responseData[0].pimage);
			} else {
				console.log("Failed to edit product:", response.statusText);
			}
		} catch (error) {
			console.error("Error editing product:", error);
		}
	};

	const handeleUpdatePassword = async () => {
		setShownn(false);
		setShowoo(false);
		if (oldPassword !== usertEnterdeOldPassword) {
			setShowoo(true);
			return;
		}
		if (newPassword !== confiremPassword) {
			setShownn(true);
			return;
		}

		const response = await fetch(
			"http://127.0.0.1:5000/updatprofesionalpassword",
			{
				method: "PUT",
				body: JSON.stringify({ newPassword, PId }),
				headers: { "Content-Type": "application/json" },
			}
		);
		console.log(response);

		if (response.ok) {
			localStorage.setItem("password", newPassword);

			setShowUpdatePassword(false);
			setShowMessage(true);
		} else {
		}
	};

	const handleChangeStatus = async (orderid) => {
		const response = await fetch(`http://127.0.0.1:5000/order/${orderid}`, {
			method: "put",
			headers: {
				"Content-type": "Application/json",
			},
		});
		if (response.ok) {
			const data = await response.json();
			const sortedOrderInfo = [...data].sort(compareStatuss);
			setOrderInfo(sortedOrderInfo);
		} else {
			naviaget("/serverError", { replace: true });
		}
	};

	const compareStatuss = (a, b) => {
		let statusOrder = { ["Pending"]: 1, ["Completed"]: 2 };

		return statusOrder[a.status] - statusOrder[b.status];
	};
	return (
		<div>
			<header>
				<div
					className="header-container"
					style={{ gridTemplateColumns: "40fr 60fr" }}>
					<div>
						<span className="logo">Glowcity</span>
					</div>
					<nav>
						<ul className="navigation">
							<li>
								<Link to="/" className="navigation-link">
									Home
								</Link>
							</li>

							<li>
								<p
									className="navigation-link feedbacklink"
									onClick={() => {
										setShowOrder(true);
										setShowAppointment(false);
									}}>
									View Order
								</p>
							</li>

							<li>
								<p
									className="navigation-link feedbacklink"
									onClick={() => {
										setShowOrder(false);
										setShowAppointment(true);
									}}>
									View Appointment
								</p>
							</li>

							<li>
								<img
									src={updatedPhoto}
									alt=""
									className="profimage"
									style={{ marginRight: "-20px" }}
								/>
							</li>
							{token && (
								<>
									<li>
										<div class="dropdown">
											<button class="dropbtn">
												<p className="userProfile">Hello,{PName}</p>
												<p className="userProfile">Account &#9660;</p>
											</button>
											<div class="dropdown-content">
												<button onClick={logout}>Sign out</button>
												<button onClick={openFile}>Update Photo</button>
												<button onClick={() => setShowUpdatePassword(true)}>
													Change <FaLock size={15} />
												</button>
											</div>
										</div>
									</li>
								</>
							)}
						</ul>
					</nav>
				</div>
			</header>
			{showAppointmetn && (
				<div
					className="view-appointment"
					style={{
						marginTop: "50px",
						width: "80%",
						marginLeft: "40px",
					}}>
					<div
						className="first"
						style={{ backgroundColor: "#fdf2e9", color: "rgb(37, 31, 37)" }}>
						<h3 className="h3-customer" style={{ color: "rgb(37, 31, 37)" }}>
							Appointment Data
						</h3>
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
						<table
							style={{ backgroundColor: "#fdf2e9", color: "rgb(27, 24, 27)" }}>
							<thead>
								<tr className="tr">
									<th className="th">Appointment Date</th>
									<th className="th">Start Time</th>
									<th className="th">End time</th>
									<th className="th">profesional Name</th>
									<th className="th">customer Name</th>
									<th className="th">Service Name</th>
									<th className="th">Service Price</th>
									<th className="th">Paid Amount</th>
									<th className="th">Remaining Amount</th>
									<th className="th">Transaction Id</th>
									<th className="th">Status</th>
									<th className="th">Action</th>
								</tr>
							</thead>
							<tbody>
								{appointmentInfo.length === 0 && (
									<h1 className="no" style={{ fontSize: "35px" }}>
										NO Appointment
									</h1>
								)}
								{appointmentt?.sort(compareStatus).map((data) => (
									<tr
										style={{
											backgroundColor:
												data.status === "Canceled" ? "#861602" : "",
										}}
										className="tr">
										<td className="td">{data.appointmentDate}</td>
										<td className="td">{data.startTime}</td>
										<td className="td">{data.endTime}</td>
										<td className="td">
											{data.profFname + " " + data.profLname}
										</td>
										<td className="td">
											{data.userFname + " " + data.userLname}
										</td>
										<td className="td">{data.servicename}</td>
										<td className="td">{data.price}</td>
										<td className="td">{data.paidPrice}</td>
										<td className="td">{data.remaining}</td>
										<td className="td">{data.Tref}</td>
										<td className="td">{data.status}</td>

										<td className="td">
											<button
												style={{
													cursor:
														data.status === "In Progress" ? "not-allowed" : "",
												}}
												className="action delete"
												disabled={data.status == "In Progress"}
												onClick={() => {
													setAppointmentId(data.id);
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
				</div>
			)}
			<form encType="multipart/form-data" onSubmit={handleSubmit}>
				<input
					type="file"
					ref={fileInputRef}
					style={{ display: "none" }}
					onChange={handleProductImage}
					accept="image/*"
				/>
				<button type="submit" style={{ display: "none" }} ref={submitButton}>
					{" "}
					submit
				</button>
			</form>
			{shwoprofileupdate && (
				<div
					className="profileshow"
					onClick={() => setShowProfileUpdate(false)}>
					<div className="prof-cont" style={{ height: "400px" }}>
						<div>
							<img
								src={img}
								alt=""
								className="updateprofile"
								style={{ width: "90%" }}
							/>
							<button
								className="update-button"
								onClick={handleUpdateProblem}
								style={{ marginTop: "-40px", zIndex: 6, position: "relative" }}>
								Set Profile
							</button>
						</div>
					</div>
				</div>
			)}
			{showUpdatePassword && (
				<div className="profileshow">
					<div className="prof-contt">
						<MdCancel
							size={40}
							style={{ marginLeft: "405px", cursor: "pointer" }}
							onClick={() => setShowUpdatePassword(false)}
						/>
						<div>
							<label htmlFor="" className="passwordlabel">
								old Password
							</label>

							<input
								type="text"
								name=""
								id=""
								className="passwordinput"
								onChange={(e) => {
									setUserEnteredOldPassword(e.target.value);
								}}
							/>
							{shwoo && (
								<label className="errorrr">
									{" "}
									Your Old Password is Incorrect!
								</label>
							)}
						</div>
						<div>
							<label htmlFor="" className="passwordlabel">
								New Password
							</label>

							<input
								type="text"
								name=""
								id=""
								className="passwordinput"
								onChange={(e) => {
									setNewPassword(e.target.value);
								}}
							/>
						</div>
						<div>
							<label htmlFor="" className="passwordlabel">
								Coniferm New Password
							</label>

							<input
								type="text"
								name=""
								id=""
								className="passwordinput"
								onChange={(e) => {
									setConfiremPassword(e.target.value);
								}}
							/>
							{shwonn && (
								<label className="errorrr">PassWord doesn't Match!</label>
							)}
						</div>
						<div>
							<button
								className="passwordbutton"
								onClick={handeleUpdatePassword}>
								Update Password
							</button>
						</div>
					</div>
				</div>
			)}
			{showMessage && (
				<div
					className="popup-container"
					style={{ zIndex: 100 }}
					onClick={() => setShowMessage(false)}>
					<div className="popup">
						<p className="itemisAlready">
							{" "}
							Password Updated Succesfully<br></br>
							✅✅✅✅✅✅✅✅✅✅✔
						</p>
					</div>
				</div>
			)}
			{showOrder && (
				<div
					className="view-appointment"
					style={{
						backgroundColor: "#fdf2e9",
						color: "rgb(37, 31, 37)",
						marginTop: "50px",
						width: "80%",
						marginLeft: "40px",
					}}>
					<div className="serachcontainer">
						<input
							type="text"
							name=""
							id=""
							placeholder="Serach"
							className="search"
							value={searchTermOrder}
							onChange={handleSearchOrder}
						/>
						<IoSearchSharp size={33} className="serachicon" />
					</div>
					<div
						className="first"
						style={{ backgroundColor: "#fdf2e9", color: "rgb(27, 24, 27)" }}>
						<>
							<h3 className="h3-customer" style={{ color: "rgb(37, 31, 37)" }}>
								Order Data
							</h3>
						</>
						<table
							style={{ backgroundColor: "#fdf2e9", color: "rgb(27, 24, 27)" }}>
							<thead>
								<tr className="tr">
									<th className="th">Name</th>
									<th className="th">Email</th>
									<th className="th">products</th>
									<th className="th">Quantity</th>
									<th className="th">Total Amount</th>
									<th className="th">order_Refrence</th>
									<th className="th">Status</th>
									<th colSpan={2} className="th">
										Action
									</th>
								</tr>
							</thead>
							{orders.length == 0 && <h1 className="no">NO Order</h1>}
							<tbody>
								{orders?.map((data) => (
									<tr key={data.order_id} className="tr">
										<td className="td">
											{data.first_name + " " + data.last_name}
										</td>
										<td className="td">{data.customer_email}</td>
										<td className="td">{data.products}</td>
										<td className="td">{data.total_quantity}</td>
										<td className="td">{data.total_amount}</td>
										<td className="td">{data.transactionRef}</td>
										<td className="td">{data.status}</td>

										<td className="td">
											<button
												className="action"
												style={{
													backgroundColor:
														data.status === "Completed" ? "#1bb184" : "",
													width: "100%",
													fontWeight: 600,
													cursor:
														data.status === "Completed" ? "not-allowed" : "",
												}}
												onClick={() => {
													handleChangeStatus(data.order_id);
												}}
												disabled={data.status === "Completed"}>
												Complete Order
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			)}
		</div>
	);
}

export default Cashier;
