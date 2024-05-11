const express = require("express");
const router = express.Router();
const db = require("../database/connection.js");
const jwt = require("jsonwebtoken");
const sendEmail = require("../sendEmail.js");

const crypto = require("crypto");
const secreteKey = process.env.SECRET_KEY;

function encrypt(text, key) {
	const cipher = crypto.createCipher("aes-256-cbc", key);
	let encryptedText = cipher.update(text, "utf-8", "hex");
	encryptedText += cipher.final("hex");
	return encryptedText;
}

function decrypt(encryptedText, key) {
	const deciher = crypto.createDecipher("aes-256-cbc", key);
	let decryptedText = deciher.update(encryptedText, "hex", "utf-8");
	decryptedText += deciher.final("utf-8");
	return decryptedText;
}

// ************************ function that Excute Query ********************************
const executeQuery = (sql, params = [], res) => {
	db.query(sql, params, (err, result) => {
		if (err) {
			console.log(err);
			res.status(500).json({ message: "Database Erroe" });
		} else {
			res.status(200).json(result);
			// res.status(400);
		}
	});
};

// ************************ signup or user regisration ********************************

router.post("/signup", (req, res) => {
	const { fname, lname, email, password, age, phone, adress } = req.body;
	let responseSent = false; // Flag to track if response has been sent

	const sqlUsers = "SELECT * FROM users WHERE email=?";
	const sqlProfesional = "SELECT * FROM profesional WHERE email=?";
	const sqlAdmin = "SELECT * FROM admin WHERE email=?";

	db.query(sqlUsers, [email], (err, usersResult) => {
		if (err) {
			return res.sendStatus(500);
		}
		if (usersResult.length > 0) {
			responseSent = true; // Set flag to true
			return res.status(400).json({ error: "User Exist!!!" });
		}

		db.query(sqlProfesional, [email], (err, profesionalResult) => {
			if (err) {
				return res.sendStatus(500);
			}
			if (profesionalResult.length > 0) {
				responseSent = true; // Set flag to true
				return res.status(400).json({ error: "User Exist!!!" });
			}

			db.query(sqlAdmin, [email], (err, adminResult) => {
				if (err) {
					return res.sendStatus(500);
				}
				if (adminResult.length > 0) {
					responseSent = true; // Set flag to true
					return res.status(400).json({ error: "User Exist!!!" });
				}

				const callback = function (error, data, response) {
					if (error) {
						console.error(error);
					} else {
						console.log("hello");
					}
				};

				const content = `<!DOCTYPE html>

				<html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
				<head>
				<title></title>
				<meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
				<meta content="width=device-width, initial-scale=1.0" name="viewport"/><!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]--><!--[if !mso]><!-->
				<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900" rel="stylesheet" type="text/css"/><!--<![endif]-->
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
							line-height: inherit
						}
				
						.desktop_hide,
						.desktop_hide table {
							mso-hide: all;
							display: none;
							max-height: 0px;
							overflow: hidden;
						}
				
						.image_block img+div {
							display: none;
						}
				
						@media (max-width:700px) {
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
							.row-1 .column-1 .block-3.heading_block h1 {
								font-size: 39px !important;
							}
						}
					</style>
				</head>
				<body style="background-color: #12141d; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
				<table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #12141d;" width="100%">
				<tbody>
				<tr>
				<td>
				<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fdf2e9;" width="100%">
				<tbody>
				<tr>
				<td>
				<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-radius: 0; color: #000000; width: 680px; margin: 0 auto;" width="680">
				<tbody>
				<tr>
				<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 40px; padding-top: 15px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
				<table border="0" cellpadding="0" cellspacing="0" class="heading_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
				<tr>
				<td class="pad" style="padding-bottom:10px;padding-top:10px;text-align:center;width:100%;">
				<h2 style="margin: 0; color: #12141d; direction: ltr; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; font-size: 30px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: left; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 36px;"><span class="tinyMce-placeholder">GlowCity</span></h2>
				</td>
				</tr>
				</table>
				<div class="spacer_block block-2" style="height:40px;line-height:40px;font-size:1px;"> </div>
				<table border="0" cellpadding="10" cellspacing="0" class="heading_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
				<tr>
				<td class="pad">
				<h1 style="margin: 0; color: #12141d; direction: ltr; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; font-size: 38px; font-weight: 700; letter-spacing: normal; line-height: 150%; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 57px;"><span class="tinyMce-placeholder">Welcome ${fname},You Have Successfully Registered</span></h1>
				</td>
				</tr>
				</table>
				<div class="spacer_block block-4" style="height:20px;line-height:20px;font-size:1px;"> </div>
				<table border="0" cellpadding="0" cellspacing="0" class="button_block block-5" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
				<tr>
				<td class="pad" style="padding-left:10px;padding-right:10px;padding-top:30px;text-align:center;">
				<div align="center" class="alignment"><!--[if mso]>
				<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="http://localhost:3000/" style="height:46px;width:110px;v-text-anchor:middle;" arcsize="5%" stroke="false" fillcolor="#b94f6e">
				<w:anchorlock/>
				<v:textbox inset="0px,0px,0px,0px">
				<center style="color:#ffffff; font-family:Tahoma, sans-serif; font-size:18px">
				<![endif]--><a href="http://localhost:3000/" style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#b94f6e;border-radius:2px;width:auto;border-top:0px solid #12141D;font-weight:400;border-right:0px solid #12141D;border-bottom:0px solid #12141D;border-left:0px solid #12141D;padding-top:5px;padding-bottom:5px;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:18px;text-align:center;mso-border-alt:none;word-break:keep-all;" target="_blank"><span style="padding-left:20px;padding-right:20px;font-size:18px;display:inline-block;letter-spacing:normal;"><span style="word-break: break-word; line-height: 36px;">Visit Us!</span></span></a><!--[if mso]></center></v:textbox></v:roundrect><![endif]--></div>
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
				<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff;" width="100%">
				<tbody>
				<tr>
				<td>
				<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 680px; margin: 0 auto;" width="680">
				<tbody>
				<tr>
				<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
				<table border="0" cellpadding="0" cellspacing="0" class="icons_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; text-align: center;" width="100%">
				<tr>
				<td class="pad" style="vertical-align: middle; color: #1e0e4b; font-family: 'Inter', sans-serif; font-size: 15px; padding-bottom: 5px; padding-top: 5px; text-align: center;">
				<table cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
				<tr>
				<td class="alignment" style="vertical-align: middle; text-align: center;"><!--[if vml]><table align="center" cellpadding="0" cellspacing="0" role="presentation" style="display:inline-block;padding-left:0px;padding-right:0px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"><![endif]-->
				<!--[if !vml]><!-->
				<table cellpadding="0" cellspacing="0" class="icons-inner" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block; margin-right: -4px; padding-left: 0px; padding-right: 0px;"><!--<![endif]-->
				
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
				</table><!-- End -->
				</body>
				</html>`;

				sendEmail(email, callback, content);

				const sql =
					"insert into users (fname,lname,email,adress,phone,age,password) values (?, ?, ?, ?, ?,?,?)";

				db.query(
					sql,
					[fname, lname, email, adress, phone, age, password],
					(err, result) => {
						if (err) {
							if (err.code === "ER_DUP_ENTRY") {
								console.log("duplicated");
								if (!responseSent) {
									// Check flag before sending response
									responseSent = true; // Set flag to true
									return res.status(400).json({ error: "User Exist!!!" });
								}
							} else {
								console.error(err);
								if (!responseSent) {
									// Check flag before sending response
									responseSent = true; // Set flag to true
									return res
										.status(500)
										.json({ error: "Internal server error" });
								}
							}
						} else {
							if (!responseSent) {
								// Check flag before sending response
								responseSent = true; // Set flag to true
								return res.status(200).json({ status: "User created" });
							}
						}
					}
				);
			});
		});
	});
});

// ************************ Login or user authentication ********************************

router.post("/login", (req, res) => {
	const { email, password } = req.body;

	const sqlUsers = "SELECT * FROM users WHERE email=? AND password=?";
	const sqlProfesional =
		"SELECT * FROM profesional WHERE email=? AND password=?";
	const sqlAdmin = "SELECT * FROM admin WHERE email=? AND password=?";

	db.query(sqlUsers, [email, password], (err, usersResult) => {
		if (err) {
			console.log(err);
			return res.sendStatus(400);
		}
		if (usersResult.length > 0) {
			const id = usersResult[0].id;
			const token = jwt.sign({ id, userType: "user" }, secreteKey);
			return res
				.status(200)
				.json({ userType: "user", isAut: token, usersResult: usersResult });
		}

		db.query(sqlProfesional, [email, password], (err, profesionalResult) => {
			if (err) {
				console.log(err);
				return res.sendStatus(400);
			}
			if (profesionalResult.length > 0) {
				const id = profesionalResult[0].id;
				const token = jwt.sign({ id, userType: "profesional" }, secreteKey);
				console.log("profesional");
				return res.status(200).json({
					userType: "profesional",
					isAut: token,
					profesionalResult: profesionalResult,
				});
			}

			db.query(sqlAdmin, [email, password], (err, adminResult) => {
				if (err) {
					console.log(err);
					return res.sendStatus(400);
				}
				if (adminResult.length > 0) {
					const id = adminResult[0].id;
					const token = jwt.sign({ id, userType: "admin" }, secreteKey);
					console.log("admin");
					return res.status(200).json({ userType: "admin", isAut: token });
				}
				const unAuthenicatedUser = false;
				console.log("User not found");
				return res.status(404).json(unAuthenicatedUser);
			});
		});
	});
});

// ************************ check the availablity of email to reset passsword ********************************

router.get("/resetemail", (req, res) => {
	const sql = "SELECT * FROM users where email =? ";
	const sql1 = "SELECT * FROM profesional where email =? ";
	const email = req.query.email;

	const expirationTime = new Date();
	expirationTime.setHours(expirationTime.getHours() + 1);

	const callback = function (error, data, response) {
		if (error) {
			return;
		} else {
		}
	};
	const encryptedEmail = encrypt(email, secreteKey);
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
																			GlowCity Reset Password
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
																				line-height: 120%;
																				text-align: center;
																				margin-top: 0;
																				margin-bottom: 0;
																				mso-line-height-alt: 21.599999999999998px;
																			">
																			We heard that you lost your GlowCity
																			password. Sorry about that!
																			<br />
																			<br />
																			But don’t worry! You can use the following
																			button to reset your password:
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
																			padding-top: 30px;
																			text-align: center;
																		">
																		<div align="center" class="alignment">
																			<!--[if mso]>
	<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="http://localhost:3000/" style="height:46px;width:232px;v-text-anchor:middle;" arcsize="29%" stroke="false" fillcolor="#1c8843">
	<w:anchorlock/>
	<v:textbox inset="0px,0px,0px,0px">
	<center style="color:#ffffff; font-family:Tahoma, sans-serif; font-size:18px">
	<![endif]-->
																			<a
																				href="http://localhost:3000/resetpassword/${btoa(
																					expirationTime.getTime()
																				)}/${encryptedEmail}"
																				style="
																					text-decoration: none;
																					display: inline-block;
																					color: #ffffff;
																					background-color: #1c8843;
																					border-radius: 13px;
																					width: auto;
																					border-top: 0px solid #12141d;
																					font-weight: 400;
																					border-right: 0px solid #12141d;
																					border-bottom: 0px solid #12141d;
																					border-left: 0px solid #12141d;
																					padding-top: 5px;
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
																						Reset Your Password!
																					</span>
																				</span>
																			</a>
																			<!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
																		</div>
																	</td>
																</tr>
															</table>
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
																				font-size: 16px;
																				font-weight: 400;
																				letter-spacing: normal;
																				line-height: 120%;
																				text-align: center;
																				margin-top: 20px;
																				margin-bottom: 0;
																				mso-line-height-alt: 24px;
																			">
																			If you don't use this link within 1 hour,it
																			will expire
																		</h1>
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

	db.query(sql, [email], (err, result) => {
		if (err) {
			console.log(err);
			res.status(500).json({ error: "Internal server error" });
			return;
		}

		if (result.length > 0) {
			// Send response and send email
			res.status(200).json({ email: email });
			sendEmail(email, callback, content);
		} else {
			// If user not found, check another condition
			db.query(sql1, [email], (err, result) => {
				if (err) {
					console.log(err);
					res.status(500).json({ error: "Internal server error" });
					return;
				}
				if (result.length > 0) {
					// Send response and send email
					res.status(200).json({ email: email });
					sendEmail(email, callback, content);
				} else {
					// If user still not found, send appropriate response
					res.status(404).json({ userNotFound: true });
				}
			});
		}
	});
});

// ************************ reset  password  ********************************

router.post("/resetPassword", (req, res) => {
	const { password, email } = req.body;
	console.log("hi");
	const decryptedEmail = decrypt(email, secreteKey);

	const sqlRetriveUserData = "select * from users where email  = ?";
	const sqlUpdateUserpassword = `UPDATE users SET password= ? where email=?`;
	const sqlRetriveProfesionalData =
		"select * from profesional where email  = ?";
	const sqlUpdateProfesionalpassword = `UPDATE profesional SET password= ? where email=?`;

	db.query(sqlRetriveUserData, [decryptedEmail], (err, result) => {
		if (err) {
			console.log(err);
			res.status(500).json({ passwordUpdate: false });
			return;
		}

		if (result.length > 0) {
			db.query(
				sqlUpdateUserpassword,
				[password, decryptedEmail],
				(err, result) => {
					if (err) {
						console.log(err);
						res.status(500).json({ passwordUpdate: false });
						return;
					}
					if (result.affectedRows > 0) {
						res.status(200).json({ passwordUpdate: true });
						return;
					}
				}
			);
		} else {
			db.query(sqlRetriveProfesionalData, [decryptedEmail], (err, result) => {
				if (err) {
					res.status(500).json({ passwordUpdate: false });
					return;
				}
				if (result.length > 0) {
					db.query(
						sqlUpdateProfesionalpassword,
						[password, userEmail],
						(err, result) => {
							if (err) {
								res.status(500).json({ passwordUpdate: false });
								return;
							}
							if (result.affectedRows > 0) {
								res.status(200).json({ passwordUpdate: true });
								return;
							}
						}
					);
				} else {
					res.status(404).json({ passwordUpdate: false });
				}
			});
		}
	});
});

module.exports = router;
