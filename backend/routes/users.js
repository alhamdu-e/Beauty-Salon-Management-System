const express = require("express");
const router = express.Router();
const db = require("../database/connection.js");
const jwt = require("jsonwebtoken");

const secreteKey = "my secret key";

router.post("/signup", (req, res) => {
	const { fname, lname, email, password, age, phone, adress } = req.body;
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
				return res
					.status(200)
					.json({
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

router.get("/user/:id", (req, res) => {
	let id = req.params.id;
	const sql = "select * FROM users WHERE id =?";
	db.query(sql, [id], (err, result) => {
		if (err) {
			console.log(err);
			return;
		} else {
			res.status(200).json(result);
		}
	});
});
router.get("/profesionalAppointed/:id", (req, res) => {
	let id = req.params.id;
	console.log(id);
	const sql = "select * FROM appointments WHERE  professionalId=?";
	db.query(sql, [id], (err, result) => {
		if (err) {
			console.log(err);
			return;
		} else {
			res.status(200).json(result);
		}
	});
});

router.get("/profesional/available", (req, res) => {
	const sql = "select * FROM profesional";
	db.query(sql, (err, result) => {
		if (err) {
			console.log(err);
			return;
		} else {
			console.log(result);
			res.status(200).json(result);
		}
	});
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
	db.query(sql, param, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.status(200).json({ appoinmmet: "success" });
		}
	});
});

module.exports = router;
