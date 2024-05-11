const express = require("express");
const cookieParser = require("cookie-parser");
const schedule = require("node-schedule");
require("dotenv").config();
const cors = require("cors");
const path = require("path");
const csrf = require("csurf");
const app = express();
const jwt = require("jsonwebtoken");
const request = require("request");
const sendEmail = require("./sendEmail.js");
const adminRoutes = require("./routes/admin.js");
const ProfesionalRoutes = require("./routes/profesional.js");
const autenticationRoute = require("./routes/aut.js");
const db = require("./database/connection.js");
const crypto = require("crypto");
app.use(express.json({ limit: "50mb" }));
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

const secreteKey = process.env.SECRET_KEY;
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

function generateRandomKey(length) {
	return crypto.randomBytes(length).toString("hex");
}
const authenticateToken = (req, res, next) => {
	const authHedr = req.headers["authorization"];
	const token = authHedr && authHedr.split(" ")[1];
	if (!token) return res.status(401).json({ error: "unauthorized" });
	jwt.verify(token, secreteKey, (err, user) => {
		if (err)
			return res.status(403).json({ auth: false, message: "Invalid Token" });
		next();
	});
};

// Initialize and use csurf middleware

// Use csurf middleware
const executeQuery = (sql, params = [], res, successMessage) => {
	db.query(sql, params, (err, result) => {
		if (err) {
			console.log(err);
			res.status(500).json({ message: "Database Erroe" });
		} else {
			// console.log(successMessage);
			res.status(200).json(result);
		}
	});
};
app.use(cookieParser());

// var myHeaders = new Headers();
// myHeaders.append(
// 	"Authorization",
// 	"Bearer CHASECK_TEST-zHKZRqbDbugj6X4dAVxF7AOFzYI8UKqm"
// );

// var requestOptions = {
// 	method: "GET",
// 	headers: myHeaders,
// 	redirect: "follow",
// };

// fetch("https://api.chapa.co/v1/banks", requestOptions)
// 	.then((response) => response.text())
// 	.then((result) => console.log(result))
// 	.catch((error) => console.log("error", error));

app.put("/cancelAppointment", (req, res) => {
	const randomKey = generateRandomKey(3);
	const transactionId = req.body.fname + "_" + randomKey;
	const appointmentId = req.body.id;
	console.log(req.body);
	var raw = JSON.stringify({
		account_name: req.body.fname + " " + req.body.lname,
		account_number: req.body.acc,
		amount: req.body.servicePrice,
		currency: "ETB",
		reference: transactionId,
		bank_code: req.body.SelectedBank,
	});
	var options = {
		method: "POST",
		url: "https://api.chapa.co/v1/transfers",
		headers: {
			Authorization: "Bearer CHASECK_TEST-zHKZRqbDbugj6X4dAVxF7AOFzYI8UKqm",
			"Content-Type": "application/json",
		},
		body: raw,
	};
	request(options, function (error, response) {
		if (error) {
			res.status(400).json({});
		} else {
			const data = JSON.parse(response.body);
			console.log(data);
			if (data.status == "success") {
				let sql = "update appointments set status ='Canceled' where id  = ?";
				executeQuery(sql, [appointmentId], res, "status Changed");
			} else {
				res.status(400).json({});
			}
		}
	});
});
app.get("/product", (req, res) => {
	const sql = "select * from product";

	executeQuery(sql, [], res, "ALL product RETRIVED");
});
let customerEmail = "";
let fname = "";
let lname = "";
let product = [];
let amount = "";
let transactionId = "";
let selectedProfessionalId = "";
let userId = "";
let date = "";
let startTime = "";
let endTime = "";
let serviceId = "";
let fullPrice = "";
let remaining = "";
app.post("/payment", (req, res) => {
	customerEmail = req.body.email;
	fname = req.body.fname;
	lname = req.body.lname;
	product = req.body.product;
	amount = req.body.amount;

	const randomKey = generateRandomKey(3);
	transactionId = req.body.fname + "_" + randomKey;
	const options = {
		method: "POST",
		url: "https://api.chapa.co/v1/transaction/initialize",
		headers: {
			Authorization: "Bearer CHASECK_TEST-zHKZRqbDbugj6X4dAVxF7AOFzYI8UKqm",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			amount: req.body.amount,
			currency: "ETB",
			email: req.body.email,
			first_name: req.body.fname,
			last_name: req.body.lname,
			phone_number: "0" + req.body.phone,
			tx_ref: transactionId,
			callback_url: "http://127.0.0.1:5000/verify",
			return_url: "http://localhost:3000/paymentconfirmarion",
			title: "Payment For  Glow City",
			description: "Glowcity the best in the City ",
			logo: "http://127.0.0.1:5000/images/11.jpg",
		}),
	};

	request(options, function (error, response) {
		if (error) {
			res.status(400).json({ notgood: false });
		} else {
			const data = JSON.parse(response.body);
			if (!data.data) {
				res.status(400).json({ notgood: false });
			}
			res.status(200).json({ url: data.data.checkout_url, ref: transactionId });
		}
	});
});

app.post("/appointment/payment", (req, res) => {
	console.log(req.body);
	customerEmail = req.body.email;
	fname = req.body.fname;
	lname = req.body.lname;
	amount = req.body.amount;
	selectedProfessionalId = req.body.selectedProfessionalId;
	userId = req.body.userId;
	date = req.body.date;
	startTime = req.body.startTime;
	endTime = req.body.endTime;
	serviceId = req.body.serviceId;
	fullPrice = req.body.servicePrice;
	remaining = fullPrice - amount;

	const randomKey = generateRandomKey(3);
	transactionId = req.body.fname + "_" + randomKey;
	const options = {
		method: "POST",
		url: "https://api.chapa.co/v1/transaction/initialize",
		headers: {
			Authorization: "Bearer CHASECK_TEST-zHKZRqbDbugj6X4dAVxF7AOFzYI8UKqm",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			amount: req.body.amount,
			currency: "ETB",
			email: req.body.email,
			first_name: req.body.fname,
			last_name: req.body.lname,
			phone_number: "0" + req.body.phone,
			tx_ref: transactionId,
			callback_url: "http://127.0.0.1:5000/verifyappoint",
			return_url: "http://localhost:3000/appointmentpaymentconfirmarion",
			title: "Payment for  Purchuasing Product from Glowcity",
			description: "Glowcity is the best in the City ",
		}),
	};

	request(options, function (error, response) {
		if (error) {
			console.log(error);
		} else {
			const data = JSON.parse(response.body);
			if (!data.data) {
				res.status(400).json({ notgood: false });
			}
			res.status(200).json({ url: data.data.checkout_url, ref: transactionId });
		}
	});
});

app.use("/verifyappoint", (req, res) => {
	const callback = function (error, data, response) {
		if (error) {
			console.error(error);
		} else {
			console.log("hello");
		}
	};

	const content = `<!DOCTYPE html>

	<html
		lang="en"
		xmlns:o="urn:schemas-microsoft-com:office:office"
		xmlns:v="urn:schemas-microsoft-com:vml">
		<head>
			<title></title>
			<meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
			<meta content="width=device-width, initial-scale=1.0" name="viewport" />
			<!--[if mso]>
				<xml>
					<o:OfficeDocumentSettings>
						<o:PixelsPerInch>96</o:PixelsPerInch>
						<o:AllowPNG />
					</o:OfficeDocumentSettings>
				</xml>
			<![endif]-->
			<!--[if !mso]><!-->
			<link
				href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900"
				rel="stylesheet"
				type="text/css" />
			<!--<![endif]-->
			<style>
				* {
					box-sizing: border-box;
				}
	
				body {
					margin: 0;
					padding: 0;
				}
	
				a[x-apple-data-detectors] {
					color: inherit !important;
					text-decoration: inherit !important;
				}
	
				#MessageViewBody a {
					color: inherit;
					text-decoration: none;
				}
	
				p {
					line-height: inherit;
				}
	
				.desktop_hide,
				.desktop_hide table {
					mso-hide: all;
					display: none;
					max-height: 0px;
					overflow: hidden;
				}
	
				.image_block img + div {
					display: none;
				}
	
				@media (max-width: 700px) {
					.desktop_hide table.icons-inner {
						display: inline-block !important;
					}
	
					.icons-inner {
						text-align: center;
					}
	
					.icons-inner td {
						margin: 0 auto;
					}
	
					.mobile_hide {
						display: none;
					}
	
					.row-content {
						width: 100% !important;
					}
	
					.stack .column {
						width: 100%;
						display: block;
					}
	
					.mobile_hide {
						min-height: 0;
						max-height: 0;
						max-width: 0;
						overflow: hidden;
						font-size: 0px;
					}
	
					.desktop_hide,
					.desktop_hide table {
						display: table !important;
						max-height: none !important;
					}
	
					.row-1 .column-1 .block-1.heading_block h2,
					.row-1 .column-1 .block-3.heading_block h1,
					.row-1 .column-1 .block-4.heading_block h1 {
						font-size: 39px !important;
					}
				}
			</style>
		</head>
		<body
			style="
				background-color: #12141d;
				margin: 0;
				padding: 0;
				-webkit-text-size-adjust: none;
				text-size-adjust: none;
			">
			<table
				border="0"
				cellpadding="0"
				cellspacing="0"
				class="nl-container"
				role="presentation"
				style="
					mso-table-lspace: 0pt;
					mso-table-rspace: 0pt;
					background-color: #12141d;
				"
				width="100%">
				<tbody>
					<tr>
						<td>
							<table
								align="center"
								border="0"
								cellpadding="0"
								cellspacing="0"
								class="row row-1"
								role="presentation"
								style="
									mso-table-lspace: 0pt;
									mso-table-rspace: 0pt;
									background-color: #fdf2e9;
								"
								width="100%">
								<tbody>
									<tr>
										<td>
											<table
												align="center"
												border="0"
												cellpadding="0"
												cellspacing="0"
												class="row-content stack"
												role="presentation"
												style="
													mso-table-lspace: 0pt;
													mso-table-rspace: 0pt;
													border-radius: 0;
													color: #000000;
													width: 680px;
													margin: 0 auto;
												"
												width="680">
												<tbody>
													<tr>
														<td
															class="column column-1"
															style="
																mso-table-lspace: 0pt;
																mso-table-rspace: 0pt;
																font-weight: 400;
																text-align: left;
																padding-bottom: 40px;
																padding-top: 15px;
																vertical-align: top;
																border-top: 0px;
																border-right: 0px;
																border-bottom: 0px;
																border-left: 0px;
															"
															width="100%">
															<table
																border="0"
																cellpadding="0"
																cellspacing="0"
																class="heading_block block-1"
																role="presentation"
																style="
																	mso-table-lspace: 0pt;
																	mso-table-rspace: 0pt;
																"
																width="100%">
																<tr>
																	<td
																		class="pad"
																		style="
																			padding-bottom: 10px;
																			padding-top: 10px;
																			text-align: center;
																			width: 100%;
																		">
																		<h2
																			style="
																				margin: 0;
																				color: #12141d;
																				direction: ltr;
																				font-family: Montserrat, Trebuchet MS,
																					Lucida Grande, Lucida Sans Unicode,
																					Lucida Sans, Tahoma, sans-serif;
																				font-size: 30px;
																				font-weight: 700;
																				letter-spacing: normal;
																				line-height: 120%;
																				text-align: left;
																				margin-top: 0;
																				margin-bottom: 0;
																				mso-line-height-alt: 36px;
																			">
																			<span class="tinyMce-placeholder">
																				GlowCity
																			</span>
																		</h2>
																	</td>
																</tr>
															</table>
															<div
																class="spacer_block block-2"
																style="
																	height: 40px;
																	line-height: 40px;
																	font-size: 1px;
																">
																 
															</div>
															<table
																border="0"
																cellpadding="0"
																cellspacing="0"
																class="heading_block block-3"
																role="presentation"
																style="
																	mso-table-lspace: 0pt;
																	mso-table-rspace: 0pt;
																"
																width="100%">
																<tr>
																	<td
																		class="pad"
																		style="
																			padding-bottom: 25px;
																			padding-left: 10px;
																			padding-right: 10px;
																			padding-top: 10px;
																			text-align: center;
																			width: 100%;
																		">
																		<h1
																			style="
																				margin: 0;
																				color: #12141d;
																				direction: ltr;
																				font-family: Montserrat, Trebuchet MS,
																					Lucida Grande, Lucida Sans Unicode,
																					Lucida Sans, Tahoma, sans-serif;
																				font-size: 20px;
																				font-weight: 700;
																				letter-spacing: normal;
																				line-height: 120%;
																				text-align: center;
																				margin-top: 0;
																				margin-bottom: 0;
																				mso-line-height-alt: 24px;
																			">
																			Appointment Confirmed
																		</h1>
																	</td>
																</tr>
															</table>
															<table
																border="0"
																cellpadding="10"
																cellspacing="0"
																class="heading_block block-4"
																role="presentation"
																style="
																	mso-table-lspace: 0pt;
																	mso-table-rspace: 0pt;
																"
																width="100%">
																<tr>
																	<td class="pad">
																		<h1
																			style="
																				margin: 0;
																				color: #12141d;
																				direction: ltr;
																				font-family: Montserrat, Trebuchet MS,
																					Lucida Grande, Lucida Sans Unicode,
																					Lucida Sans, Tahoma, sans-serif;
																				font-size: 18px;
																				font-weight: 400;
																				letter-spacing: normal;
																				line-height: 150%;
																				text-align: center;
																				margin-top: 0;
																				margin-bottom: 0;
																				mso-line-height-alt: 21.599999999999998px;
																			">
																			We are delighted to confirm your upcoming
																			appointment with
																			<strong>GlowCity</strong>
																			. We appreciate your trust in our services
																			and look forward to providing you with an
																			exceptional experience.
																		</h1>
																	</td>
																</tr>
															</table>
															<div
																class="spacer_block block-5"
																style="
																	height: 20px;
																	line-height: 20px;
																	font-size: 1px;
																">
																 
															</div>
															<table
																border="0"
																cellpadding="0"
																cellspacing="0"
																class="button_block block-6"
																role="presentation"
																style="
																	mso-table-lspace: 0pt;
																	mso-table-rspace: 0pt;
																"
																width="100%">
																<tr>
																	<td
																		class="pad"
																		style="
																			padding-left: 10px;
																			padding-right: 10px;
																			text-align: center;
																		">
																		<div align="center" class="alignment">
																			<!--[if mso]>
	<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="http://localhost:3000/" style="height:46px;width:232px;v-text-anchor:middle;" arcsize="29%" stroke="false" fillcolor="#1c8843">
	<w:anchorlock/>
	<v:textbox inset="0px,0px,0px,0px">
	<center style="color:#ffffff; font-family:Tahoma, sans-serif; font-size:18px">
	<![endif]-->
																			<p
																				href="#"
																				style="
																					text-decoration: none;
																					display: inline-block;
																					color: #0f0a0a;
																					border-radius: 13px;
																					width: auto;
																					border-top: 0px solid #12141d;
																					font-weight: 400;
																					border-right: 0px solid #12141d;
																					border-bottom: 0px solid #12141d;
																					border-left: 0px solid #12141d;
																					padding-bottom: 5px;
																					font-family: Montserrat, Trebuchet MS,
																						Lucida Grande, Lucida Sans Unicode,
																						Lucida Sans, Tahoma, sans-serif;
																					font-size: 18px;
																					text-align: center;
																					mso-border-alt: none;
																					word-break: keep-all;
																				"
																				target="_blank">
																				<span
																					style="
																						padding-left: 20px;
																						padding-right: 20px;
																						font-size: 18px;
																						display: inline-block;
																						letter-spacing: normal;
																					">
																					<span
																						style="
																							word-break: break-word;
																							line-height: 36px;
																						">
																						Transaction Id:${transactionId}
																					</span>
																				</span>
																			</p>
																			<!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
																		</div>
																	</td>
																</tr>
															</table>
														</td>
													</tr>
												</tbody>
											</table>
										</td>
									</tr>
								</tbody>
							</table>
							<table
								align="center"
								border="0"
								cellpadding="0"
								cellspacing="0"
								class="row row-2"
								role="presentation"
								style="
									mso-table-lspace: 0pt;
									mso-table-rspace: 0pt;
									background-color: #ffffff;
								"
								width="100%">
								<tbody>
									<tr>
										<td>
											<table
												align="center"
												border="0"
												cellpadding="0"
												cellspacing="0"
												class="row-content stack"
												role="presentation"
												style="
													mso-table-lspace: 0pt;
													mso-table-rspace: 0pt;
													background-color: #ffffff;
													color: #000000;
													width: 680px;
													margin: 0 auto;
												"
												width="680">
												<tbody>
													<tr>
														<td
															class="column column-1"
															style="
																mso-table-lspace: 0pt;
																mso-table-rspace: 0pt;
																font-weight: 400;
																text-align: left;
																padding-bottom: 5px;
																padding-top: 5px;
																vertical-align: top;
																border-top: 0px;
																border-right: 0px;
																border-bottom: 0px;
																border-left: 0px;
															"
															width="100%">
															<table
																border="0"
																cellpadding="0"
																cellspacing="0"
																class="icons_block block-1"
																role="presentation"
																style="
																	mso-table-lspace: 0pt;
																	mso-table-rspace: 0pt;
																	text-align: center;
																"
																width="100%">
																<tr>
																	<td
																		class="pad"
																		style="
																			vertical-align: middle;
																			color: #1e0e4b;
																			font-family: 'Inter', sans-serif;
																			font-size: 15px;
																			padding-bottom: 5px;
																			padding-top: 5px;
																			text-align: center;
																		">
																		<table
																			cellpadding="0"
																			cellspacing="0"
																			role="presentation"
																			style="
																				mso-table-lspace: 0pt;
																				mso-table-rspace: 0pt;
																			"
																			width="100%">
																			<tr>
																				<td
																					class="alignment"
																					style="
																						vertical-align: middle;
																						text-align: center;
																					">
																					<!--[if vml]><table align="center" cellpadding="0" cellspacing="0" role="presentation" style="display:inline-block;padding-left:0px;padding-right:0px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"><![endif]-->
																					<!--[if !vml]><!-->
																					<table
																						cellpadding="0"
																						cellspacing="0"
																						class="icons-inner"
																						role="presentation"
																						style="
																							mso-table-lspace: 0pt;
																							mso-table-rspace: 0pt;
																							display: inline-block;
																							margin-right: -4px;
																							padding-left: 0px;
																							padding-right: 0px;
																						">
																						<!--<![endif]-->
																					</table>
																				</td>
																			</tr>
																		</table>
																	</td>
																</tr>
															</table>
														</td>
													</tr>
												</tbody>
											</table>
										</td>
									</tr>
								</tbody>
							</table>
						</td>
					</tr>
				</tbody>
			</table>
			<!-- End -->
		</body>
	</html>
	`;

	sendEmail(customerEmail, callback, content);
	const sql =
		"insert into appointments (customerId,professionalId,appointmentDate,startTime,endTime,serviceId,Tref,status,price,remaining,paidPrice) values (?,?,?,?,?,?,?,?,?,?,?)";
	const param = [
		userId,
		selectedProfessionalId,
		date,
		startTime,
		endTime,
		serviceId,
		transactionId,
		"In Progress",
		fullPrice,
		remaining,
		amount,
	];
	db.query(sql, param, (err, result) => {
		if (err) {
			res.redirect("http://localhost:3000/serverError");
		} else {
			res.status(200).json();
			//redirect("http://localhost:3000/appointmentpaymentconfirmarion");
		}
	});
});

app.use("/verify", (req, res) => {
	const callback = function (error, data, response) {
		if (error) {
			console.error(error);
		} else {
			console.log("hello");
		}
	};

	const content = `<!DOCTYPE html>

	<html
		lang="en"
		xmlns:o="urn:schemas-microsoft-com:office:office"
		xmlns:v="urn:schemas-microsoft-com:vml">
		<head>
			<title></title>
			<meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
			<meta content="width=device-width, initial-scale=1.0" name="viewport" />
			<!--[if mso]>
				<xml>
					<o:OfficeDocumentSettings>
						<o:PixelsPerInch>96</o:PixelsPerInch>
						<o:AllowPNG />
					</o:OfficeDocumentSettings>
				</xml>
			<![endif]-->
			<!--[if !mso]><!-->
			<link
				href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900"
				rel="stylesheet"
				type="text/css" />
			<!--<![endif]-->
			<style>
				* {
					box-sizing: border-box;
				}
	
				body {
					margin: 0;
					padding: 0;
				}
	
				a[x-apple-data-detectors] {
					color: inherit !important;
					text-decoration: inherit !important;
				}
	
				#MessageViewBody a {
					color: inherit;
					text-decoration: none;
				}
	
				p {
					line-height: inherit;
				}
	
				.desktop_hide,
				.desktop_hide table {
					mso-hide: all;
					display: none;
					max-height: 0px;
					overflow: hidden;
				}
	
				.image_block img + div {
					display: none;
				}
	
				@media (max-width: 700px) {
					.desktop_hide table.icons-inner {
						display: inline-block !important;
					}
	
					.icons-inner {
						text-align: center;
					}
	
					.icons-inner td {
						margin: 0 auto;
					}
	
					.mobile_hide {
						display: none;
					}
	
					.row-content {
						width: 100% !important;
					}
	
					.stack .column {
						width: 100%;
						display: block;
					}
	
					.mobile_hide {
						min-height: 0;
						max-height: 0;
						max-width: 0;
						overflow: hidden;
						font-size: 0px;
					}
	
					.desktop_hide,
					.desktop_hide table {
						display: table !important;
						max-height: none !important;
					}
	
					.row-1 .column-1 .block-1.heading_block h2,
					.row-1 .column-1 .block-3.heading_block h1,
					.row-1 .column-1 .block-4.heading_block h1 {
						font-size: 39px !important;
					}
				}
			</style>
		</head>
		<body
			style="
				background-color: #12141d;
				margin: 0;
				padding: 0;
				-webkit-text-size-adjust: none;
				text-size-adjust: none;
			">
			<table
				border="0"
				cellpadding="0"
				cellspacing="0"
				class="nl-container"
				role="presentation"
				style="
					mso-table-lspace: 0pt;
					mso-table-rspace: 0pt;
					background-color: #12141d;
				"
				width="100%">
				<tbody>
					<tr>
						<td>
							<table
								align="center"
								border="0"
								cellpadding="0"
								cellspacing="0"
								class="row row-1"
								role="presentation"
								style="
									mso-table-lspace: 0pt;
									mso-table-rspace: 0pt;
									background-color: #fdf2e9;
								"
								width="100%">
								<tbody>
									<tr>
										<td>
											<table
												align="center"
												border="0"
												cellpadding="0"
												cellspacing="0"
												class="row-content stack"
												role="presentation"
												style="
													mso-table-lspace: 0pt;
													mso-table-rspace: 0pt;
													border-radius: 0;
													color: #000000;
													width: 680px;
													margin: 0 auto;
												"
												width="680">
												<tbody>
													<tr>
														<td
															class="column column-1"
															style="
																mso-table-lspace: 0pt;
																mso-table-rspace: 0pt;
																font-weight: 400;
																text-align: left;
																padding-bottom: 40px;
																padding-top: 15px;
																vertical-align: top;
																border-top: 0px;
																border-right: 0px;
																border-bottom: 0px;
																border-left: 0px;
															"
															width="100%">
															<table
																border="0"
																cellpadding="0"
																cellspacing="0"
																class="heading_block block-1"
																role="presentation"
																style="
																	mso-table-lspace: 0pt;
																	mso-table-rspace: 0pt;
																"
																width="100%">
																<tr>
																	<td
																		class="pad"
																		style="
																			padding-bottom: 10px;
																			padding-top: 10px;
																			text-align: center;
																			width: 100%;
																		">
																		<h2
																			style="
																				margin: 0;
																				color: #12141d;
																				direction: ltr;
																				font-family: Montserrat, Trebuchet MS,
																					Lucida Grande, Lucida Sans Unicode,
																					Lucida Sans, Tahoma, sans-serif;
																				font-size: 30px;
																				font-weight: 700;
																				letter-spacing: normal;
																				line-height: 120%;
																				text-align: left;
																				margin-top: 0;
																				margin-bottom: 0;
																				mso-line-height-alt: 36px;
																			">
																			<span class="tinyMce-placeholder">
																				GlowCity
																			</span>
																		</h2>
																	</td>
																</tr>
															</table>
															<div
																class="spacer_block block-2"
																style="
																	height: 40px;
																	line-height: 40px;
																	font-size: 1px;
																">
																 
															</div>
															<table
																border="0"
																cellpadding="0"
																cellspacing="0"
																class="heading_block block-3"
																role="presentation"
																style="
																	mso-table-lspace: 0pt;
																	mso-table-rspace: 0pt;
																"
																width="100%">
																<tr>
																	<td
																		class="pad"
																		style="
																			padding-bottom: 25px;
																			padding-left: 10px;
																			padding-right: 10px;
																			padding-top: 10px;
																			text-align: center;
																			width: 100%;
																		">
																		<h1
																			style="
																				margin: 0;
																				color: #12141d;
																				direction: ltr;
																				font-family: Montserrat, Trebuchet MS,
																					Lucida Grande, Lucida Sans Unicode,
																					Lucida Sans, Tahoma, sans-serif;
																				font-size: 20px;
																				font-weight: 700;
																				letter-spacing: normal;
																				line-height: 120%;
																				text-align: center;
																				margin-top: 0;
																				margin-bottom: 0;
																				mso-line-height-alt: 24px;
																			">
																			Order Confirmed
																		</h1>
																	</td>
																</tr>
															</table>
															<table
																border="0"
																cellpadding="10"
																cellspacing="0"
																class="heading_block block-4"
																role="presentation"
																style="
																	mso-table-lspace: 0pt;
																	mso-table-rspace: 0pt;
																"
																width="100%">
																<tr>
																	<td class="pad">
																		<h1
																			style="
																				margin: 0;
																				color: #12141d;
																				direction: ltr;
																				font-family: Montserrat, Trebuchet MS,
																					Lucida Grande, Lucida Sans Unicode,
																					Lucida Sans, Tahoma, sans-serif;
																				font-size: 18px;
																				font-weight: 400;
																				letter-spacing: normal;
																				line-height: 150%;
																				text-align: center;
																				margin-top: 0;
																				margin-bottom: 0;
																				mso-line-height-alt: 21.599999999999998px;
																			">
																			We are pleased to inform you that your order
																			#123456 has been successfully processed and
																			confirmed. Thank you for choosing our store
																			for your purchase.
																		</h1>
																	</td>
																</tr>
															</table>
															<div
																class="spacer_block block-5"
																style="
																	height: 20px;
																	line-height: 20px;
																	font-size: 1px;
																">
																 
															</div>
															<table
																border="0"
																cellpadding="0"
																cellspacing="0"
																class="button_block block-6"
																role="presentation"
																style="
																	mso-table-lspace: 0pt;
																	mso-table-rspace: 0pt;
																"
																width="100%">
																<tr>
																	<td
																		class="pad"
																		style="
																			padding-left: 10px;
																			padding-right: 10px;
																			text-align: center;
																		">
																		<div align="center" class="alignment">
																			<!--[if mso]>
	<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="http://localhost:3000/" style="height:46px;width:232px;v-text-anchor:middle;" arcsize="29%" stroke="false" fillcolor="#1c8843">
	<w:anchorlock/>
	<v:textbox inset="0px,0px,0px,0px">
	<center style="color:#ffffff; font-family:Tahoma, sans-serif; font-size:18px">
	<![endif]-->
																			<p
																				href="#"
																				style="
																					text-decoration: none;
																					display: inline-block;
																					color: #0f0a0a;
																					border-radius: 13px;
																					width: auto;
																					border-top: 0px solid #12141d;
																					font-weight: 400;
																					border-right: 0px solid #12141d;
																					border-bottom: 0px solid #12141d;
																					border-left: 0px solid #12141d;
																					padding-bottom: 5px;
																					font-family: Montserrat, Trebuchet MS,
																						Lucida Grande, Lucida Sans Unicode,
																						Lucida Sans, Tahoma, sans-serif;
																					font-size: 18px;
																					text-align: center;
																					mso-border-alt: none;
																					word-break: keep-all;
																				"
																				target="_blank">
																				<span
																					style="
																						padding-left: 20px;
																						padding-right: 20px;
																						font-size: 18px;
																						display: inline-block;
																						letter-spacing: normal;
																					">
																					<span
																						style="
																							word-break: break-word;
																							line-height: 36px;
																						">
																						Transaction Id:${transactionId}
																					</span>
																				</span>
																			</p>
																			<!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
																		</div>
																	</td>
																</tr>
															</table>
														</td>
													</tr>
												</tbody>
											</table>
										</td>
									</tr>
								</tbody>
							</table>
							<table
								align="center"
								border="0"
								cellpadding="0"
								cellspacing="0"
								class="row row-2"
								role="presentation"
								style="
									mso-table-lspace: 0pt;
									mso-table-rspace: 0pt;
									background-color: #ffffff;
								"
								width="100%">
								<tbody>
									<tr>
										<td>
											<table
												align="center"
												border="0"
												cellpadding="0"
												cellspacing="0"
												class="row-content stack"
												role="presentation"
												style="
													mso-table-lspace: 0pt;
													mso-table-rspace: 0pt;
													background-color: #ffffff;
													color: #000000;
													width: 680px;
													margin: 0 auto;
												"
												width="680">
												<tbody>
													<tr>
														<td
															class="column column-1"
															style="
																mso-table-lspace: 0pt;
																mso-table-rspace: 0pt;
																font-weight: 400;
																text-align: left;
																padding-bottom: 5px;
																padding-top: 5px;
																vertical-align: top;
																border-top: 0px;
																border-right: 0px;
																border-bottom: 0px;
																border-left: 0px;
															"
															width="100%">
															<table
																border="0"
																cellpadding="0"
																cellspacing="0"
																class="icons_block block-1"
																role="presentation"
																style="
																	mso-table-lspace: 0pt;
																	mso-table-rspace: 0pt;
																	text-align: center;
																"
																width="100%">
																<tr>
																	<td
																		class="pad"
																		style="
																			vertical-align: middle;
																			color: #1e0e4b;
																			font-family: 'Inter', sans-serif;
																			font-size: 15px;
																			padding-bottom: 5px;
																			padding-top: 5px;
																			text-align: center;
																		">
																		<table
																			cellpadding="0"
																			cellspacing="0"
																			role="presentation"
																			style="
																				mso-table-lspace: 0pt;
																				mso-table-rspace: 0pt;
																			"
																			width="100%">
																			<tr>
																				<td
																					class="alignment"
																					style="
																						vertical-align: middle;
																						text-align: center;
																					">
																					<!--[if vml]><table align="center" cellpadding="0" cellspacing="0" role="presentation" style="display:inline-block;padding-left:0px;padding-right:0px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"><![endif]-->
																					<!--[if !vml]><!-->
																					<table
																						cellpadding="0"
																						cellspacing="0"
																						class="icons-inner"
																						role="presentation"
																						style="
																							mso-table-lspace: 0pt;
																							mso-table-rspace: 0pt;
																							display: inline-block;
																							margin-right: -4px;
																							padding-left: 0px;
																							padding-right: 0px;
																						">
																						<!--<![endif]-->
																					</table>
																				</td>
																			</tr>
																		</table>
																	</td>
																</tr>
															</table>
														</td>
													</tr>
												</tbody>
											</table>
										</td>
									</tr>
								</tbody>
							</table>
						</td>
					</tr>
				</tbody>
			</table>
			<!-- End -->
		</body>
	</html>
	`;

	sendEmail(customerEmail, callback, content);
	const orderQuery =
		"INSERT INTO orders (customer_email, first_name, last_name, total_amount,transactionRef, status) VALUES (?, ?, ?, ?, ?,?)";
	const orderValues = [
		customerEmail,
		fname,
		lname,
		amount,
		transactionId,
		"Pending",
	];
	db.query(orderQuery, orderValues, (err, results) => {
		if (err) {
			console.error("Error inserting order:", err);
			res.status(500).json({ error: "Failed to insert order" });
			return;
		}
		const orderdID = results.insertId;
		const orderItemsQuery =
			"INSERT INTO order_items (order_id, product_name, quantity) VALUES (?, ?, ?)";
		product.forEach((item) => {
			const { productname, quantity } = item;
			const orderItemsValues = [orderdID, productname, quantity];
			db.query(orderItemsQuery, orderItemsValues, (err) => {
				if (err) {
					console.error("Error inserting order item:", err);
					res.status(500).json({ error: "Failed to insert order item" });
					return;
				}
			});
			db.query(
				"delete from cart where cart_id=?",
				[item.cart_id],
				(err, res) => {
					if (err) {
						console.error("Error deleting Cart item:", err);
						res.status(500).json({ error: "Failed to insert order item" });
						return;
					}
				}
			);
			db.query(
				"UPDATE product SET quantity = quantity - ? WHERE productname = ?",
				[quantity, productname],
				(err, result) => {
					if (err) {
						console.log(err);
					} else {
						console.log(result);
					}
				}
			);
		});
		res.status(200).json({ succed: true });
		//res.redirect("http://localhost:3000/paymentconfirmarion");
	});
});

app.get("/getCart/:id", (req, res) => {
	const userId = req.params.id;

	const sql =
		" SELECT  product.productimage,product.productname, product.productprice,product.id ,cart.quantity,cart_id,cart.customer_id FROM cart INNER JOIN product ON cart.product_id = product.id WHERE cart.customer_id = ?";
	db.query(sql, [userId], (err, result) => {
		if (err) {
			console.log(err);
			return;
		}
		if (result) {
			console.log(result, "hhhh");
			res.status(200).json(result);
		}
	});
});
app.post("/addtocart/:id", (req, res) => {
	console.log("hhh");
	const sql =
		"insert into cart(customer_id,product_id,quantity) values (?, ?, ?)";
	const product = req.params.id;
	const userId = req.body.userId;
	console.log(userId, product);
	db.query(sql, [userId, product, 1], (err, result) => {
		console.log("hhdhfj");
		if (err) {
			console.log(err);
			return;
		}
		if (result.affectedRows > 0) {
			console.log(userId);
			const sql =
				" SELECT  product.productimage,product.productname, product.productprice,product.id,cart.quantity,cart_id,cart.customer_id  FROM cart INNER JOIN product ON cart.product_id = product.id WHERE cart.customer_id = ?";
			db.query(sql, [userId], (err, result) => {
				if (err) {
					console.log(err);
					return;
				}
				if (result.length > 0) {
					console.log(result);
					res.status(200).json(result);
				}
			});
		}
	});
});

app.get("/product/:id", (req, res) => {
	const product = req.params.id;
	const sql = "select * from product where id =?";
	executeQuery(sql, [product], res, "single product retrived");
});

const getRemainingDays = (appointmentDateStr) => {
	const parts = appointmentDateStr.split("/");
	const day = parseInt(parts[0], 10);
	const month = parseInt(parts[1], 10);
	const year = parseInt(parts[2], 10);
	const appointmentDate = new Date(year, month - 1, day); // Month is 0-based in JavaScript Date

	// Calculate remaining days
	const currentDate = new Date();
	const remainingTime = appointmentDate.getTime() - currentDate.getTime();
	const remainingDays = Math.ceil(remainingTime / (1000 * 60 * 60 * 24));
	return remainingDays;
};

const fetchAppointments = () => {
	return new Promise((resolve, reject) => {
		const sql =
			"SELECT appointments.*, users.email AS userEmail FROM appointments INNER JOIN users ON appointments.customerId = users.id";
		db.query(sql, (err, result) => {
			if (err) {
				reject(err);
			} else {
				resolve(result);
			}
		});
	});
};
const emailSentFlags = {};
const scheduleEmailJob = () => {
	schedule.scheduleJob("* * * * *", async () => {
		// Check every day
		try {
			const callback = function (error, data, response) {
				if (error) {
					console.error(error, "conn");
				} else {
					console.log("hello,user");
				}
			};

			const content = `<!DOCTYPE html>

			<html
				lang="en"
				xmlns:o="urn:schemas-microsoft-com:office:office"
				xmlns:v="urn:schemas-microsoft-com:vml">
				<head>
					<title></title>
					<meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
					<meta content="width=device-width, initial-scale=1.0" name="viewport" />
					<!--[if mso]>
						<xml>
							<o:OfficeDocumentSettings>
								<o:PixelsPerInch>96</o:PixelsPerInch>
								<o:AllowPNG />
							</o:OfficeDocumentSettings>
						</xml>
					<![endif]-->
					<!--[if !mso]><!-->
					<link
						href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900"
						rel="stylesheet"
						type="text/css" />
					<!--<![endif]-->
					<style>
						* {
							box-sizing: border-box;
						}
			
						body {
							margin: 0;
							padding: 0;
						}
			
						a[x-apple-data-detectors] {
							color: inherit !important;
							text-decoration: inherit !important;
						}
			
						#MessageViewBody a {
							color: inherit;
							text-decoration: none;
						}
			
						p {
							line-height: inherit;
						}
			
						.desktop_hide,
						.desktop_hide table {
							mso-hide: all;
							display: none;
							max-height: 0px;
							overflow: hidden;
						}
			
						.image_block img + div {
							display: none;
						}
			
						@media (max-width: 700px) {
							.desktop_hide table.icons-inner {
								display: inline-block !important;
							}
			
							.icons-inner {
								text-align: center;
							}
			
							.icons-inner td {
								margin: 0 auto;
							}
			
							.mobile_hide {
								display: none;
							}
			
							.row-content {
								width: 100% !important;
							}
			
							.stack .column {
								width: 100%;
								display: block;
							}
			
							.mobile_hide {
								min-height: 0;
								max-height: 0;
								max-width: 0;
								overflow: hidden;
								font-size: 0px;
							}
			
							.desktop_hide,
							.desktop_hide table {
								display: table !important;
								max-height: none !important;
							}
			
							.row-1 .column-1 .block-1.heading_block h2,
							.row-1 .column-1 .block-3.heading_block h1,
							.row-1 .column-1 .block-4.heading_block h1 {
								font-size: 39px !important;
							}
						}
					</style>
				</head>
				<body
					style="
						background-color: #12141d;
						margin: 0;
						padding: 0;
						-webkit-text-size-adjust: none;
						text-size-adjust: none;
					">
					<table
						border="0"
						cellpadding="0"
						cellspacing="0"
						class="nl-container"
						role="presentation"
						style="
							mso-table-lspace: 0pt;
							mso-table-rspace: 0pt;
							background-color: #12141d;
						"
						width="100%">
						<tbody>
							<tr>
								<td>
									<table
										align="center"
										border="0"
										cellpadding="0"
										cellspacing="0"
										class="row row-1"
										role="presentation"
										style="
											mso-table-lspace: 0pt;
											mso-table-rspace: 0pt;
											background-color: #fdf2e9;
										"
										width="100%">
										<tbody>
											<tr>
												<td>
													<table
														align="center"
														border="0"
														cellpadding="0"
														cellspacing="0"
														class="row-content stack"
														role="presentation"
														style="
															mso-table-lspace: 0pt;
															mso-table-rspace: 0pt;
															border-radius: 0;
															color: #000000;
															width: 680px;
															margin: 0 auto;
														"
														width="680">
														<tbody>
															<tr>
																<td
																	class="column column-1"
																	style="
																		mso-table-lspace: 0pt;
																		mso-table-rspace: 0pt;
																		font-weight: 400;
																		text-align: left;
																		padding-bottom: 40px;
																		padding-top: 15px;
																		vertical-align: top;
																		border-top: 0px;
																		border-right: 0px;
																		border-bottom: 0px;
																		border-left: 0px;
																	"
																	width="100%">
																	<table
																		border="0"
																		cellpadding="0"
																		cellspacing="0"
																		class="heading_block block-1"
																		role="presentation"
																		style="
																			mso-table-lspace: 0pt;
																			mso-table-rspace: 0pt;
																		"
																		width="100%">
																		<tr>
																			<td
																				class="pad"
																				style="
																					padding-bottom: 10px;
																					padding-top: 10px;
																					text-align: center;
																					width: 100%;
																				">
																				<h2
																					style="
																						margin: 0;
																						color: #12141d;
																						direction: ltr;
																						font-family: Montserrat, Trebuchet MS,
																							Lucida Grande, Lucida Sans Unicode,
																							Lucida Sans, Tahoma, sans-serif;
																						font-size: 30px;
																						font-weight: 700;
																						letter-spacing: normal;
																						line-height: 120%;
																						text-align: left;
																						margin-top: 0;
																						margin-bottom: 0;
																						mso-line-height-alt: 36px;
																					">
																					<span class="tinyMce-placeholder">
																						GlowCity
																					</span>
																				</h2>
																			</td>
																		</tr>
																	</table>
																	<div
																		class="spacer_block block-2"
																		style="
																			height: 40px;
																			line-height: 40px;
																			font-size: 1px;
																		">
																		 
																	</div>
																	<table
																		border="0"
																		cellpadding="0"
																		cellspacing="0"
																		class="heading_block block-3"
																		role="presentation"
																		style="
																			mso-table-lspace: 0pt;
																			mso-table-rspace: 0pt;
																		"
																		width="100%">
																		<tr>
																			<td
																				class="pad"
																				style="
																					padding-bottom: 25px;
																					padding-left: 10px;
																					padding-right: 10px;
																					padding-top: 10px;
																					text-align: center;
																					width: 100%;
																				">
																				<h1
																					style="
																						margin: 0;
																						color: #12141d;
																						direction: ltr;
																						font-family: Montserrat, Trebuchet MS,
																							Lucida Grande, Lucida Sans Unicode,
																							Lucida Sans, Tahoma, sans-serif;
																						font-size: 20px;
																						font-weight: 700;
																						letter-spacing: normal;
																						line-height: 120%;
																						text-align: center;
																						margin-top: 0;
																						margin-bottom: 0;
																						mso-line-height-alt: 24px;
																					">
																					Reminder
																				</h1>
																			</td>
																		</tr>
																	</table>
																	<table
																		border="0"
																		cellpadding="10"
																		cellspacing="0"
																		class="heading_block block-4"
																		role="presentation"
																		style="
																			mso-table-lspace: 0pt;
																			mso-table-rspace: 0pt;
																		"
																		width="100%">
																		<tr>
																			<td class="pad">
																				<h1
																					style="
																						margin: 0;
																						color: #12141d;
																						direction: ltr;
																						font-family: Montserrat, Trebuchet MS,
																							Lucida Grande, Lucida Sans Unicode,
																							Lucida Sans, Tahoma, sans-serif;
																						font-size: 18px;
																						font-weight: 400;
																						letter-spacing: normal;
																						line-height: 150%;
																						text-align: center;
																						margin-top: 0;
																						margin-bottom: 0;
																						mso-line-height-alt: 21.599999999999998px;
																					">
																					We hope this email finds you well. We wanted
																					to send you reminder about your upcoming
																					appointment have
																					<strong>1</strong>
																					day left. We are looking forward to serving
																					you!
																				</h1>
																			</td>
																		</tr>
																	</table>
																	<div
																		class="spacer_block block-5"
																		style="
																			height: 20px;
																			line-height: 20px;
																			font-size: 1px;
																		">
																		 
																	</div>
																</td>
															</tr>
														</tbody>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
									<table
										align="center"
										border="0"
										cellpadding="0"
										cellspacing="0"
										class="row row-2"
										role="presentation"
										style="
											mso-table-lspace: 0pt;
											mso-table-rspace: 0pt;
											background-color: #ffffff;
										"
										width="100%">
										<tbody>
											<tr>
												<td>
													<table
														align="center"
														border="0"
														cellpadding="0"
														cellspacing="0"
														class="row-content stack"
														role="presentation"
														style="
															mso-table-lspace: 0pt;
															mso-table-rspace: 0pt;
															background-color: #ffffff;
															color: #000000;
															width: 680px;
															margin: 0 auto;
														"
														width="680">
														<tbody>
															<tr>
																<td
																	class="column column-1"
																	style="
																		mso-table-lspace: 0pt;
																		mso-table-rspace: 0pt;
																		font-weight: 400;
																		text-align: left;
																		padding-bottom: 5px;
																		padding-top: 5px;
																		vertical-align: top;
																		border-top: 0px;
																		border-right: 0px;
																		border-bottom: 0px;
																		border-left: 0px;
																	"
																	width="100%">
																	<table
																		border="0"
																		cellpadding="0"
																		cellspacing="0"
																		class="icons_block block-1"
																		role="presentation"
																		style="
																			mso-table-lspace: 0pt;
																			mso-table-rspace: 0pt;
																			text-align: center;
																		"
																		width="100%">
																		<tr>
																			<td
																				class="pad"
																				style="
																					vertical-align: middle;
																					color: #1e0e4b;
																					font-family: 'Inter', sans-serif;
																					font-size: 15px;
																					padding-bottom: 5px;
																					padding-top: 5px;
																					text-align: center;
																				">
																				<table
																					cellpadding="0"
																					cellspacing="0"
																					role="presentation"
																					style="
																						mso-table-lspace: 0pt;
																						mso-table-rspace: 0pt;
																					"
																					width="100%">
																					<tr>
																						<td
																							class="alignment"
																							style="
																								vertical-align: middle;
																								text-align: center;
																							">
																							<!--[if vml]><table align="center" cellpadding="0" cellspacing="0" role="presentation" style="display:inline-block;padding-left:0px;padding-right:0px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"><![endif]-->
																							<!--[if !vml]><!-->
																							<table
																								cellpadding="0"
																								cellspacing="0"
																								class="icons-inner"
																								role="presentation"
																								style="
																									mso-table-lspace: 0pt;
																									mso-table-rspace: 0pt;
																									display: inline-block;
																									margin-right: -4px;
																									padding-left: 0px;
																									padding-right: 0px;
																								">
																								<!--<![endif]-->
																							</table>
																						</td>
																					</tr>
																				</table>
																			</td>
																		</tr>
																	</table>
																</td>
															</tr>
														</tbody>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
					<!-- End -->
				</body>
			</html>
			`;

			// Fetch appointments from the database
			const appointments = await fetchAppointments();

			// Process each appointment
			appointments.forEach(async (appoint) => {
				if (!emailSentFlags[appoint.id]) {
					// Check if email has not been sent for this appointment
					const remaining = getRemainingDays(appoint.appointmentDate);
					console.log(remaining);
					if (remaining === 1) {
						sendEmail(appoint.userEmail, callback, content);
						emailSentFlags[appoint.id] = true;
						console.log(remaining); // Set email sent flag to true for this appointment
					}
				}
			});
		} catch (error) {
			console.error("Error fetching appointments:", error);
		}
	});
};

// Example usage
scheduleEmailJob();

app.use(autenticationRoute);

app.use(adminRoutes);
app.use(ProfesionalRoutes);

app.listen(5000, () => {
	console.log("Server started on port 5000");
});
