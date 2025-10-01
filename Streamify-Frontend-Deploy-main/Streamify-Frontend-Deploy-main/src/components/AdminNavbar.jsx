import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/AdminNavbar.css';

export default function AdminNavbar({ username }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <span className="title" onClick={() => navigate('/AdminDashboard')} style={{ cursor: 'pointer' }}>
        Streamify
      </span>

      <div className="nav-right">
        <ul className="nav-links">
          <li onClick={() => navigate('/AddAdmin')}>Add Admin</li>
          <li onClick={() => navigate('/UsersList')}>Users List</li>
          <li onClick={() => navigate('/AddVideo')}>Add Video</li>
        </ul>
        <div className="user-info">
          <img src="/images/profile.png" alt="User Avatar" className="user-avatar" />
          <span className="user-email">{username || "Admin"}</span>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </nav>
  );
}
