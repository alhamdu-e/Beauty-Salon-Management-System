const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const path = require("path");
app.use(express.json());
const adminRoutes = require("./routes/admin.js");
const userRoutes = require("./routes/users.js");
const ProfesionalRoutes = require("./routes/profesional.js");
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.use(adminRoutes);
app.use(userRoutes);
app.use(ProfesionalRoutes);

app.listen(5000, () => {
	console.log("server started on 5000");
});
