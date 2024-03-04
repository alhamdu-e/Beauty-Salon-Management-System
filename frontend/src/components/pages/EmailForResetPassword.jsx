import { useState } from "react";
import "../../assets/styles/resetEmail.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/Autcontext";
import { useEffect } from "react";

function EmailForResetPassword() {
  const [Email, setEmail] = useState("");

  console.log("hi");
  const [visiblity, setVisiblity] = useState(false);
  const [isUser, setUser] = useState(true);

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/resetemail?email=${Email}`
      );

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("email", data.email);
        setVisiblity(true);
        setUser(true);
      }
      if (response.status === 404) {
        console.log("hi");
        setVisiblity(true);
        setUser(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="resetEmail-container">
      {isUser && (
        <p
          className={visiblity ? "password-reset-p" : "password-reset-p hidden"}
        >
          We sent you a link to your email.Please check your email
        </p>
      )}
      {!isUser && (
        <p
          className={visiblity ? "password-reset-p" : "password-reset-p hidden"}
        >
          Email Not Found!
        </p>
      )}
      <form onSubmit={handlesubmit}>
        <div className="resetEmail-container-div">
          <h3 className="reset-h3">Foregt Password</h3>
          <label htmlFor="">Enter Your Email to Reset Password</label>
          <input
            type="text"
            onChange={handleChangeEmail}
            className="input-for-reset-email"
          />
          <br />
          <button className="sendEmailbuton" type="submit">
            submit
          </button>{" "}
          <Link className="sendEmailbuton cancel" to="/login">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

export default EmailForResetPassword;
