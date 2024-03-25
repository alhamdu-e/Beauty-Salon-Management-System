import { useState } from "react";
import "../../assets/styles/signup.css";
function Signup() {
  // Example in a React component
  // fetch("http://127.0.0.1:5000/login")
  // 	.then((response) => response.json())
  // 	.then((data) => console.log("Server Response:", data.message))
  // 	.catch((error) => co nsole.error("Error fetching data:", error));

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [adress, setAdress] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const handleChangeFirstName = (event) => {
    setFname(event.target.value);
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
      errors.fname = "fname is required";
    } else if (!fname.match(/^[A-Za-z]+$/)) {
      errors.fname = "First name must contain only characters.";
    }

    if (!lname.match(/^[A-Za-z]+$/)) {
      errors.lname = "Last name must contain only characters.";
    }

    if (!age) {
      errors.age = "age is required";
    } else if (age < 4 || age > 120) {
      errors.age = "Age must be between 4 and 120.";
    }
    if (!email) {
      errors.email = "email is required";
    } else if (!email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
      errors.email = "Invalid email format.";
    }
    if (!phone) {
      errors.email = "phone is required";
    } else if (!phone.match(/^(09|07)\d{8}$/)) {
      errors.phone = "Invalid phone number format.";
    }

    if (!adress.match(/^(?=.*[A-Za-z])[A-Za-z\d\s,-]+$/)) {
      errors.adress =
        "Address must contain letters and cannot be only numbers.";
    }
    if (!password) {
      errors.email = "password is required";
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters long.";
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      try {
        const signupForm = {
          fname,
          lname,
          email,
          phone,
          adress,
          age,
          password,
        };

        const response = await fetch("http://127.0.0.1:5000/signup", {
          method: "POST",
          body: JSON.stringify(signupForm),
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          console.log("User registered");
        } else {
          console.log("User not registered", response.statusText);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="fullsign">
        <div className="signlogin-container">
          <div className="signup">
            <div className="signupform container">
              <div>
                <label htmlFor="firstname">First Name</label>
                <input
                  type="text"
                  name="firstname"
                  id="firstname"
                  placeholder="FirstName"
                  onChange={handleChangeFirstName}
                />{" "}
                {validationErrors.fname && (
                  <span className="error">{validationErrors.fname}</span>
                )}
              </div>

              <div>
                <label htmlFor="lastname">Last Name</label>
                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  placeholder="LastName"
                  onChange={handleChangeLastName}
                />{" "}
                {validationErrors.lname && (
                  <span className="error">{validationErrors.lname}</span>
                )}
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
                {validationErrors.age && (
                  <span className="error">{validationErrors.age}</span>
                )}
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  onChange={handleChangeEmail}
                />
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
                {validationErrors.phone && (
                  <span className="error">{validationErrors.phone}</span>
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
                {validationErrors.adress && (
                  <span className="error">{validationErrors.adress}</span>
                )}
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
                {validationErrors.password && (
                  <span className="error">{validationErrors.password}</span>
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
                {validationErrors.confirmPassword && (
                  <span className="error">
                    {validationErrors.confirmPassword}
                  </span>
                )}
              </div>
              <button type="submit" className="signupform-a">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
export default Signup;
