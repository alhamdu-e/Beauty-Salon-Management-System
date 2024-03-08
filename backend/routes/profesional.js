const express = require("express");
const router = express.Router();
const db = require("../database/connection.js");
const multer = require("multer");

// ************************ handle incoming file ********************************

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		return cb(null, "./public/images");
	},
	filename: function (req, file, cb) {
		return cb(null, file.originalname);
	},
});
const upload = multer({ storage: storage });

// ************************ function that Excute Query ********************************
const executeQuery = (sql, params = [], res) => {
	db.query(sql, params, (err, result) => {
		if (err) {
			console.log(err);
			res.status(500).json({ message: "Database Erroe" });
		} else {
			console.log(result);
			res.status(200).json(result);
			// res.status(400);
		}
	});
};

// ************************ query that retrive all prpfesional for admin page ********************************

router.get("/profesional/available", (req, res) => {
	const sql = "select * FROM profesional";
	executeQuery(sql, [], res);
});

// ************************ retrive specific  professional data ********************************

router.get("/profesionalData/:id", (req, res) => {
	let id = req.params.id;

	const sql = "select * FROM profesional where id =?";
	executeQuery(sql, [id], res);
});

// ************************ retrive specfic profesional appointment based on id ********************************

router.get("/profesionalAppointed/:id", (req, res) => {
	let id = req.params.id;

	const sql =
		"SELECT appointments.*, service.servicename, users.fname AS userFname,users.lname AS userLname FROM appointments INNER JOIN users ON appointments.customerId = users.id  INNER JOIN service ON appointments.serviceId = service.id where appointments.professionalId = ? ";
	executeQuery(sql, [id], res);
});

// ************************ update profesional photo ********************************

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
				const sql = "select address from profesional where id  = ?";
				db.query(sql, [profesionaID], (err, result) => {
					if (err) {
						console.log(err);
					} else {
						res.status(200).json(result);
					}
				});
			}
		});
	}
);

// ************************Retrive all apoointment for  admin page ********************************

router.get("/appointmentinformation", (req, res) => {
	const sql =
		"SELECT appointments.*, users.email AS userEmail,service.servicename, users.fname AS userFname, users.lname AS userLname,profesional.email AS profEmail,profesional.fname AS profFname,profesional.lname AS profLname FROM appointments INNER JOIN users ON appointments.customerId = users.id INNER JOIN profesional ON appointments.professionalId = profesional.id INNER JOIN service ON appointments.serviceId = service.id ";
	executeQuery(sql, [], res, "ALL employee RETRIVED");
});

// ************************ inserting appointment  information to the database ********************************

router.post("/appointment", (req, res) => {
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
});

module.exports = router;
