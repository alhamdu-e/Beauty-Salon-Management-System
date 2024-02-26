import React, { useState } from "react";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import Service from "./components/service";
import Appointment from "./components/pages/Appointment";
import Home from "./components/pages/Home";
import Admin from "./components/pages/Admin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "./components/pages/Cart";
import About from "./components/pages/About";
import Services from "./components/Services";
import Makeup from "./components/pages/Makeup";
import Professional from "./components/pages/Professional";

function App() {
  const [serviceHour, setServiceHour] = useState("");
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
        <Route
          path="/appointment"
          element={<Appointment serviceHour={serviceHour} />}
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/makeup"
          element={<Makeup setServiceHour={setServiceHour} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
