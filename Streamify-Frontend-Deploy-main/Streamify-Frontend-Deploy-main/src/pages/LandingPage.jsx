import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import HeroBanner from "../components/HeroBanner";
import MovieSection from "../components/MovieSection";
import Footer from "../components/Footer";
import "../assets/css/LandingPage.css";

const LandingPage = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    fetch("http://localhost:6086/api/videos")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch videos");
        return res.json();
      })
      .then((data) => {
        setMovies(data);

        // collect all unique genres
        const allGenres = [
          ...new Set(data.flatMap((movie) => movie.genres || [])),
        ];
        setGenres(allGenres);
      })
      .catch((err) => {
        console.error("Error fetching videos:", err);
      });
  }, []);

  return (
    <div className="LandingPage">
      <Navbar />

      {/* Banner - you can reuse movies[0..n] */}
      <HeroBanner bannerImages={movies.map((m) => ({
        src: m.thumbnailUrl,
        title: m.title,
        desc: m.description,
        driveFileId: m.driveFileId,
      }))} />

      {/* Explore section */}
      <MovieSection title="Explore More" movies={movies} />

      {/* Dynamic genre sections */}
      {genres.map((genre) => (
        <MovieSection
          key={genre}
          title={genre}
          movies={movies.filter((movie) => movie.genres?.includes(genre))}
        />
      ))}

      <Footer />
    </div>
  );
};

export default LandingPage;
