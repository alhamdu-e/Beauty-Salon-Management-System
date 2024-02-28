import React from "react";
import Header from "../Header";
import "../../assets/styles/professionalappoin.css";

// JSX code
const Professionalappoin = () => {
    const appointment = {
      date: '2024-03-01',
      time: '10:00 AM',
      customerName: 'John Doe',
      phoneNumber: '123-456-7890',
    };
  
    return (
        <div>
            <Header />  
     <div className="procontainer">
          <h2 className="protitle">Appointment Details</h2>
        <div className="proinfo">
          <label className="prolabel">Date:</label>
    <div>{appointment.date}</div>
  </div>
  <div className="proinfo">
    <label className="prolabel">Time:</label>
    <div>{appointment.time}</div>
  </div>
  <div className="proinfo">
    <label className="prolabel">Customer Name:</label>
    <div>{appointment.customerName}</div>
  </div>
  <div className="proinfo">
    <label className="prolabel">Phone Number:</label>
    <div>{appointment.phoneNumber}</div>
  </div>
</div>
   </div> 

    );
  };
  
  export default Professionalappoin;