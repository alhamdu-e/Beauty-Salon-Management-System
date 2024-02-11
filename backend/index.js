const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./database/connection");
app.use(cors());

db.connect((error) => {
	if (error) {
		console.log(error);
		return;
	}

	console.log("connected succesfully");
});
app.get("/login", (req, res) => {
	res.json({ message: "this alhamdu" });
});

app.listen(5000, () => {
	console.log("server started on 5000");
});
