// src/components/MovieList.jsx
import React from "react";
import MovieCard from "./MovieCard";


const movies = [
  { image: "/images/kalki.jpg", title: "Kalki" },
  { image: "/images/ceylan.jpg", title: "Ceylan" },
  { image: "/images/pushpa.jpg", title: "Pushpa" },
  { image: "/images/kgf.jpg", title: "KGF" },
  { image: "/images/kgf2.jpg", title: "KGF 2" },
];

const MovieList = () => {
  return (
    <div className="movie-list">
      <h2>More Like This:</h2>
      <div className="movie-cards">
        {movies.map((movie, index) => (
          <MovieCard key={index} image={movie.image} title={movie.title} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
