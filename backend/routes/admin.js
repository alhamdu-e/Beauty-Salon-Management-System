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

const executeQuery = (sql, params = [], res, successMessage) => {
	db.query(sql, params, (err, result) => {
		if (err) {
			console.log(err);
			res.status(500).json({ message: "Database Erroe" });
		} else {
			console.log(successMessage);
			res.status(200).json(result);
		}
	});
};

router.get("/customer", (req, res) => {
	const sql = "SELECT * FROM users";
	executeQuery(sql, [], res, "ALL CUSTOMER RETIVED");
});

router.get("/product", (req, res) => {
	const sql = "select * from product";

	executeQuery(sql, [], res, "ALL product RETRIVED");
});

router.get("/service", (req, res) => {
	const sql = "select * from service";

	executeQuery(sql, [], res, "ALL service RETRIVED");
});

router.get("/employee", (req, res) => {
	const sql = "SELECT * FROM profesional";
	executeQuery(sql, [], res, "ALL employee RETRIVED");
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
	[fname, lname, gender, profesion, email, age, phone, adress, password];
	const sql =
		"insert into profesional (fname,lname,gender,profession,email,age,phone,address,password) values (?,?,?,?,?,?,?,?,?)";
	executeQuery(
		sql,
		[fname, lname, gender, profesion, email, age, phone, adress, password],
		res,
		"ALL employee Added"
	);
});

router.post("/addProduct", upload.single("productImage"), (req, res) => {
	const { productName, productDesc, productPrice } = req.body;
	const fileName = req.file.filename;
	const imagePath = "http://127.0.0.1:5000/images/" + fileName;

	const sql =
		"insert into product(productname, productdesc, productprice, productimage) values(?,?,?,?)";
	const params = [productName, productDesc, productPrice, imagePath];
	executeQuery(sql, params, res, "product added sucessfully");
});

router.put("/editProduct", upload.single("productImage"), (req, res) => {
	const { productName, productDesc, productPrice, productId } = req.body;

	let sql = "";
	let values = [];
	if (req.file) {
		const fileName = req.file.filename;
		const imagePath = "http://127.0.0.1:5000/images/" + fileName;
		sql = `UPDATE product SET productname = ?, productdesc = ?, productprice = ?, productimage = ? WHERE id = ?`;
		values = [productName, productDesc, productPrice, imagePath, productId];
	} else {
		sql = `UPDATE product SET productname = ?, productdesc = ?, productprice = ? WHERE id = ?`;
		values = [productName, productDesc, productPrice, productId];
	}

	executeQuery(sql, values, res, "product edited successfully");
});

router.put("/editService", upload.single("serviceImage"), (req, res) => {
	const { serviceName, serviceDesc, servicePrice, serviceId, serviceCatagory } =
		req.body;

	let sql = "";
	let values = [];
	if (req.file) {
		const fileName = req.file.filename;
		const imagePath = "http://127.0.0.1:5000/images/" + fileName;
		sql = `UPDATE service SET servicename = ?, servicedesc = ?, serviceprice = ?, serviceimage = ?,servicecatagory = ? WHERE id = ?`;
		values = [
			serviceName,
			serviceDesc,
			servicePrice,
			imagePath,
			serviceCatagory,
			serviceId,
		];
	} else {
		sql = `UPDATE service SET servicename = ?, servicedesc = ?, serviceprice = ?,servicecatagory = ? WHERE id = ?`;
		values = [
			serviceName,
			serviceDesc,
			servicePrice,
			serviceCatagory,
			serviceId,
		];
	}

	executeQuery(sql, values, res, "service Edited Successfully");
});

router.post("/addService", upload.single("serviceImage"), (req, res) => {
	const { serviceName, serviceDesc, servicePrice, serviceCatagory } = req.body;
	const fileName = req.file.filename;
	const imagePath = "http://127.0.0.1:5000/images/" + fileName;
	const sql =
		"insert into service(servicename, servicedesc, serviceprice, serviceimage,servicecatagory) values(?,?,?,?,?)";
	const params = [
		serviceName,
		serviceDesc,
		servicePrice,
		imagePath,
		serviceCatagory,
	];
	executeQuery(sql, params, res, "product added successfully");
});
router.get("/product/:id", (req, res) => {
	const product = req.params.id;
	const sql = "select * from product where id =?";
	executeQuery(sql, [product], res, "single product retrived");
});
router.get("/service/:id", (req, res) => {
	const service = req.params.id;
	console.log(service);
	const sql = "select * from service where id =?";
	executeQuery(sql, [service], res, "single service retrieved");
});
module.exports = router;
