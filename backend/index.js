const express = require("express");
const cookieParser = require("cookie-parser");
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
			title: "Payment for  Purchuasing Product from Glowcity",
			description: "Glowcity is the best in the City ",
		}),
	};

	request(options, function (error, response) {
		if (error) throw new Error(error);
		const data = JSON.parse(response.body);
		console.log(data);
		res.status(200).json({ url: data.data.checkout_url, ref: transactionId });
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
			return_url: "http://localhost:3000/paymentconfirmarion",
			title: "Payment for  Purchuasing Product from Glowcity",
			description: "Glowcity is the best in the City ",
		}),
	};

	request(options, function (error, response) {
		if (error) throw new Error(error);
		const data = JSON.parse(response.body);
		console.log(data);
		res.status(200).json({ url: data.data.checkout_url });
	});
});

app.use("/verifyappoint", (req, res) => {
	console.log(serviceId);
	const sql =
		"insert into appointments (customerId,professionalId,appointmentDate,startTime,endTime,serviceId,status) values (?,?,?,?,?,?,?)";
	const param = [
		userId,
		selectedProfessionalId,
		date,
		startTime,
		endTime,
		serviceId,
		"In Progress",
	];
	executeQuery(sql, param, res);
});

app.use("/verify", (req, res) => {
	const callback = function (error, data, response) {
		if (error) {
			console.error(error);
		} else {
			console.log("hello");
		}
	};

	const content = `<div style="background-color:#0a1b0b;width:500px;margin:auto;text-align:center; border-radius:12px; padding:20px">
		<h2 style="font-size: 24px;color:#f2f2f2"> Your Order is Completed</h2>
		<p style="color:#f2f2f2"">Don't share the order id with Another Person.Thanks for Choosing Us! </p>
		<p style="color:#f2f2f2"">Your Oreder id is: ${transactionId}</p>
	</div>`;

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
		});

		res
			.status(200)
			.json({ message: "Order and order items inserted successfully" });
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
app.use(autenticationRoute);

app.use(adminRoutes);
app.use(ProfesionalRoutes);

app.listen(5000, () => {
	console.log("Server started on port 5000");
});
