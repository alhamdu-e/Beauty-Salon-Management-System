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
			console.log(successMessage);
			res.status(200).json(result);
		}
	});
};
// ******** rouets for retriving user information ****************
router.get("/customer", (req, res) => {
	const sql = "SELECT * FROM users";
	executeQuery(sql, [], res, "ALL CUSTOMER RETIVED");
});

// ************************************ Employee API *********************************
router.get("/employee", (req, res) => {
	const sql = "SELECT * FROM profesional";
	executeQuery(sql, [], res, "ALL employee RETRIVED");
});

router.get("/appointmentinformation", (req, res) => {
	const sql =
		"SELECT appointments.*, users.email AS userEmail,service.servicename, users.fname AS userFname, users.lname AS userLname,profesional.email AS profEmail,profesional.fname AS profFname,profesional.lname AS profLname FROM appointments INNER JOIN users ON appointments.customerId = users.id INNER JOIN profesional ON appointments.professionalId = profesional.id INNER JOIN service ON appointments.serviceId = service.id ";
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

router.post("/addEmployee", (req, res) => {
	const { fname, lname, email, phone, adress, age, gender, profesion } =
		req.body;
	const password = generatePassword();
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

router.put("/editEmployee", (req, res) => {
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
		id,
	} = req.body;
	const sql = `update profesional set fname=?,lname=?,email=?,phone=?,address=?,age=? ,gender=?,profession=?,password=? where id=?`;
	executeQuery(
		sql,
		[fname, lname, email, phone, adress, age, gender, profesion, password, id],
		res,
		"employe edited sucessfully"
	);
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
	const fileName = req.file.filename;
	const imagePath = "http://127.0.0.1:5000/images/" + fileName;

	const sql =
		"insert into product(productname, productdesc, productprice, productimage) values(?,?,?,?)";
	const params = [productName, productDesc, productPrice, imagePath];
	executeQuery(sql, params, res, "product added sucessfully");
});

router.get("/product", (req, res) => {
	const sql = "select * from product";

	executeQuery(sql, [], res, "ALL product RETRIVED");
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

router.put(
	"/updatprofesionalphoto",
	upload.single("profesionaImage"),
	(req, res) => {
		const { profesionaID } = req.body;
		const fileName = req.file.filename;
		const imagePath = "http://127.0.0.1:5000/images/" + fileName;
		const sql = "update profesional set address = ? where id = ?";
		db.query(sql, [imagePath, profesionaID], (err, result) => {
			if (err) {
				console.log(err);
				return;
			}
			if (result.affectedRows > 0) {
				console.log("product Updated");
			}
		});
	}
);

router.get("/product/:id", (req, res) => {
	const product = req.params.id;
	const sql = "select * from product where id =?";
	executeQuery(sql, [product], res, "single product retrived");
});

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

module.exports = router;
