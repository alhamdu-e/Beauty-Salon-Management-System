const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const cors = require("cors");
const path = require("path");
const csrf = require("csurf");
const app = express();
const jwt = require("jsonwebtoken");
const request = require("request");

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

app.post("/payment", (req, res) => {
	console.log(req.body);
	const randomKey = generateRandomKey(16);
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
			tx_ref: req.body.fname + "_" + randomKey,
			callback_url: "https://webhook.site/077164d6-29cb-40df-ba29-8a00e59a7e60",
			return_url: "http://localhost:3000/",
			title: "Payment for  Purchuasing Product from Glowcity",
			description: "Glowcity is the best in the City ",
		}),
	};

	request(options, function (error, response) {
		if (error) throw new Error(error);
		const data = JSON.parse(response.body);
		res.status(200).json({ url: data.data.checkout_url });
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
		if (result.length > 0) {
			console.log(result);
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
