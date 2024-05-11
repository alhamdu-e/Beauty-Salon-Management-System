const express = require("express");
const router = express.Router();
const db = require("../database/connection.js");
const multer = require("multer");
const jwt = require("jsonwebtoken");

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
router.get("/profesionalRating/:id", (req, res) => {
	let id = req.params.id;
	console.log("hiiiii");
	const sql = "SELECT * from ratings_feedback where profesionalId = ? ";
	db.query(sql, [id], (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.json({ result });
		}
	});
});

router.get("/customerappointment/:id", (req, res) => {
	let id = req.params.id;
	console.log(id);
	const sql = "SELECT * FROM appointments where customerId = ? ";
	executeQuery(sql, [id], res);
});

router.get("/serviceInfo/:id", (req, res) => {
	let id = req.params.id;
	console.log(id);
	const sql = "SELECT * FROM service where id = ? ";
	executeQuery(sql, [id], res);
});

// ************************ update profesional photo ********************************

router.post("/rating", (req, res) => {
	console.log(req.body);
	const sql =
		"insert into ratings_feedback (profesionalId,rating,feedback) values (?,?,?) ";
	executeQuery(
		sql,
		[req.body.profesionalId, req.body.rating, req.body.feedback],
		res
	);
});
router.put(
	"/updatprofesionalphoto",
	upload.single("profesionaImage"),
	(req, res) => {
		const { profesionaID } = req.body;
		const fileName = req.file.filename;
		const imagePath = "http://127.0.0.1:5000/images/" + fileName;
		const sql = "update profesional set pimage = ? where id = ?";
		db.query(sql, [imagePath, profesionaID], (err, result) => {
			if (err) {
				console.log(err);
				return;
			}
			if (result.affectedRows > 0) {
				const sql = "select pimage from profesional where id  = ?";
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

router.put("/chengeappointmentStatus", (req, res) => {
	const appointmentId = req.body.id;
	const status = req.body.status;
	console.log(appointmentId, status);
	let sql = "";
	if (status === "Completed" || status === "completed") {
		sql = "update appointments set status ='In Progress' where id  = ?";
	}
	if (status === "In Progress") {
		sql = "update appointments set status ='Completed' where id  = ?";
	}

	executeQuery(sql, [appointmentId], res, "status Changed");
});

// router.put("/cancelAppointment", (req, res) => {
// 	console.log(req.body);
// 	const appointmentId = req.body.id;
// 	let sql = "update appointments set status ='Canceled' where id  = ?";

// 	// executeQuery(sql, [appointmentId], res, "status Changed");
// });
// ************************Retrive all apoointment for  admin page ********************************

router.get("/appointmentinformation", (req, res) => {
	const sql =
		"SELECT appointments.*, users.email AS userEmail,service.servicename, users.fname AS userFname, users.lname AS userLname,profesional.email AS profEmail,profesional.fname AS profFname,profesional.lname AS profLname FROM appointments INNER JOIN users ON appointments.customerId = users.id INNER JOIN profesional ON appointments.professionalId = profesional.id INNER JOIN service ON appointments.serviceId = service.id ";
	executeQuery(sql, [], res, "ALL employee RETRIVED");
});

router.get("/feedbacks", (req, res) => {
	const sql = "select * from feedback";
	executeQuery(sql, [], res, "ALL employee RETRIVED");
});

// ************************ inserting appointment  information to the database ********************************

// router.post("/appointment", (req, res) => {
// 	const {
// 		selectedProfessionalId,
// 		userId,
// 		date,
// 		startTime,
// 		endTime,
// 		serviceId,
// 	} = req.body;
// 	console.log(serviceId);
// 	const sql =
// 		"insert into appointments (customerId,professionalId,appointmentDate,startTime,endTime,serviceId) values (?,?,?,?,?,?)";
// 	const param = [
// 		userId,
// 		selectedProfessionalId,
// 		date,
// 		startTime,
// 		endTime,
// 		serviceId,
// 	];
// 	executeQuery(sql, param, res);
// });
router.put("/updatprofesionalpassword", (req, res) => {
	console.log(req.body);
	const sql = "update profesional set password = ? where id  =?";
	db.query(sql, [req.body.newPassword, req.body.PId], (err, result) => {
		if (err) {
			res.status(500);
		} else {
			console.log(result);
			res.status(200).json(result);
		}
	});
});

module.exports = router;
