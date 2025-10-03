import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import MovieSection from "../components/MovieSection";
import Footer from "../components/Footer";

const MyListPage = () => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const username = localStorage.getItem("username"); // ✅ now using username
    fetch(`http://localhost:6086/api/watchlist?username=${username}`)
      .then((res) => res.json())
      .then((data) => setWatchlist(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <Navbar />
      <h2 style={{ margin: "20px" }}>My Watchlist</h2>
      <MovieSection title="My List" movies={watchlist} />
      <Footer />
    </div>
  );
};

export default MyListPage;
