import React from "react";
import Header from "../Header";
import "../../assets/styles/professionalappoin.css";

const Professionalappoin = () => {
  const appointments = [
    {
      date: '2024-03-01',
      StartTime: '10:00 AM',
      EndTime: '12:00 AM',
      customerName: 'John Doe',
      phoneNumber: '123-456-7890',
    },
    {
      date: '2024-03-02',
      StartTime: '10:00 AM',
      EndTime: '12:00 AM',    
      customerName: 'Jane Smith',
      phoneNumber: '987-654-3210',
    },
    {
      date: '2024-03-02',
      StartTime: '10:00 AM',
      EndTime: '12:00 AM',
      customerName: 'Jane Smith',
      phoneNumber: '987-654-3210',
    },
    {
      date: '2024-03-02',
      StartTime: '10:00 AM',
      EndTime: '12:00 AM',
      customerName: 'Jane Smith',
      phoneNumber: '987-654-3210',
    },
    
    {
      date: '2024-03-02',
      StartTime: '10:00 AM',
      EndTime: '12:00 AM',
      customerName: 'Jane Smith',
      phoneNumber: '987-654-3210',
    },
    {
      date: '2024-03-02',
      StartTime: '10:00 AM',
      EndTime: '12:00 AM',
      customerName: 'Jane Smith',
      phoneNumber: '987-654-3210',
    },
    {
      date: '2024-03-02',
      StartTime: '10:00 AM',
      EndTime: '12:00 AM',
      customerName: 'Jane Smith',
      phoneNumber: '987-654-3210',
    },
    {
      date: '2024-03-02',
      StartTime: '10:00 AM',
      EndTime: '12:00 AM',
      customerName: 'Jane Smith',
      phoneNumber: '987-654-3210',
    },
    // Add more appointments here
  ];

  return (
    <div>
     
      <div className="procontainer">
        <h2 className="protitle">Appointment Details</h2>
        {appointments.map((appointment, index) => (
          <div className="proinfo" key={index}>
            <div className="prow">
              <div className="plabel plabel-customer">Customer</div>


              <div className="plabel">Phone </div>


              <div className="plabel">Date</div>


              <div className="plabel">StartTime</div>
              <div className="plabel">EndTime</div>


            </div>
            <div className="porow">
            <div className="pinfo">{appointment.customerName}</div>

            <div className="pinfo">{appointment.phoneNumber}</div>

            <div className="pinfo">{appointment.date}</div>

            <div className="pinfo">{appointment.StartTime}</div>
            <div className="pinfo">{appointment.EndTime}</div>

            </div>
           
          </div>
        ))}
      </div>
    </div>
  );
};

export default Professionalappoin;