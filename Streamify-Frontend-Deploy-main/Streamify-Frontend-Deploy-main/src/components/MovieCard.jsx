// src/components/MovieCard.jsx
import React from "react";


const MovieCard = ({ image, title }) => {
  return (
    <div className="movie-card">
      <img src={image} alt={title} />
      <p>{title}</p>
    </div>
  );
};

export default MovieCard;
