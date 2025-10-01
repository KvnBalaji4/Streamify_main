import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";
import "../assets/css/UserManager.css";

let debounceTimer;

const UserManager = () => {
  const [searchEmail, setSearchEmail] = useState("");
  const [users, setUsers] = useState([]);
  const [currentUserEmail, setCurrentUserEmail] = useState("");
  const [deletingEmail, setDeletingEmail] = useState(null);

  // Get logged-in email from sessionStorage
  useEffect(() => {
    const storedEmail = sessionStorage.getItem("email");
    if (storedEmail) {
      setCurrentUserEmail(storedEmail);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchUsers();
  }, []);

  // Debounced email search
  useEffect(() => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      fetchUsers(searchEmail);
    }, 400);
  }, [searchEmail]);

  const fetchUsers = async (email = "") => {
    try {
      const response = await axios.get("http://localhost:6086/api/users/search", {
        params: { email },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleDelete = async (userEmail) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete ${userEmail}?`);
    if (!confirmDelete) return;

    try {
      setDeletingEmail(userEmail);
      await axios.delete("http://localhost:6086/api/users/delete", {
        params: { email: userEmail },
      });
      alert("User deleted successfully");
      fetchUsers(searchEmail);
    } catch (error) {
      alert("Failed to delete user");
      console.error(error);
    } finally {
      setDeletingEmail(null);
    }
  };

  return (
    <div className="user-manager-container">
      <AdminNavbar email={currentUserEmail} />

      <h2>User Manager</h2>

      <input
        type="text"
        value={searchEmail}
        onChange={(e) => setSearchEmail(e.target.value)}
        placeholder="Search by email (starts with...)"
        className="search-input"
      />

      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.email}>
                <td>{user.email}</td>
                <td>
                  <button
                    onClick={() => handleDelete(user.email)}
                    disabled={deletingEmail === user.email}
                  >
                    {deletingEmail === user.email ? "Deleting..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserManager;
