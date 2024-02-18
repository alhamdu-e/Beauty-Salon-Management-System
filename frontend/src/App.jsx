import React from "react";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import Service from "./components/service";
import Appointment from "./components/pages/Appointment";
import Home from "./components/pages/Home";
import Admin from "./components/pages/Admin";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				{/* <Login /> */}
				{/* <Signup /> */}
				{/* <Service /> */}
				{/* <Appointment /> */}
				{/* <Home /> */}
				{/* <Admin /> */}

				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/admin" element={<Admin />} />
				<Route path="/appointment" element={<Appointment />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
