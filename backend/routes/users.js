const express = require("express");
const router = express.Router();
const db = require("../database/connection.js");
const jwt = require("jsonwebtoken");
const sendEmail = require("../sendEmail.js");

const crypto = require("crypto");



const secreteKey = "my secret key";

const executeQuery = (sql, params = [], res) => {
	db.query(sql, params, (err, result) => {
		if (err) {
			console.log(err);
			res.status(500).json({ message: "Database Erroe" });
		} else {
			res.status(200).json(result);
		}
	});
};

router.post("/signup", (req, res) => {
	const { fname, lname, email, password, age, phone, adress } = req.body;

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
	</div>`;

	sendEmail(email, callback, content);

	const sql =
		"insert into users (fname,lname,email,adress,phone,age,password) values (?, ?, ?, ?, ?,?,?)";
	const sql1 = "insert into account (email,password) values (?, ?)";
	db.query(
		sql,
		[fname, lname, email, adress, phone, age, password],
		(err, result) => {
			if (!err) {
				res.send({ status: "User created" });
			} else {
				console.log(err);
				res.status(400);
			}
		}
	);
});
router.post("/login", (req, res) => {
	const { email, password } = req.body;
	const token = jwt.sign({}, secreteKey);
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
			console.log("user");
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

// router.get("/user/:id", (req, res) => {
// 	let id = req.params.id;
// 	const sql = "select * FROM users WHERE id =?";
// 	executeQuery(sql, [id], res);
// 	// db.query(sql, [id], (err, result) => {
// 	// 	if (err) {
// 	// 		console.log(err);
// 	// 		return;
// 	// 	} else {
// 	// 		res.status(200).json(result);
// 	// 	}
// 	// });
// });
router.get("/profesionalAppointed/:id", (req, res) => {
	let id = req.params.id;

	const sql = "select * FROM appointments WHERE  professionalId=?";
	executeQuery(sql, [id], res);

	// db.query(sql, [id], (err, result) => {
	// 	if (err) {
	// 		console.log(err);
	// 		return;
	// 	} else {
	// 		res.status(200).json(result);
	// 	}
	// });
});

router.get("/profesional/available", (req, res) => {
	const sql = "select * FROM profesional";
	executeQuery(sql, res);

	// db.query(sql, (err, result) => {
	// 	if (err) {
	// 		console.log(err);
	// 		return;
	// 	} else {
	// 		console.log(result);
	// 		res.status(200).json(result);
	// 	}
	// });
});
router.post("/appointment", (req, res) => {
	console.log("hi");
	const {
		selectedProfessionalId,
		userId,
		date,
		startTime,
		endTime,
		serviceId,
	} = req.body;
	console.log(serviceId);
	const sql =
		"insert into appointments (customerId,professionalId,appointmentDate,startTime,endTime,serviceId) values (?,?,?,?,?,?)";
	const param = [
		userId,
		selectedProfessionalId,
		date,
		startTime,
		endTime,
		serviceId,
	];
	executeQuery(sql, param, res);

	// db.query(sql, param, (err, result) => {
	// 	if (err) {
	// 		console.log(err);
	// 	} else {
	// 		res.status(200).json({ appoinmmet: "	" });
	// 	}
	// });
});

module.exports = router;
