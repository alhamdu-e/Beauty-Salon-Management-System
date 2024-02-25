const mysql = require("mysql2");

const connection = mysql.createConnection({
	host: "127.0.0.1",
	user: "root",
	password: "1234",
	database: "glowcity",
});

module.exports = connection;
