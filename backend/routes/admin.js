const express = require("express");
const router = express.Router();
const multer = require("multer");
const db = require("../database/connection.js");
const crypto = require("crypto");
const sendEmail = require("../sendEmail.js");

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		return cb(null, "./public/images");
	},
	filename: function (req, file, cb) {
		return cb(null, file.originalname);
	},
});

const fileFilter = (req, file, cb) => {
	if (
		file.mimetype === "image/png" ||
		file.mimetype === "image/jpg" ||
		file.mimetype === "image/jpeg"
	) {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

const generatePassword = () => {
	const buffer = crypto.randomBytes(4);
	return buffer.toString("hex");
};

// function for excuting query

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
// ******** rouets for retriving user information ****************

// ************************************ Employee API *********************************
router.get("/employee", (req, res) => {
	const sql = "SELECT * FROM profesional";
	executeQuery(sql, [], res, "ALL employee RETRIVED");
});

router.get("/orders", (req, res) => {
	const sql =
		"SELECT oi.order_id, GROUP_CONCAT(oi.product_name) AS products, GROUP_CONCAT(oi.quantity) AS total_quantity, o.customer_email, o.first_name, o.last_name, o.total_amount, o.status, o.transactionRef FROM order_items AS oi  JOIN orders AS o ON oi.order_id = o.order_id GROUP BY oi.order_id, o.customer_email, o.first_name, o.last_name, o.total_amount, o.status, o.transactionRef;";
	executeQuery(sql, [], res, "ALL employee RETRIVED");
});

router.delete("/order/:id", (req, res) => {
	let id = req.params.id;
	const sql = "DELETE FROM orders WHERE order_id =?";
	db.query(sql, [id], (err, result) => {
		if (err) {
			console.log(err);
		} else {
			const sql =
				"SELECT oi.order_id, GROUP_CONCAT(oi.product_name) AS products, GROUP_CONCAT(oi.quantity) AS total_quantity, o.customer_email, o.first_name, o.last_name, o.total_amount, o.status, o.transactionRef FROM order_items AS oi  JOIN orders AS o ON oi.order_id = o.order_id GROUP BY oi.order_id, o.customer_email, o.first_name, o.last_name, o.total_amount, o.status, o.transactionRef;";
			db.query(sql, (err, result) => {
				if (err) {
					console.log(err, "product");
				} else {
					res.status(200).json(result);
				}
			});
		}
	});
});

router.delete("/feedback/:id", (req, res) => {
	let id = req.params.id;
	const sql = "DELETE FROM feedback WHERE feedback_id =?";
	db.query(sql, [id], (err, result) => {
		if (err) {
			console.log(err);
		} else {
			const sql = "select * from feedback";
			db.query(sql, (err, result) => {
				if (err) {
					console.log(err, "product");
				} else {
					res.status(200).json(result);
				}
			});
		}
	});
});
router.delete("/appointment/:id", (req, res) => {
	let id = req.params.id;
	const sql = "DELETE FROM appointments WHERE id =?";
	db.query(sql, [id], (err, result) => {
		if (err) {
			console.log(err);
		} else {
			const sql =
				"SELECT appointments.*, users.email AS userEmail,service.servicename, users.fname AS userFname, users.lname AS userLname,profesional.email AS profEmail,profesional.fname AS profFname,profesional.lname AS profLname FROM appointments INNER JOIN users ON appointments.customerId = users.id INNER JOIN profesional ON appointments.professionalId = profesional.id INNER JOIN service ON appointments.serviceId = service.id ";
			db.query(sql, (err, result) => {
				if (err) {
					console.log(err, "product");
				} else {
					res.status(200).json(result);
				}
			});
		}
	});
});

router.put("/order/:id", (req, res) => {
	let id = req.params.id;
	const sql = "update orders set status='Completed'  WHERE order_id =?";
	db.query(sql, [id], (err, result) => {
		if (err) {
			console.log(err);
		} else {
			const sql =
				"SELECT oi.order_id, GROUP_CONCAT(oi.product_name) AS products, GROUP_CONCAT(oi.quantity) AS total_quantity, o.customer_email, o.first_name, o.last_name, o.total_amount, o.status, o.transactionRef FROM order_items AS oi  JOIN orders AS o ON oi.order_id = o.order_id GROUP BY oi.order_id, o.customer_email, o.first_name, o.last_name, o.total_amount, o.status, o.transactionRef;";
			db.query(sql, (err, result) => {
				if (err) {
					console.log(err, "product");
				} else {
					res.status(200).json(result);
				}
			});
		}
	});
});
router.delete("/employee/:id", (req, res) => {
	let id = req.params.id;
	const sql = "DELETE FROM profesional WHERE id =?";
	db.query(sql, [id], (err, result) => {
		if (err) {
			console.log(err);
		} else {
			const sql = "select * from profesional";
			db.query(sql, (err, result) => {
				if (err) {
					console.log(err, "product");
				} else {
					res.status(200).json(result);
				}
			});
		}
	});
});

router.delete("/deleteCart/:id", (req, res) => {
	let id = req.params.id;
	console.log(id);
	const sql = "DELETE FROM cart WHERE cart_id =?";
	db.query(sql, [id], (err, result) => {
		if (err) {
			console.log(err);
		} else {
			const sql = "select * from cart";
			db.query(sql, (err, result) => {
				if (err) {
					console.log(err, "product");
				} else {
					res.status(200).json(result);
				}
			});
		}
	});
});

router.post("/addEmployee", upload.single("image"), (req, res) => {
	if (!req.file) {
		res.status(403).json({ error: "User Exist!!!" });
		return;
	}
	const { fname, lname, email, phone, address, age, gender, profesion } =
		req.body;
	let responseSent = false;
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

				const fileName = req.file.filename;
				const imagePath = "http://127.0.0.1:5000/images/" + fileName;
				const password = generatePassword();
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
				<h1 style="margin: 0; color: #12141d; direction: ltr; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; font-size: 36px; font-weight: 700; letter-spacing: normal; line-height: 150%; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 54px;"><span class="tinyMce-placeholder">You Have Successfully Registered</span></h1>
				</td>
				</tr>
				</table>
				<div class="spacer_block block-4" style="height:20px;line-height:20px;font-size:1px;"> </div>
				<table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-5" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
				<tr>
				<td class="pad">
				<div style="color:#101112;direction:ltr;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:24px;font-weight:700;letter-spacing:0px;line-height:150%;text-align:center;mso-line-height-alt:36px;">
				<p style="margin: 0;">Your <span style="color: #2e2323;">Password</span> Is :${password}</p>
				</div>
				</td>
				</tr>
				</table>
				<table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-6" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
				<tr>
				<td class="pad" style="padding-bottom:25px;padding-top:25px;">
				<div style="color:#101112;direction:ltr;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:18px;font-weight:400;letter-spacing:0px;line-height:150%;text-align:center;mso-line-height-alt:27px;">
				<p style="margin: 0;">To secure your account, please log in using the temporary password provided and update it to a personalized password promptly</p>
				</div>
				</td>
				</tr>
				</table>
				<table border="0" cellpadding="0" cellspacing="0" class="button_block block-7" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
				<tr>
				<td class="pad" style="padding-left:10px;padding-right:10px;padding-top:10px;text-align:center;">
				<div align="center" class="alignment"><!--[if mso]>
				<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="http://localhost:3000/login" style="height:48px;width:140px;v-text-anchor:middle;" arcsize="5%" strokeweight="0.75pt" strokecolor="#12141D" fillcolor="#12141d">
				<w:anchorlock/>
				<v:textbox inset="0px,0px,0px,0px">
				<center style="color:#ffffff; font-family:Tahoma, sans-serif; font-size:16px">
				<![endif]--><a href="http://localhost:3000/login" style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#12141d;border-radius:2px;width:auto;border-top:1px solid #12141D;font-weight:400;border-right:1px solid #12141D;border-bottom:1px solid #12141D;border-left:1px solid #12141D;padding-top:5px;padding-bottom:5px;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:16px;text-align:center;mso-border-alt:none;word-break:keep-all;" target="_blank"><span style="padding-left:20px;padding-right:20px;font-size:16px;display:inline-block;letter-spacing:normal;"><span style="word-break: break-word; line-height: 32px;">Login Now !</span></span></a><!--[if mso]></center></v:textbox></v:roundrect><![endif]--></div>
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
					"insert into profesional (fname,lname,gender,profession,email,age,phone,address,password,pimage) values (?,?,?,?,?,?,?,?,?,?)";

				db.query(
					sql,
					[
						fname,
						lname,
						gender,
						profesion,
						email,
						age,
						phone,
						address,
						password,
						imagePath,
					],
					(err, result) => {
						if (err) {
							if (err.code === "ER_DUP_ENTRY") {
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
router.post("/overallfeedback", (req, res) => {
	const sql = "insert into feedback (feedback) values (?) ";
	executeQuery(sql, [req.body.feedback], res, "FeedBack Inserted");
});
router.put("/editEmployee", upload.single("image"), (req, res) => {
	const { fname, lname, email, phone, adress, age, gender, profesion, id } =
		req.body;

	let responseSent = false;
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

				let sql = "";
				let values = [];
				if (req.file) {
					const fileName = req.file.filename;
					const imagePath = "http://127.0.0.1:5000/images/" + fileName;
					sql = `update profesional set fname=?,lname=?,email=?,phone=?,address=?,age=? ,gender=?,profession=?,pimage =? where id=?`;
					values = [
						fname,
						lname,
						email,
						phone,
						adress,
						age,
						gender,
						profesion,
						imagePath,
						id,
					];
				} else {
					sql = `update profesional set fname=?,lname=?,email=?,phone=?,address=?,age=? ,gender=?,profession=? where id=?`;
					values = [
						fname,
						lname,
						email,
						phone,
						adress,
						age,
						gender,
						profesion,
						id,
					];
				}
				//executeQuery(sql, values, res, "employe edited sucessfully");

				db.query(sql, values, (err, result) => {
					if (err) {
						if (!responseSent) {
							// Check flag before sending response
							responseSent = true; // Set flag to true
							return res.status(400).json({ error: "User Exist!!!" });
						} else {
							console.error(err);
							if (!responseSent) {
								// Check flag before sending response
								responseSent = true; // Set flag to true
								return res.status(500).json({ error: "Internal server error" });
							}
						}
					} else {
						if (!responseSent) {
							// Check flag before sending response
							responseSent = true; // Set flag to true
							return res.status(200).json({ status: "User created" });
						}
					}
				});
			});
		});
	});
});

router.put("/editcart", (req, res) => {
	console.log(req.body);
	const { quantityy, productid, userId } = req.body;
	const sql = `update cart set quantity=? where customer_id=? and product_id=?`;
	executeQuery(sql, [quantityy, userId, productid], res, "Quantity Updated");
});
router.get("/employee/:id", (req, res) => {
	const service = req.params.id;
	console.log(service);
	const sql = "select * from profesional where id =?";
	executeQuery(sql, [service], res, "single service retrieved");
});

// ----------------------Product API----------------------------------------------------

router.post("/addProduct", upload.single("productImage"), (req, res) => {
	const { productName, productDesc, productPrice, productQuantity } = req.body;
	if (!req.file) {
		res.status(400);

		return;
	}
	const fileName = req.file.filename;
	const imagePath = "http://127.0.0.1:5000/images/" + fileName;

	const sql =
		"insert into product(productname, productdesc, productprice,quantity, productimage) values(?,?,?,?,?)";
	const params = [
		productName,
		productDesc,
		productPrice,
		productQuantity,
		imagePath,
	];
	//executeQuery(sql, params, res, "product added sucessfully");

	db.query(sql, params, (err, result) => {
		if (err) {
			if (err.code === "ER_DUP_ENTRY") {
				res.status(403).json({ error: "User Exist!!!" });
			} else {
				res.status(500).json({ error: "Internal server error" });
			}
		} else {
			res.send({ status: "Product Added" });
		}
	});
});

router.put("/editProduct", upload.single("productImage"), (req, res) => {
	const { productName, productDesc, productPrice, productQuantity, productId } =
		req.body;

	let sql = "";
	let values = [];
	if (req.file) {
		const fileName = req.file.filename;
		const imagePath = "http://127.0.0.1:5000/images/" + fileName;
		sql = `UPDATE product SET productname = ?, productdesc = ?, productprice = ?,quantity=?, productimage = ? WHERE id = ?`;
		values = [
			productName,
			productDesc,
			productPrice,
			productQuantity,
			imagePath,
			productId,
		];
	} else {
		sql = `UPDATE product SET productname = ?, productdesc = ?, productprice = ?,quantity=? WHERE id = ?`;
		values = [
			productName,
			productDesc,
			productPrice,
			productQuantity,
			productId,
		];
	}

	//executeQuery(sql, values, res, "product edited successfully");

	db.query(sql, values, (err, result) => {
		if (err) {
			if (err.code === "ER_DUP_ENTRY") {
				res.status(400).json({ error: "User Exist!!!" });
			} else {
				res.status(500).json({ error: "Internal server error" });
			}
		} else {
			res.send({ status: "Product Added" });
		}
	});
});

// router.get("/product/:id", (req, res) => {
// 	const product = req.params.id;
// 	const sql = "select * from product where id =?";
// 	executeQuery(sql, [product], res, "single product retrived");
// });

router.delete("/product/:id", (req, res) => {
	let id = req.params.id;
	console.log(id);

	const sql = "DELETE FROM product WHERE id =?";
	db.query(sql, [id], (err, result) => {
		if (err) {
			console.log(err);
		} else {
			const sql = "select * from product";
			db.query(sql, (err, result) => {
				if (err) {
					console.log(err, "product");
				} else {
					res.status(200).json(result);
				}
			});
		}
	});
});

//***************************************Service API****************************************** */
router.put("/editService", upload.single("serviceImage"), (req, res) => {
	const {
		serviceName,
		serviceDesc,
		servicePrice,
		serviceId,
		serviceCatagory,
		serviceDuration,
	} = req.body;

	let homeprice = parseInt(servicePrice) + 300;
	if (serviceName === "full makeup") {
		homeprice = parseInt(servicePrice) + 500;
	}

	let sql = "";
	let values = [];
	if (req.file) {
		const fileName = req.file.filename;
		const imagePath = "http://127.0.0.1:5000/images/" + fileName;
		sql = `UPDATE service SET servicename = ?, servicedesc = ?, serviceprice = ?, serviceimage = ?,servicecatagory = ?, serviceduration=?,servicehomeprice=? WHERE id = ?`;
		values = [
			serviceName,
			serviceDesc,
			servicePrice,
			imagePath,
			serviceCatagory,
			serviceDuration,
			homeprice,
			serviceId,
		];
	} else {
		sql = `UPDATE service SET servicename = ?, servicedesc = ?, serviceprice = ?,servicecatagory = ?, serviceduration=?,servicehomeprice=? WHERE id = ?`;
		values = [
			serviceName,
			serviceDesc,
			servicePrice,
			serviceCatagory,
			serviceDuration,
			homeprice,
			serviceId,
		];
	}

	//executeQuery(sql, values, res, "service Edited Successfully");

	db.query(sql, values, (err, result) => {
		if (err) {
			if (err.code === "ER_DUP_ENTRY") {
				res.status(400).json({ error: "User Exist!!!" });
			} else {
				res.status(500).json({ error: "Internal server error" });
			}
		} else {
			res.send({ status: "Product Added" });
		}
	});
});

router.post("/addService", upload.single("serviceImage"), (req, res) => {
	if (!req.file) {
		res.status(400);
		return;
	}
	const {
		serviceName,
		serviceDesc,
		servicePrice,
		serviceCatagory,
		serviceDuration,
	} = req.body;
	console.log(serviceDuration);
	let homeprice = parseInt(servicePrice) + 300;
	if (serviceName === "full makeup") {
		homeprice = parseInt(servicePrice) + 500;
	}
	const fileName = req.file.filename;
	const imagePath = "http://127.0.0.1:5000/images/" + fileName;
	const sql =
		"insert into service(servicename, servicedesc, serviceprice, serviceimage,servicecatagory,serviceduration,servicehomeprice) values(?,?,?,?,?,?,?)";
	const params = [
		serviceName,
		serviceDesc,
		servicePrice,
		imagePath,
		serviceCatagory,
		serviceDuration,
		homeprice,
	];
	//executeQuery(sql, params, res, "product added successfully");
	db.query(sql, params, (err, result) => {
		if (err) {
			if (err.code === "ER_DUP_ENTRY") {
				res.status(403).json({ error: "User Exist!!!" });
			} else {
				res.status(500).json({ error: "Internal server error" });
			}
		} else {
			res.send({ status: "Service Added" });
		}
	});
});

router.get("/service/:id", (req, res) => {
	const service = req.params.id;
	console.log(service);
	const sql = "select * from service where id =?";
	executeQuery(sql, [service], res, "single service retrieved");
});
router.get("/service", (req, res) => {
	const sql = "select * from service";

	executeQuery(sql, [], res, "ALL service RETRIVED");
});

router.delete("/service/:id", (req, res) => {
	let id = req.params.id;
	console.log(id);

	const sql = "DELETE FROM service WHERE id =?";
	db.query(sql, [id], (err, result) => {
		if (err) {
			console.log(err);
		} else {
			const sql = "select * from service";
			db.query(sql, (err, result) => {
				if (err) {
					console.log(err, "service");
				} else {
					res.status(200).json(result);
				}
			});
		}
	});
});
// ************************ retrive all user for admin page ********************************

router.get("/customer", (req, res) => {
	const sql = "SELECT * FROM users";
	executeQuery(sql, [], res);
});

module.exports = router;
