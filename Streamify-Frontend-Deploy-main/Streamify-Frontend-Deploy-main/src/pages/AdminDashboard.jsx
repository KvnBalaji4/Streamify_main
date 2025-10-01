import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../components/AdminNavbar';
import AdminAddVideo from '../components/AdminAddVideo';
import Footer from '../components/Footer';
import './../assets/css/AdminDashboard.css';
import AddAdmin from '../components/AddAdmin';
import UserManager from '../components/UserManager';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  // Authenticate admin from session/localStorage
  useEffect(() => {
    const storedEmail = sessionStorage.getItem('email') || localStorage.getItem('username');
    const role = localStorage.getItem('role');

    if (storedEmail && role === "1") {
      setEmail(storedEmail);
    } else {
      navigate('/signin');
    }
  }, [navigate]);

  return (
    <div className="admin-dashboard">
      {/* Admin Navigation */}
      <AdminNavbar email={email} />

      {/* Main Dashboard Content */}
      <main className="dashboard-content">
        <h2>Welcome, Admin</h2>

        {/* You can show default components or dashboard widgets here */}
        

       
      </main>

      <Footer />
    </div>
  );
}
