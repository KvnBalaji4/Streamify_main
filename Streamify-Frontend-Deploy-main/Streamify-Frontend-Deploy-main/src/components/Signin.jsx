import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import './../assets/css/Signin.css';

const Signin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const recaptchaRef = useRef(null);

  // put your site key in an env variable, e.g. REACT_APP_RECAPTCHA_SITE_KEY
  const RECAPTCHA_SITE_KEY = import.meta.env.VITE_REACT_APP_RECAPTCHA_SITE_KEY;


  const handleLogin = async () => {
    setError("");
    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }

    // execute or get token from the widget
    const token = await recaptchaRef.current?.getValue();
    if (!token) {
      setError("Please complete the reCAPTCHA.");
      return;
    }

    try {
      const response = await fetch("http://localhost:6086/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, recaptchaToken: token }),
      });

      const data = await response.json();

      if (data.status === 200) {
        // Save JWT token
        localStorage.setItem("jwtToken", data.token);
        localStorage.setItem("role", data.role);
        localStorage.setItem("username", data.username);
        localStorage.setItem("email", data.email);

        // reset captcha widget
        recaptchaRef.current.reset();

        // Redirect based on role
        if (Number(data.role) === 1) {
          navigate("/adminDashboard");
        } else {
          navigate("/userDashboard");
        }
      } else {
        setError(data.message || "Login failed");
        // reset captcha if validation failed so user can retry
        recaptchaRef.current.reset();
      }
    } catch (err) {
      console.error(err);
      setError("Login failed. Please try again.");
      recaptchaRef.current.reset();
    }
  };

  return (
    <div className="signin-container">
      <h1 className="title">Streamify</h1>
      <div className="signin-box">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="recaptcha-container">
  <ReCAPTCHA
    sitekey={RECAPTCHA_SITE_KEY}
    ref={recaptchaRef}
  />
</div>


        <button className="signin-button" onClick={handleLogin}>
          Sign In
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <p>
          Don't have an account?{" "}
          <span className="link" onClick={() => navigate("/signup")}>Sign Up</span>
        </p>
      </div>
    </div>
  );
};

export default Signin;
