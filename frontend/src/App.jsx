import React, { useState } from "react";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import Appointment from "./components/pages/Appointment";
import Home from "./components/pages/Home";
import Admin from "./components/pages/Admin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "./components/pages/Cart";
import About from "./components/pages/About";
import Makeup from "./components/pages/Makeup";
import Professionalappoin from "./components/pages/Professionalappoin";
import EmailForResetPassword from "./components/pages/EmailForResetPassword";
import ResetPassword from "./components/pages/resetPassword";

function App() {
  const [serviceHour, setServiceHour] = useState("");
  const [serviceId, setServiceID] = useState("");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<Admin />} />
        <Route
          path="/appointment"
          element={
            <Appointment serviceHour={serviceHour} serviceId={serviceId} />
          }
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route path="/professionalappoin" element={<Professionalappoin />} />

        <Route path="/resetemail" element={<EmailForResetPassword />} />
        <Route path="/resetpassword/:expiration" element={<ResetPassword />} />
        <Route
          path="/makeup"
          element={
            <Makeup
              setServiceHour={setServiceHour}
              setServiceID={setServiceID}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
