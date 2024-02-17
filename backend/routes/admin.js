const express = require("express");
const router = express.Router();
const multer = require("multer");
const db = require("../database/connection.js");

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		return cb(null, "./public/images");
	},
	filename: function (req, file, cb) {
		return cb(null, file.originalname);
	},
});
const upload = multer({ storage: storage });

router.get("/customer", (req, res) => {
	const sql = "SELECT * FROM users";
	db.query(sql, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.json(result);
		}
	});
});
router.get("/product", (req, res) => {
	const sql = "select * from product";

	db.query(sql, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.json(result);
		}
	});
});
router.get("/employee", (req, res) => {
	console.log("hi");
	const sql = "SELECT * FROM profesional";
	db.query(sql, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.json(result);
		}
	});
});

router.post("/addEmployee", (req, res) => {
	const {
		fname,
		lname,
		email,
		phone,
		adress,
		age,
		password,
		gender,
		profesion,
	} = req.body;
	const sql =
		"insert into profesional (fname,lname,gender,profession,email,age,phone,address,password) values (?,?,?,?,?,?,?,?,?)";
	db.query(
		sql,
		[fname, lname, gender, profesion, email, age, phone, adress, password],
		(err, result) => {
			if (err) {
				console.log(err);
				return;
			} else {
				console.log(result);
				res.status(200).json({ message: "employe added" });
			}
		}
	);
});

router.post("/addProduct", upload.single("productImage"), (req, res) => {
	const { productName, productDesc, productPrice } = req.body;
	const fileName = req.file.filename;
	const imagePath = "http://127.0.0.1:5000/images/" + fileName;

	const sql =
		"insert into product(productname, productdesc, productprice, productimage) values(?,?,?,?)";
	const params = [productName, productDesc, productPrice, imagePath];
	db.query(sql, params, (err, result) => {
		if (err) {
			console.log(err);
			return;
		} else {
			console.log("Product created successfully");
			res.status(200).json({ message: "product added" });
		}
	});
});
module.exports = router;
