import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./../assets/css/Homepage.css";

const Homepage = () => {
    const navigate = useNavigate();  // Initialize navigate function

    return (
        <div className="homepage">
            <div className="overlay"></div>

            <h1 className="title">Streamify</h1>

            <div className="content-container">
                <div className="left-content">
                    <p>Starts at only <br />₹149/month</p>
                </div>

                <div className="right-content">
                    <p>Endless entertainment,<br /> anytime, anywhere.<br />Your stories, your way</p>
                    <div className="buttons">
                        <button className="signin" onClick={() => navigate("/signin")}>Sign In</button>
                        <button className="signup" onClick={() => navigate("/signup")}>SignUp</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Homepage;
