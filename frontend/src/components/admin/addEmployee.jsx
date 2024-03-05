import { useState } from "react";
import "../../assets/styles/Admin/addEmployee.css";

function AddEmployee(props) {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [gender, setGender] = useState("");
  const [profesion, setProfesion] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [adress, setAdress] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleChangeFirstName = (event) => {
    setFname(event.target.value);
  };
  const handleChangeGender = (event) => {
    setGender(event.target.value);
  };
  const handleChangeProfesion = (event) => {
    setProfesion(event.target.value);
  };
  const handleChangeLastName = (event) => {
    setLname(event.target.value);
  };
  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleChangeConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };
  const handleChangePhone = (event) => {
    setPhone(event.target.value);
  };
  const handleChangeAddress = (event) => {
    setAdress(event.target.value);
  };
  const handleChangeAge = (event) => {
    setAge(event.target.value);
  };

  const validateForm = () => {
    let errors = {};

    if (!fname) {
      errors.fname = "First Name is required";
    } else if (!/^[a-zA-Z]+$/.test(fname)) {
      errors.fname = "First Name should only contain letters";
    }

    if (!lname) {
      errors.lname = "Last Name is required";
    } else if (!/^[a-zA-Z]+$/.test(lname)) {
      errors.lname = "Last Name should only contain letters";
    }

    if (!email) {
      errors.email = "Email is required";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      errors.email = "Email is invalid";
    }

    if (!phone) {
      errors.phone = "Phone is required";
    } else if (!/^\d{10}$/.test(phone)) {
      errors.phone = "Phone should be a 10-digit number";
    }

    if (!age) {
      errors.age = "Age is required";
    } else if (age < 20 || age > 45) {
      errors.age = "Age should be between 20 and 45";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 8) {
      errors.password = "Password should be at least 8 characters long";
    }

    if (!confirmPassword) {
      errors.confirmPassword = "Confirm Password is required";
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    if (!gender) {
      errors.gender = "Gender is required";
    }

    if (!profesion) {
      errors.profession = "Profession is required";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const addemployee = {
    fname,
    lname,
    email,
    phone,
    adress,
    age,
    password,
    gender,
    profesion,
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      try {
        const response = await fetch("http://127.0.0.1:5000/addEmployee", {
          method: "POST",
          body: JSON.stringify(addemployee),
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          console.log("user registered");
        } else {
          console.log("user not registered", response.statusText);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <div className="conatnerforaddemployee">
        <button className="add">&#43;</button>
        <button
          className="manage-employe-button"
          onClick={props.handleEmployee}
        >
          Manage Employee
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="addemployee container">
          <div>
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              name="firstname"
              id="firstname"
              placeholder="FirstName"
              onChange={handleChangeFirstName}
            />
            {errors.fname && <span className="error">{errors.fname}</span>}
          </div>
          <div>
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              name="lastname"
              id="lastname"
              placeholder="LastName"
              onChange={handleChangeLastName}
            />
            {errors.lname && <span className="error">{errors.lname}</span>}
          </div>
          <div>
            <label htmlFor="age">Age</label>
            <input
              type="number"
              name="age"
              id="age"
              placeholder="your age"
              onChange={handleChangeAge}
            />
            {errors.age && <span className="error">{errors.age}</span>}
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              onChange={handleChangeEmail}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div>
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              name="phone"
              id="phone"
              placeholder="Phone"
              onChange={handleChangePhone}
            />
            {errors.phone && <span className="error">{errors.phone}</span>}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              onChange={handleChangePassword}
            />
            {errors.password && (
              <span className="error">{errors.password}</span>
            )}
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleChangeConfirmPassword}
            />
            {errors.confirmPassword && (
              <span className="error">{errors.confirmPassword}</span>
            )}
          </div>
          <div>
            <label htmlFor="adress">Adress</label>
            <input
              type="text"
              name="address"
              id="address"
              placeholder="Your Adress"
              onChange={handleChangeAddress}
            />
          </div>

          <div>
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              name="gender"
              className="serviceform-select"
              onChange={handleChangeGender}
            >
              <option selected disabled>
                Select Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.gender && <span className="error">{errors.gender}</span>}
          </div>

          <div>
            <label htmlFor="profession">Professional Type</label>
            <select
              id="profession"
              name="profession"
              className="serviceform-select"
              onChange={handleChangeProfesion}
            >
              <option selected disabled>
                Select Professional Type
              </option>
              <option value="nail">Nail stylist</option>
              <option value="hair">Hair stylist</option>
              <option value="makeup">Makeup stylist</option>
            </select>
            {errors.profession && (
              <span className="error">{errors.profession}</span>
            )}
          </div>

          <button className="addemployee-a" type="submit">
            Add Employee{" "}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddEmployee;
