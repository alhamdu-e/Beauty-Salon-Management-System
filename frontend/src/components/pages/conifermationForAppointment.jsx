import React, { useEffect } from "react";
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

export default function ConfirmationAppointment() {
	const { setItems } = useCartContext();

	useEffect(() => {
		localStorage.removeItem("cart");
		setItems([]);
	}, []);
	const currentDate = new Date();
	const day = currentDate.getDate();
	const month = currentDate.getMonth() + 1; // Adding 1 because getMonth() returns zero-based month index
	const year = currentDate.getFullYear();

	// Ensure day and month have leading zeros if needed
	const formattedDay = day < 10 ? "0" + day : day;
	const formattedMonth = month < 10 ? "0" + month : month;

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
			marginBottom: "10px",
			color: "rgb(68, 155, 68)",
		},
		detailconfirm: {
			fontSize: "16px",
			color: "rgb(63, 61, 61)",
			display: "block",
			marginBottom: "25px",
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
	const MyDocument = () => (
		<Document>
			<Page>
				<Text style={style.checkmark}>&#10003;</Text>

				<Text style={style.sucessconfirm}>Payment successful!</Text>
				<Text style={style.detailconfirm}>
					Detail of Transaction Information
				</Text>

				<Text style={style.confirmprice}>
					<Text style={{ fontWeight: 900 }}>Customer Name:</Text>
					{localStorage.getItem("userName") +
						" " +
						localStorage.getItem("userLName")}
				</Text>
				<Text style={style.confirmprice}>
					<Text style={{ fontWeight: 900 }}> Customer Email:</Text>
					{localStorage.getItem("email")}
				</Text>
				<Text style={styles.confirmprice}>
					<Text style={{ fontWeight: 900 }}>Service Name: </Text>
					{localStorage.getItem("servicceName")}
				</Text>
				<Text style={styles.confirmprice}>
					<Text style={{ fontWeight: 900 }}> Appointment Date:</Text>
					{localStorage.getItem("appointDate")}
				</Text>
				<Text style={styles.confirmprice}>
					<Text style={{ fontWeight: 900 }}>Appointment Start Time:</Text>
					{localStorage.getItem("startTime")}
				</Text>
				<Text style={styles.confirmprice}>
					<Text style={{ fontWeight: 900 }}>Appointment End Time:</Text>
					{localStorage.getItem("endtime")}
				</Text>
				<Text style={styles.confirmprice}>
					<Text style={{ fontWeight: 900 }}>Total Price:</Text>
					{localStorage.getItem("serviccePrice")}
				</Text>
				<Text style={style.confirmprice}>
					<Text style={{ fontWeight: 900 }}>Transaction Ref:</Text>
					{localStorage.getItem("Appref")}
				</Text>
				<Text style={style.confirmprice}>
					<Text style={{ fontWeight: 900 }}>Transaction Date:</Text>
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
				<Text style={style.confirmprice}>
					<Text style={{ fontWeight: 600 }}>Customer Name:</Text>
					{localStorage.getItem("userName") +
						" " +
						localStorage.getItem("userLName")}
				</Text>
				<Text style={style.confirmprice}>
					<Text style={{ fontWeight: 600 }}>Customer Email:</Text>
					{localStorage.getItem("email")}
				</Text>
				<Text style={styles.confirmprice}>
					<Text style={{ fontWeight: 600 }}>Service Name: </Text>
					{localStorage.getItem("servicceName")}
				</Text>
				<Text style={styles.confirmprice}>
					<Text style={{ fontWeight: 600 }}>Appointment Date:</Text>
					{localStorage.getItem("appointDate")}
				</Text>
				<Text style={styles.confirmprice}>
					<Text style={{ fontWeight: 600 }}>Appointment Start Time:</Text>
					{localStorage.getItem("startTime")}
				</Text>
				<Text style={styles.confirmprice}>
					<Text style={{ fontWeight: 600 }}>Appointment End Time:</Text>
					{localStorage.getItem("endtime")}
				</Text>
				<Text style={styles.confirmprice}>
					<Text style={{ fontWeight: 600 }}>Total Price:</Text>
					{localStorage.getItem("serviccePrice")}
				</Text>
				<Text style={styles.confirmprice}>
					<Text style={{ fontWeight: 600 }}>Transaction Ref:</Text>
					{localStorage.getItem("Appref")}
				</Text>
				<Text style={styles.confirmprice}>
					<Text style={{ fontWeight: 600 }}>Transaction Date:</Text>
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
		<div className="container-confirm" style={{ paddingTop: "10px" }}>
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
						localStorage.removeItem("Appref");
						localStorage.removeItem("serviccePrice");
						localStorage.removeItem("endtime");
						localStorage.removeItem("startTime");
						localStorage.removeItem("appointDate");
						localStorage.removeItem("servicceName");
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
	);
}
