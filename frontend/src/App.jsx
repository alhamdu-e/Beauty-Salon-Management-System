import React from "react";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import Service from "./components/service";
import Appointment from "./components/pages/Appointment";
import Home from "./components/pages/Home";
import Admin from "./components/pages/Admin";

function App() {
	// Example in a React component
	// fetch("http://127.0.0.1:5000/login")
	// 	.then((response) => response.json())
	// 	.then((data) => console.log("Server Response:", data.message))
	// 	.catch((error) => console.error("Error fetching data:", error));

	return (
		<div>
			{/* <Login /> */}
			{/* <Signup /> */}
			{/* <Service /> */}
			{/* <Appointment /> */}
			<Home />
			<Admin />
		</div>
	);
}

export default App;
