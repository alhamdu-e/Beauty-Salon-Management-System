const express = require("express");
const router = express.Router();
const db = require("../database/connection.js");
const jwt = require("jsonwebtoken");
const sendEmail = require("../sendEmail.js");

const crypto = require("crypto");
const secreteKey = process.env.SECRET_KEY;

function encrypt(text, key) {
	const cipher = crypto.createCipher("aes-256-cbc", key);
	let encryptedText = cipher.update(text, "utf-8", "hex");
	encryptedText += cipher.final("hex");
	return encryptedText;
}

function decrypt(encryptedText, key) {
	const deciher = crypto.createDecipher("aes-256-cbc", key);
	let decryptedText = deciher.update(encryptedText, "hex", "utf-8");
	decryptedText += deciher.final("utf-8");
	return decryptedText;
}

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

// ************************ signup or user regisration ********************************

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

	db.query(
		sql,
		[fname, lname, email, adress, phone, age, password],
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
				res.send({ status: "User created" });
			}
		}
	);
});

// ************************ Login or user authentication ********************************

router.post("/login", (req, res) => {
	const { email, password } = req.body;

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
			const id = usersResult[0].id;
			const token = jwt.sign({ id, userType: "user" }, secreteKey);
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
				const id = profesionalResult[0].id;
				const token = jwt.sign({ id, userType: "profesional" }, secreteKey);
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
					const id = adminResult[0].id;
					const token = jwt.sign({ id, userType: "admin" }, secreteKey);
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

// ************************ check the availablity of email to reset passsword ********************************

router.get("/resetemail", (req, res) => {
	const sql = "SELECT * FROM users where email =? ";
	const sql1 = "SELECT * FROM profesional where email =? ";
	const email = req.query.email;

	const expirationTime = new Date();
	expirationTime.setHours(expirationTime.getHours() + 1);

	const callback = function (error, data, response) {
		if (error) {
			return;
		} else {
		}
	};
	const encryptedEmail = encrypt(email, secreteKey);
	const content = `<div style="background-color:#0a1b0b;width:500px;margin:auto;text-align:center; border-radius:12px; padding:20px">
		<h2 style="font-size: 24px;color:#f2f2f2"> Click The Link to reset the password</h2>
		<a href="http://localhost:3000/resetpassword/${btoa(
			expirationTime.getTime()
		)}/${encryptedEmail}" target="_blank" style="background-color:#ad3700;padding:12px;text-decoration:none;border-radius:12px;color:#f2f2f2"> Reset Password </a>
		<p style="color:#f2f2f2;margin-top:20px;"> The Link will expire after 1 hour<p/>
	</div>`;

	db.query(sql, [email], (err, result) => {
		if (err) {
			console.log(err);
			return;
		}
		if (result.length > 0) {
			res.status(200).json({ email: email });
			sendEmail(email, callback, content);
			return;
		} else {
			db.query(sql1, [email], (err, result) => {
				if (err) {
					console.log(err);
					return;
				}
				if (result.length > 0) {
					res.status(200).json({ email: email });
					sendEmail(email, callback, content);
				}
			});

			res.status(404).json({ userNotFound: true });
		}
	});
});

// ************************ reset  password  ********************************

router.post("/resetPassword", (req, res) => {
	const { password, email } = req.body;
	console.log("hi");
	const decryptedEmail = decrypt(email, secreteKey);

	const sqlRetriveUserData = "select * from users where email  = ?";
	const sqlUpdateUserpassword = `UPDATE users SET password= ? where email=?`;
	const sqlRetriveProfesionalData =
		"select * from profesional where email  = ?";
	const sqlUpdateProfesionalpassword = `UPDATE profesional SET password= ? where email=?`;

	db.query(sqlRetriveUserData, [decryptedEmail], (err, result) => {
		if (err) {
			console.log(err);
			res.status(500).json({ passwordUpdate: false });
			return;
		}

		if (result.length > 0) {
			db.query(
				sqlUpdateUserpassword,
				[password, decryptedEmail],
				(err, result) => {
					if (err) {
						console.log(err);
						res.status(500).json({ passwordUpdate: false });
						return;
					}
					if (result.affectedRows > 0) {
						res.status(200).json({ passwordUpdate: true });
						return;
					}
				}
			);
		} else {
			db.query(sqlRetriveProfesionalData, [decryptedEmail], (err, result) => {
				if (err) {
					res.status(500).json({ passwordUpdate: false });
					return;
				}
				if (result.length > 0) {
					db.query(
						sqlUpdateProfesionalpassword,
						[password, userEmail],
						(err, result) => {
							if (err) {
								res.status(500).json({ passwordUpdate: false });
								return;
							}
							if (result.affectedRows > 0) {
								res.status(200).json({ passwordUpdate: true });
								return;
							}
						}
					);
				} else {
					res.status(404).json({ passwordUpdate: false });
				}
			});
		}
	});
});

module.exports = router;
