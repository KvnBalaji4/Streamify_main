import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";
import "../assets/css/UserManager.css";

let debounceTimer;

const UserManager = () => {
  const [searchEmail, setSearchEmail] = useState("");
  const [users, setUsers] = useState([]);
  const [currentUserEmail, setCurrentUserEmail] = useState("");
  const [deletingUsername, setDeletingUsername] = useState(null);

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("email");
    if (storedEmail) setCurrentUserEmail(storedEmail);
  }, []);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => fetchUsers(searchEmail), 400);
  }, [searchEmail]);

  const fetchUsers = async (email = "") => {
    try {
      const res = await axios.get("http://localhost:6086/api/users/search", {
        params: { email },
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const handleDelete = async (username) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete ${username}?`);
    if (!confirmDelete) return;

    try {
      setDeletingUsername(username);
      await axios.delete("http://localhost:6086/api/users/deleteByUsername", {
        params: { username },
      });

      alert("User deleted successfully");
      fetchUsers(searchEmail);
    } catch (err) {
      alert("Failed to delete user");
      console.error(err);
    } finally {
      setDeletingUsername(null);
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
            <th>Username</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.email}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    onClick={() => handleDelete(user.username)}
                    disabled={deletingUsername === user.username}
                  >
                    {deletingUsername === user.username ? "Deleting..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserManager;
