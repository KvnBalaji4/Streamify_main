import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './../assets/css/Signin.css';

const Signin = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        if (!username || !password) {
            setError("Please enter both username and password.");
            return;
        }

        try {
            const response = await fetch("http://localhost:6086/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (data.status === 200) {
                // Save JWT token
                localStorage.setItem("jwtToken", data.token);
                localStorage.setItem("role", data.role);
                localStorage.setItem("username", data.username);
                localStorage.setItem("email", data.email);


                // Redirect based on role
               if (Number(data.role) === 1) {
  navigate("/adminDashboard"); // ✅ matches App.jsx
} else {
  navigate("/userDashboard");
}
  

            } else {
                setError(data.message || "Login failed");
            }
        } catch (err) {
            setError("Login failed. Please try again.");
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
