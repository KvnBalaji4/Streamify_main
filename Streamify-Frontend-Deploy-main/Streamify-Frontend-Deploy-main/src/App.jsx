import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Signin from "./components/Signin";
import Signup from "./components/Signup"; // Import Signup component
import LandingPage from "./pages/LandingPage";
import DetailsPage from "./pages/DetailsPage";
import AdminDashboard from "./pages/AdminDashboard"; // Fixed typo
import AddAdmin from "./components/AddAdmin";
import UserManager from "./components/UserManager";
import WatchPage from './pages/WatchPage'; // ✅ Correct relative path
import AdminAddVideo from './components/AdminAddVideo';
import PaymentPage from "./payment";
import MyListPage from "./pages/MyListPage";

const App = () => {
  return (
    <Router basename="/">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} /> {/* Add Signup Route */}

        {/* Admin Dashboard with dynamic section path */}
        <Route path="/adminDashboard" element={<AdminDashboard />} />

        
        {/* UserDashboard route - make sure it's correct if this needs to be a separate page */}
        <Route path="/userDashboard" element={<LandingPage />} />

        {/* Additional admin related routes */}
       
        
        <Route path="/watch/:fileId" element={<WatchPage />} />
        <Route path="/AddVideo" element={<AdminAddVideo />} />
        <Route path="/AddAdmin" element={<AddAdmin/>}/>
        <Route path="/UsersList" element={<UserManager />} />
        <Route path="/payment" element={<PaymentPage/>}/>
        {/* You can add a specific route for DetailsPage if necessary */}
        <Route path="/details/:id" element={<DetailsPage />} />
        <Route path="/my-list" element={<MyListPage />} />
      </Routes>
    </Router>
  );
};

export default App;
