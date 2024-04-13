import "../../assets/styles/login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { FaRegEyeSlash } from "react-icons/fa6";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
    setErrorMessage(""); // Clear error message when email changes
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
    setErrorMessage("");
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    const errors = {};

    // Validate email format
    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Invalid email format.";
    }

    // Validate password length
    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters long.";
    }

    // Set validation errors if any
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // if (validateForm()) {
    //   const loginForm = {
    //     email,
    //     password,
    //   };

    const response = await fetch("http://127.0.0.1:5000/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "Application/json" },
    });

    if (response) {
      console.log(response);
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        localStorage.setItem("token", data.isAut);
        localStorage.setItem("userType", data.userType);
        if (data.userType === "admin") {
          navigate("/admin");
        } else if (data.userType === "user") {
          localStorage.setItem("userId", data.usersResult[0].id);
          navigate("/");
        } else if (data.userType === "profesional") {
          localStorage.setItem("userId", data.profesionalResult[0].id);
          navigate("/Professionalappoin");
        }
      } else if (!response.ok) {
        console.log("hi");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="login-container">
        <div className="loginform container">
          <div>
            <h3 className="login-h3">Login to GlowCity</h3>
          </div>
          <div>
            <label htmlFor="username">Email</label>
            <input
              type="text"
              placeholder="Email"
              name="email"
              id="username"
              onChange={handleChangeEmail}
            />
            {validationErrors.email && (
              <span className="errors">{validationErrors.email}</span>
            )}
            <br />
          </div>
          <div className="password-cont">
            <label htmlFor="password">Password</label>
            <input
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              onChange={handleChangePassword}
            />
            {validationErrors.password && (
              <span className="error-mesage">{validationErrors.password}</span>
            )}
            {password && (
              <button
                className="off-eye"
                type="button"
                onClick={handleShowPassword}
              >
                {!showPassword && <FaRegEyeSlash />}
                {showPassword && <MdOutlineRemoveRedEye />}
              </button>
            )}
            <br />
          </div>

          {errorMessage && <div className="error-message">{errorMessage}</div>}

          <div>
            <button className="login-button">Login</button>
          </div>
          <div>
            <span>
              Don't have an account? <Link to="/signup">Signup here.</Link>
            </span>{" "}
          </div>

          <div>
            <Link className="forget-button" to="/resetemail">
              Forget Password?
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Login;
