const mysql = require("mysql2");

const connection = mysql.createConnection({
	host: "127.0.0.1",
	user: "root",
	password: "Aa19880726*",
	database: "glowcity",
});

module.exports = connection;
