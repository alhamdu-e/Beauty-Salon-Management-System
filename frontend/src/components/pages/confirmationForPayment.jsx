import React, { useEffect, useState } from "react";
import "../../assets/styles/confirmation.css";
import { Link } from "react-router-dom";
import { useCartContext } from "../../context/cartcontext";
import {
	Page,
	Text,
	View,
	Document,
	StyleSheet,
	PDFDownloadLink,
	Image,
} from "@react-pdf/renderer";
import logo from "../pages/glowcity.png";

export default function Confirmation() {
	const { setItems } = useCartContext();

	useEffect(() => {
		localStorage.removeItem("cart");
		setItems([]);
	}, []);

	const [showFeedBack, setShowFeedBack] = useState(true);
	const [show, setShow] = useState(false);
	const [thanksMessage, setThanksMessage] = useState(false);
	const [feedback, setFeedback] = useState("");
	const currentDate = new Date();
	const day = currentDate.getDate();
	const month = currentDate.getMonth() + 1; // Adding 1 because getMonth() returns zero-based month index
	const year = currentDate.getFullYear();

	// Ensure day and month have leading zeros if needed
	const formattedDay = day < 10 ? "0" + day : day;
	const formattedMonth = month < 10 ? "0" + month : month;
	if (thanksMessage) {
		setTimeout(() => {
			setThanksMessage(false);
		}, 3000);
	}
	const formattedDate = `${formattedDay}-${formattedMonth}-${year}`;

	const style = StyleSheet.create({
		body: {
			backgroundColor: " rgb(243, 232, 232)",
			padding: "40px",
			borderRadius: "20px",
		},
		checkmark: {
			marginBottom: "40px",
			transform: "scale(1.4)",
			marginLeft: "110px",
			fontSize: "28px",
			fontWeight: 700,
			backgroundColor: "#038b0f",
			padding: "1rem 1.7rem",
			borderRadius: "50%",
			color: " #ebdbfe",
		},
		sucessconfirm: {
			display: "block",
			fontSize: "22px",
			marginTop: "20px",
			marginBottom: "20px",
			color: "rgb(68, 155, 68)",
		},
		detailconfirm: {
			fontSize: "16px",
			color: "rgb(63, 61, 61)",
			display: "block",
			marginBottom: "35px",
		},
		confirmprice: {
			display: "block",
			fontSize: "14px",
			marginBottom: "15px",
			color: "rgb(66, 66, 66)",
		},
	});

	const styles = StyleSheet.create({
		body: {
			backgroundColor: " rgb(255, 255, 255)",
		},
		checkmark: {
			marginBottom: "40px",
			transform: "scale(1.4)",
			marginLeft: "110px",
			fontSize: "28px",
			fontWeight: 700,
			backgroundColor: "#038b0f",
			padding: "1rem 1.7rem",
			borderRadius: "50%",
			color: " #ebdbfe",
		},
		sucessconfirm: {
			display: "block",
			fontSize: "22px",
			marginBottom: "20px",
			color: "rgb(49, 187, 49)",
			backgroundColor: "rgb(8, 14, 8)",
			padding: "20px 20px",
			marginLeft: "-150px",
			textAlign: "center",
		},
		detailconfirm: {
			fontSize: "16px",
			color: "rgb(54, 47, 47)",
			display: "block",
			marginBottom: "2px",
		},
		confirmprice: {
			display: "block",
			fontSize: "14px",
			marginBottom: "15px",
			color: "rgb(58, 48, 48)",
		},
		img: {
			width: "200px",
			height: "200px",
		},
	});

	const handleFeedBack = async (event) => {
		event.preventDefault();
		if (!feedback.trim()) {
			setShow(true);
			return;
		}
		const response = await fetch("http://127.0.0.1:5000/overallfeedback", {
			method: "post",
			headers: {
				"Content-type": "Application/json",
			},
			body: JSON.stringify({ feedback }),
		});
		if (response.ok) {
			setThanksMessage(true);
			setShowFeedBack(false);
		} else {
			setShowFeedBack(false);
			// naviaget("/serverError", { replace: true });
		}
	};
	const MyDocument = () => (
		<Document>
			<Page>
				<Text style={style.checkmark}>&#10003;</Text>

				<Text style={style.sucessconfirm}>Payment successful!</Text>
				<Text style={style.detailconfirm}>
					Detail of Transaction Information
				</Text>

				<Text style={style.confirmprice}>
					<Text style={{ fontWeight: 600 }}>Name:</Text>
					{localStorage.getItem("userName") +
						" " +
						localStorage.getItem("userLName")}
				</Text>
				<Text style={style.confirmprice}>
					<Text style={{ fontWeight: 600 }}>Email:</Text>
					{localStorage.getItem("email")}
				</Text>
				<Text style={style.confirmprice}>
					<Text style={{ fontWeight: 600 }}>Total Price:</Text>
					{localStorage.getItem("totalPrice")}
				</Text>
				<Text style={style.confirmprice}>
					<Text style={{ fontWeight: 600 }}>Quantity:</Text>
					{localStorage.getItem("totalQuantity")}
				</Text>
				<Text style={style.confirmprice}>
					<Text style={{ fontWeight: 600 }}>Transaction Id:</Text>
					{localStorage.getItem("ref")}
				</Text>
				<Text style={style.confirmprice}>
					<Text style={{ fontWeight: 600 }}>Date:</Text>
					{formattedDate}
				</Text>
			</Page>
		</Document>
	);

	const MyDocumens = () => (
		<Document>
			<Page
				style={{
					backgroundColor: "#e0d6d6",
					paddingLeft: "150px",
				}}>
				<Text style={styles.sucessconfirm}>Thanks For Using Glow City!</Text>
				<Text style={styles.detailconfirm}>
					Detail of Transaction Information
				</Text>
				<text
					style={{
						width: "226px",
						height: "2px",
						backgroundColor: "#797675",
						marginBottom: "35px",
					}}></text>
				<Text style={styles.confirmprice}>
					<Text style={{ fontWeight: 600 }}>Name:</Text>
					{localStorage.getItem("userName") +
						" " +
						localStorage.getItem("userLName")}
				</Text>
				<Text style={styles.confirmprice}>
					<Text style={{ fontWeight: 600 }}>Email:</Text>
					{localStorage.getItem("email")}
				</Text>
				<Text style={styles.confirmprice}>
					<Text style={{ fontWeight: 600 }}>Total Price:</Text>
					{localStorage.getItem("totalPrice")}
				</Text>
				<Text style={styles.confirmprice}>
					<Text style={{ fontWeight: 600 }}>Quantity:</Text>
					{localStorage.getItem("totalQuantity")}
				</Text>
				<Text style={styles.confirmprice}>
					<Text style={{ fontWeight: 600 }}>Transaction Id:</Text>
					{localStorage.getItem("ref")}
				</Text>
				<Text style={styles.confirmprice}>
					<Text style={{ fontWeight: 600 }}>Date:</Text>
					{formattedDate}
				</Text>
				<Text
					style={{
						fontSize: "24px",
						color: "rgb(58, 48, 48)",
						textTransform: "capitalize",
						marginTop: "40px",
					}}>
					Glow City The Best in the city!
				</Text>
			</Page>
		</Document>
	);

	return (
		<div>
			<div className="container-confirm">
				<div
					style={{
						backgroundColor: " rgb(243, 232, 232)",
						padding: "40px",
						borderRadius: "20px",
					}}>
					<MyDocument />
					<Link
						to="/"
						className="gohome"
						onClick={() => {
							localStorage.removeItem("totalPrice");
							localStorage.removeItem("totalQuantity");
							localStorage.removeItem("ref");
						}}>
						{" "}
						Go to Home
					</Link>
					<PDFDownloadLink
						document={<MyDocumens />}
						fileName="confirmation.pdf"
						style={{
							color: "rgb(248, 248, 248)",
							border: "none",
							backgroundColor: "rgb(97, 37, 3)",
							marginTop: "20px",
							padding: "12px",
							marginLeft: "20px",
							borderRadius: "8px",
							fontSize: "14px",
						}}>
						{({ blob, url, loading, error }) =>
							loading ? "Loading document..." : "Download PDF"
						}
					</PDFDownloadLink>
				</div>
			</div>
			{showFeedBack && (
				<div className="popup-container bck">
					<div className="popup">
						{show && (
							<p
								style={{ marginTop: "0px", marginBottom: "6px", color: "red" }}>
								Please fill the form
							</p>
						)}
						<form action="">
							<p style={{ marginTop: "0px", marginBottom: "6px" }}>
								Please Give Us FeedBack
							</p>
							<textarea
								name=""
								id=""
								required
								cols="35"
								rows="7"
								style={{ display: "block", marginBottom: "10px" }}
								className="overallfeedback"
								onChange={(event) =>
									setFeedback(event.target.value)
								}></textarea>
							<button
								style={{
									fontSize: "14px",
									padding: "14px 15px",
									cursor: "pointer",
									border: "none",
									color: "#fff",
									backgroundColor: "#3b7704",
								}}
								onClick={handleFeedBack}>
								{" "}
								Submit
							</button>
							<button
								style={{
									fontSize: "14px",
									padding: "14px 15px",
									cursor: "pointer",
									backgroundColor: "#773c04",
									marginLeft: "30px",
									border: "none",
									color: "#fff",
								}}
								onClick={() => {
									setShowFeedBack(false);
								}}>
								{" "}
								Not Now
							</button>
						</form>
					</div>
				</div>
			)}

			{thanksMessage && (
				<div className="popup-container bck">
					<div className="popup">
						<p style={{ marginTop: "0px", marginBottom: "6px" }}>
							Thank You for Your FeedBack
						</p>
					</div>
				</div>
			)}
		</div>
	);
}
