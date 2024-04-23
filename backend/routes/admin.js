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
	const { fname, lname, email, phone, adress, age, gender, profesion } =
		req.body;
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

	const content = `<div style="background-color:#0a1b0b;width:500px;margin:auto;text-align:center; border-radius:12px; padding:20px">
		<h2 style="font-size: 24px;color:#f2f2f2"> Welcome ${fname}</h2>
		<p style="color:#f2f2f2"">You Have Successfully Registered ✔✔✔</p>
		<p style="color:#f2f2f2"">Your Password is ${password}</p>
	</div>`;

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
			adress,
			password,
			imagePath,
		],
		(err, result) => {
			if (err) {
				if (err.code === "ER_DUP_ENTRY") {
					console.log("dupliated");
					res.status(400).json({ error: "User Exist!!!" });
				} else {
					console.log("dupliate");
					console.error(err);
					res.status(500).json({ error: "Internal server error" });
				}
			} else {
				res.send({ status: "Employee Created" });
			}
		}
	);
});

router.put("/editEmployee", upload.single("image"), (req, res) => {
	const { fname, lname, email, phone, adress, age, gender, profesion, id } =
		req.body;
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
		values = [fname, lname, email, phone, adress, age, gender, profesion, id];
	}
	executeQuery(sql, values, res, "employe edited sucessfully");
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
	const { productName, productDesc, productPrice } = req.body;
	if (!req.file) {
		res.status(400);

		return;
	}
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

	executeQuery(sql, values, res, "service Edited Successfully");
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
	executeQuery(sql, params, res, "product added successfully");
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
