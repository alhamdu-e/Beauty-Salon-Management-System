import { useState } from "react";
import "../../assets/styles/signup.css";

function Signup() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
    setAddress(event.target.value);
  };
  const handleChangeAge = (event) => {
    setAge(event.target.value);
  };

  const signupform = {
    fname,
    lname,
    email,
    phone,
    address,
    age,
    password,
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:5000/signup", {
        method: "POST",
        body: JSON.stringify(signupform),
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
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="fullsign">
	  
 <h1 className="signup-title">Signup</h1>
        <div className="signlogin-container">
		
          <div className="signup">
		 
            <div className="signupform container">
              <div>
                <label htmlFor="firstname">First Name</label>
                <input
                  type="text"
                  name="firstname"
                  id="firstname"
                  placeholder="First Name"
                  onChange={handleChangeFirstName}
                />
              </div>

              <div>
                <label htmlFor="lastname">Last Name</label>
                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  placeholder="Last Name"
                  onChange={handleChangeLastName}
                />
              </div>

              <div>
                <label htmlFor="age">Age</label>
                <input
                  type="number"
                  name="age"
                  id="age"
                  placeholder="Your Age"
                  onChange={handleChangeAge}
                />
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
              </div>

              <div>
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  placeholder="Your Address"
                  onChange={handleChangeAddress}
                />
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