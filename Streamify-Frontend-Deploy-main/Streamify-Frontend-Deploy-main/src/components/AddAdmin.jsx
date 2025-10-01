import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from '../components/AdminNavbar';
import axios from "axios";
import "../assets/css/AddAdmin.css"; // Optional: Reuse dashboard styles

const AddAdmin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");   // ✅ new
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedInEmail, setLoggedInEmail] = useState("");

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("email") || localStorage.getItem("email");
    if (storedEmail) {
      setLoggedInEmail(storedEmail);
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:6086/api/addAdmin", {
        username,   // ✅ added
        email,
        password,
      });
      alert(response.data);
      setUsername(""); // ✅ reset
      setEmail("");
      setPassword("");
    } catch (error) {
      alert(error.response?.data || "Something went wrong");
    }
  };

  return (
    <>
      <AdminNavbar email={loggedInEmail} />
      <div className="form-container">
        <h2>Add Admin</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Add Admin</button>
        </form>
      </div>
    </>
  );
};

export default AddAdmin;
