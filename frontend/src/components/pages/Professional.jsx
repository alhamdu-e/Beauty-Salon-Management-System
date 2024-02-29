import React from "react";
import "../../assets/styles/professional.css";

export default function Professional() {
  return (
    <div className="appointment-container">
      <h1>Book an Appointment</h1>
      <form>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input type="tel" id="phone" name="phone" />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input type="date" id="date" name="date" />
        </div>
        <div className="form-group">
          <label htmlFor="time">Time</label>
          <input type="time" id="time" name="time" />
        </div>
        <button type="submit">Book Appointment</button>
      </form>
    </div>
  );
}
